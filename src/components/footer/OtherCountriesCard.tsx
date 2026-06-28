import Data from "@/context/AppContext";
import type { WeatherData } from "@/types/types";
import { Card, CardTitle } from "../ui/card";
import GetWeatherIcon from "../WeatherIcon";

function OtherCountriesCard({ data }: { data: WeatherData[] | null }) {
	const { setAppState, setWeatherData } = Data();

	if (!data) return null;

	function handleClick(item: WeatherData) {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		setAppState((prev) => ({
			...prev,
			isLoading: false,
		}));
		setWeatherData(item);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{data.map((item) => (
				<Card
					key={item.address?.country}
					onClick={() => handleClick(item)}
					className="group cursor-pointer rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary"
				>
					<div className="p-5">
						{/* Country & City */}
						<div className="mb-6">
							<CardTitle className="text-xl font-semibold">
								{item.address?.country}
							</CardTitle>

							<p className="text-sm text-muted-foreground mt-1">
								{item.address?.city ?? "Unknown city"}
							</p>
						</div>

						{/* Weather */}
						<div className="flex items-center justify-between">
							<div className="flex h-16 w-16 p-2 items-center justify-center rounded-xl bg-muted group-hover:scale-110 transition-transform">
								<GetWeatherIcon code={item.daily.weather_code[0]} />
							</div>

							<div className="text-right">
								<div className="text-5xl p-2 font-bold tracking-tight">
									{Math.round(Number(item.hourly.apparent_temperature[0]))}
									<sup className="text-xl font-medium">°C</sup>
								</div>

								<p className="text-sm text-muted-foreground">Feels Like</p>
							</div>
						</div>
					</div>
				</Card>
			))}
		</div>
	);
}

export default OtherCountriesCard