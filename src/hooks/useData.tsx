import { fetchWeatherApi } from "openmeteo";
import type {
	ApiResult,
	ApiStructure,
	AppState,
	SearchResults,
	WeatherData,
} from "@/types/types";

export async function getCurrentLocation(): Promise<{
	lat: number;
	long: number;
	country: string;
	city: string;
}> {
	try {
		const getLocation = () =>
			new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
		const position = await getLocation();
		const controller = new AbortController();
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(position.coords.latitude)}&lon=${encodeURIComponent(position.coords.longitude)}`,
			{ signal: controller.signal },
		);
		const data = await response.json();
		controller.abort();
		return {
			lat: position.coords.latitude,
			long: position.coords.longitude,
			country: data.address.country,
			city: data.address.city,
		};
	} catch (error) {
		console.error(`error`, { cause: error });
		return { lat: 30, long: 31, country: "Egypt", city: "Cairo" };
	}
}

export async function searchLocation(
	country: string,
): Promise<SearchResults[] | null> {
	try {
		if (!country) return null;
		const controller = new AbortController();
		const response = await fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(country)}`,
			{ signal: controller.signal },
		);
		const data: ApiResult = await response.json();
		const newData: SearchResults[] = data.results
			?.slice(0, 5)
			.map((result: ApiStructure) => ({
				lat: result.latitude,
				long: result.longitude,
				country: result.country,
				city: result.timezone.split("/").pop() ?? "",
			}));

		controller.abort();

		return newData;
	} catch (error) {
		console.error("error", { cause: error });
		return [
			{
				lat: 30,
				long: 31,
				country: "Egypt",
				city: "Cairo",
			},
		];
	}
}

export async function fetchData(
	position: { lat: number; long: number } = { lat: 30, long: 31 },
	address: { country: string; city: string } = {
		country: "Egypt",
		city: "Cairo",
	},
) {
	try {
		const params = {
			latitude: position.lat,
			longitude: position.long,
			hourly: [
				"temperature_2m",
				"relative_humidity_2m",
				"apparent_temperature",
				"rain",
				"pressure_msl",
				"weather_code",
				"wind_speed_10m",
				"visibility",
			],
			daily: ["weather_code", "temperature_2m_max"],
		};
		const url = "https://api.open-meteo.com/v1/forecast";
		const responses = await fetchWeatherApi(url, params);

		// Process first location. Add a for-loop for multiple locations or weather models
		const response = responses[0];

		// Attributes for timezone and location
		const latitude = response.latitude();
		const longitude = response.longitude();
		const elevation = response.elevation();
		const utcOffsetSeconds = response.utcOffsetSeconds();

		const hourly = response.hourly()!;
		const daily = response.daily()!;

		const weatherData: WeatherData = {
			latitude: latitude,
			longitude: longitude,
			elevation: elevation,
			hourly: {
				time: Array.from(
					{
						length:
							(Number(hourly.timeEnd()) - Number(hourly.time())) /
							hourly.interval(),
					},
					(_, i) =>
						new Date(
							(Number(hourly.time()) +
								i * hourly.interval() +
								utcOffsetSeconds) *
								1000,
						),
				),
				temperature_2m:
					hourly.variables(0)?.valuesArray() ?? new Float32Array(),
				relative_humidity_2m:
					hourly.variables(1)?.valuesArray() ?? new Float32Array(),
				weather_code: hourly.variables(5)?.valuesArray() ?? new Float32Array(),
				apparent_temperature:
					hourly.variables(2)?.valuesArray() ?? new Float32Array(),
				rain: hourly.variables(3)?.valuesArray() ?? new Float32Array(),
				wind_speed_10m:
					hourly.variables(6)?.valuesArray() ?? new Float32Array(),
				visibility: hourly.variables(7)?.valuesArray() ?? new Float32Array(),
			},
			daily: {
				time: Array.from(
					{
						length:
							(Number(daily.timeEnd()) - Number(daily.time())) /
							daily.interval(),
					},
					(_, i) =>
						new Date(
							(Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
								1000,
						),
				),
				weather_code: daily.variables(0)?.valuesArray() ?? new Float32Array(),
				temperature_2m_max:
					daily.variables(1)?.valuesArray() ?? new Float32Array(),
			},
			address: address,
		};
		return weatherData;
	} catch (error) {
		throw new Error("error", { cause: error });
	}
}

export default async function getData(
	setAppState: React.Dispatch<React.SetStateAction<AppState>>,
	setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>,
	coordinates: { lat: number; long: number },
	location: { country: string; city: string },
) {
	setAppState((prev) => ({
		...prev,
		isLoading: true,
	}));
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
	const data = await fetchData(coordinates, location);

	setAppState((prev) => ({
		...prev,
		isLoading: false,
	}));
	setWeatherData(data);
}
