import React from "react";
import type { AppContextType, AppState, WeatherData } from "@/types/types";

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
	const [appState, setAppState] = React.useState<AppState>({
		otherCities: [
			{
				country: "USA",
				city: "New York",
				lat: 39.8283,
				long: -98.5795,
			},
			{
				country: "France",
				city: "Paris",
				lat: 48.8566,
				long: 2.3522,
			},
			{
				country: "Japan",
				city: "Tokyo",
				lat: 35.6762,
				long: 139.6503,
			},
		],
		isLoading: true,
		isApiFails: false,
		currentLocation: {lat: 0, long: 0},
		location: {country: "egypt", city: "egypt"}
	});
	const [weatherData, setWeatherData] = React.useState<WeatherData | null>(
		null,
	);
	return (
		<AppContext.Provider
			value={{ appState, setAppState, weatherData, setWeatherData }}
		>
			{children}
		</AppContext.Provider>
	);
}

export default function Data() {
	const context = React.useContext(AppContext);

	if (!context) {
		throw new Error(`error`, { cause: context });
	}

	return context;
}
