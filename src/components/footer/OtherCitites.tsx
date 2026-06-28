import React from "react";
import Data from "@/context/AppContext";
import { fetchData } from "@/hooks/useData";
import type { WeatherData } from "@/types/types";
import OtherCountriesCard from "./OtherCountriesCard";

async function getWeather(
	{ long, lat }: { long: number; lat: number },
	setDataAppears: React.Dispatch<React.SetStateAction<WeatherData[] | null>>,
	{ country, city }: { country: string; city: string },
) {
	const WeatherData: WeatherData = await fetchData(
		{ long: long, lat: lat },
		{
			country: country,
			city: city,
		},
	);
	setDataAppears((prev: WeatherData[] | null) => {
		if (!prev) return [WeatherData];

		return [...prev, WeatherData];
	});
}

function OtherCitites() {
	const { appState } = Data();
	const [dataAppers, setDataAppears] = React.useState<WeatherData[] | null>(
		null,
	);
	const hasRun = React.useRef(false);

	React.useEffect(() => {
		if (hasRun.current) return;
		hasRun.current = true;
		async function getData() {
			appState.otherCities.forEach(async (item) => {
				getWeather({ lat: item.lat, long: item.long }, setDataAppears, {
					country: item.country,
					city: item.city,
				});
			});
		}
		getData();
	}, [appState.otherCities]);

	return (
		<div className="capitalize p-4">
			<div className="text-2xl font-bold">other Cities</div>
			<div className="grid grid-cols-1 gap-3 p-4">
				<OtherCountriesCard data={dataAppers} />
			</div>
		</div>
	);
}

export default OtherCitites;

