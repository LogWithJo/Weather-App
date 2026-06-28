import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Data from "@/context/AppContext";
import getData from "@/hooks/useData";
import { CardType } from "@/types/types";
import { Button } from "../ui/button";
import Cards from "./CardContainer";

function Main() {
	const { appState, weatherData, setAppState, setWeatherData } = Data();
	return (
		<div className="w-full p-3 flex justify-center items-center">
			<Tabs defaultValue={CardType.today} className="w-full gap-5">
				<div className="flex justify-between">
					<TabsList className="w-full lg:w-fit lg:*:p-3 *:cursor-pointer">
						<TabsTrigger value={CardType.today}>{CardType.today}</TabsTrigger>
						<TabsTrigger value={CardType.tomorrow}>
							{CardType.tomorrow}
						</TabsTrigger>
						<TabsTrigger value={CardType.next7Days}>
							{CardType.next7Days}
						</TabsTrigger>
					</TabsList>
					<Button
						className={
							Math.round(appState.currentLocation.lat) ===
								(weatherData?.latitude && Math.round(weatherData?.latitude)) &&
							Math.round(appState.currentLocation.long) ===
								(weatherData?.longitude && Math.round(weatherData?.longitude))
								? "hidden"
								: ""
						}
						onClick={() => {
							getData(
								setAppState,
								setWeatherData,
								{
									lat: appState.currentLocation.lat,
									long: appState.currentLocation.long,
								},
								{
									country: appState.location.country,
									city: appState.location.city,
								},
							);
						}}
					>
						Current Location
					</Button>
				</div>

				<TabsContent className="w-full" value={CardType.today}>
					<Cards state={CardType.today} />
				</TabsContent>
				<TabsContent value={CardType.tomorrow}>
					<Cards state={CardType.tomorrow} />
				</TabsContent>
				<TabsContent value={CardType.next7Days}>
					<div className="">
						<Cards state={CardType.next7Days} />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default Main;
