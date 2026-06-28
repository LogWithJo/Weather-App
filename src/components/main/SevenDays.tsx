import Data from "@/context/AppContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SingleCard from "./SingleCard";


function SevenDays() {
	const { weatherData } = Data();
	const days: string[] | undefined = weatherData?.daily.time.map((item) => {
		return item.toLocaleDateString("en-US", {
			weekday: "long",
		});
	});
	return (
		<div className="w-full flex justify-center items-center">
			<Tabs defaultValue={days?.[0]} className="w-full gap-5">
				<TabsList className="w-full lg:w-fit lg:*:p-3 *:cursor-pointer">
					{Array(7)
						.fill(0)
						.map((item, i) => {
							item = i;
							return (
								<TabsTrigger key={item} value={days?.[i] || "friday"}>
									{days?.[i].slice(0, 3)}
								</TabsTrigger>
							);
						})}
				</TabsList>

				{Array(7)
					.fill(0)
					.map((item, i) => {
						item = i;
						return (
							<TabsContent
								key={item}
								className="w-full"
								value={days?.[i] || "friday"}
							>
								<SingleCard weatherData={weatherData} state={i} />
							</TabsContent>
						);
					})}
			</Tabs>
		</div>
	);
}

export default SevenDays