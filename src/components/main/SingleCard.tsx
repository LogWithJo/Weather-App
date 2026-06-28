import { Droplets, Eye, Thermometer, Wind } from "lucide-react";
import type React from "react";
import type { WeatherData } from "@/types/types";
import { Card, CardContent, CardTitle } from "../ui/card";
import GetWeatherIcon from "../WeatherIcon";

function SingleCard({
	weatherData,
	state,
}: {
	weatherData: WeatherData | null;
	state: number;
}) {
	return (
		<Card className="w-full rounded-3xl border shadow-lg p-6 lg:p-8 xl:p-10 bg-primary text-white">
			<CardTitle className="text-center lg:text-left text-2xl xl:text-3xl font-bold">
				{weatherData?.daily.time?.[state].toLocaleDateString("en-US", {
					weekday: "long",
				}) ?? "Loading..."}
			</CardTitle>

			<CardContent className="mt-8 grid gap-10 lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] items-center">
				<div className="flex flex-col items-center justify-center">
					<div className="flex h-32 w-32 xl:h-40 xl:w-40 items-center justify-center">
						<GetWeatherIcon
							code={Number(weatherData?.daily.weather_code?.[state])}
						/>
					</div>

					<div className="mt-5 text-7xl xl:text-8xl font-black tracking-tight">
						{Number.isNaN(
							Math.round(Number(weatherData?.daily.temperature_2m_max?.[state])),
						)
							? "--"
							: Math.round(
									Number(weatherData?.daily.temperature_2m_max?.[state]),
								)}
						<sup className="text-3xl">°C</sup>
					</div>
				</div>

				{/* Right Side */}
				<div className="grid grid-cols-2 gap-5">
					<div className="rounded-2xl border p-5 transition-all hover:shadow-lg">
						<Thermometer className="h-7 w-7 text-orange-500" />
						<p className="mt-3 text-sm text-muted-foreground">Feels Like</p>
						<p className="text-2xl font-bold">
							{Math.round(
								Number(weatherData?.hourly.apparent_temperature?.[state]),
							)}
							°
						</p>
					</div>

					<div className="rounded-2xl border p-5 transition-all hover:shadow-lg">
						<Wind className="h-7 w-7 text-sky-500" />
						<p className="mt-3 text-sm text-muted-foreground">Wind</p>
						<p className="text-2xl font-bold">
							{Math.round(Number(weatherData?.hourly.wind_speed_10m?.[state]))}{" "}
							km/h
						</p>
					</div>

					<div className="rounded-2xl border p-5 transition-all hover:shadow-lg">
						<Eye className="h-7 w-7 text-violet-500" />
						<p className="mt-3 text-sm text-muted-foreground">Visibility</p>
						<p className="text-2xl font-bold">
							{Math.round(Number(weatherData?.hourly.visibility?.[state]) / 1000)}{" "}
							km
						</p>
					</div>

					<div className="rounded-2xl border p-5 transition-all hover:shadow-lg">
						<Droplets className="h-7 w-7 text-cyan-500" />
						<p className="mt-3 text-sm text-muted-foreground">Humidity</p>
						<p className="text-2xl font-bold">
							{Math.round(
								Number(weatherData?.hourly.relative_humidity_2m?.[state]),
							)}
							%
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default SingleCard;
