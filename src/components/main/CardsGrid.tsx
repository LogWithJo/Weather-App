import React from "react";
import Data from "@/context/AppContext";
import { Button } from "../ui/button";
import GetWeatherIcon from "../WeatherIcon";

function CardsGrid() {
	const { weatherData } = Data();
	const [index, setIndex] = React.useState(0);
	if (!weatherData) return null;
	return (
		<div className="flex gap-4 overflow-x-auto pb-2 h-full">
			{weatherData.daily.time.slice(0, 7).map((day, i) => {
				const active = i === index;
				const number = i;
				return (
					<Button
						key={number}
						onClick={() => setIndex(i)}
						className={`h-full block cursor-pointer rounded-3xl border transition-all duration-300 overflow-hidden ${active ? "p-6 bg-primary flex-1 text-primary-foreground" : "p-4 bg-card"}`}
					>
						<div className="mb-5 flex justify-around">
							<h3 className="text-xl font-bold text-center">
								{day.toLocaleDateString("en-US", {
									weekday: active ? "long" : "short",
								})}
							</h3>
							{active && (
								<p className="text-sm opacity-70 text-center">
									{day.toLocaleDateString()}
								</p>
							)}
						</div>
						<div
							className={`${active ? "flex items-center justify-around gap-8" : "flex flex-col items-center"}`}
						>
							<div className="flex flex-col items-center ">
								<GetWeatherIcon code={weatherData.daily.weather_code?.[i]} />
								<div className="mt-3 text-5xl font-black">
									{Math.round(Number(weatherData.daily.temperature_2m_max?.[i]))}°
								</div>
							</div>
							{active && (
								<div className="grid grid-cols-2 gap-4 flex-1">
									<div className="rounded-xl bg-background/10 p-3">
										<p className="text-xs opacity-70">Feels Like</p>
										<p className="font-semibold">
											{Math.round(
												Number(weatherData.hourly.apparent_temperature?.[i]),
											)}
											°
										</p>
									</div>
									<div className="rounded-xl bg-background/10 p-3">
										<p className="text-xs opacity-70">Wind</p>
										<p className="font-semibold">
											{Math.round(Number(weatherData.hourly.wind_speed_10m?.[i]))}
											km/h
										</p>
									</div>
									<div className="rounded-xl bg-background/10 p-3">
										<p className="text-xs opacity-70">Visibility</p>
										<p className="font-semibold">
											{Math.round(
												Number(weatherData.hourly.visibility?.[i]) / 1000,
											)}
											km
										</p>
									</div>
									<div className="rounded-xl bg-background/10 p-3">
										<p className="text-xs opacity-70">Humidity</p>
										<p className="font-semibold">
											{Math.round(
												Number(weatherData.hourly.relative_humidity_2m?.[i]),
											)}
											%
										</p>
									</div>
								</div>
							)}
						</div>
					</Button>
				);
			})}
		</div>
	);
}
export default CardsGrid;
