export interface AppState {
	otherCities: {country: string, city: string, lat: number, long: number}[];
	isLoading: boolean;
	isApiFails: boolean
	currentLocation: {lat: number, long: number}
	location: {country: string, city: string}
}

type weekDays =
	| "sunday"
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday";

export interface AppContextType {
	appState: AppState;
	setAppState: React.Dispatch<React.SetStateAction<AppState>>;
	weatherData: WeatherData | null;
	setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
}

type HourlyWeather = {
	time: Date[];
	temperature_2m: Float32Array;
	relative_humidity_2m: Float32Array;
	weather_code: Float32Array;
	apparent_temperature: Float32Array;
	rain: Float32Array;
	wind_speed_10m: Float32Array;
	visibility: Float32Array;
};

type DailyWeather = {
	time: Date[];
	weather_code: Float32Array;
	temperature_2m_max: Float32Array;
};

export type WeatherData = {
	latitude: number;
	longitude: number;
	elevation: number;
	hourly: HourlyWeather;
	daily: DailyWeather;
	address: AddressType | undefined;
};

interface AddressType {
	country: string;
	city: string;
}

export interface SearchResults {
	city: string;
	country: string;
	long: number;
	lat: number;
}

export interface ApiStructure {
	country: string;
	country_code: string;
	country_id: number;
	elevation: number;
	feature_code: string;
	id: number;
	latitude: number;
	longitude: number;
	name: string;
	population: number;
	timezone: string;
}

export const CardType = {
	today: "today",
	tomorrow: "tomorrow",
	next7Days: "next 7 days",
} as const;

export type CardType = (typeof CardType)[keyof typeof CardType];

export const weekDays = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
] as const;

export type WeekDay = (typeof weekDays)[number];

export interface ApiResult {
	generationtime_ms: number,
	results: ApiStructure[]
}