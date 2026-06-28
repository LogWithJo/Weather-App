import Skeleton from "react-loading-skeleton";
import Data from "@/context/AppContext";
import { CardType } from "@/types/types";
import { Card } from "../ui/card";
import CardsGrid from "./CardsGrid";
import SevenDays from "./SevenDays";
import SingleCard from "./SingleCard";

function CardContainer({ state }: { state: CardType }) {
	const { appState, weatherData } = Data();

	return (
		<>
			{appState.isLoading ? (
				<CardSkeleton />
			) : state !== CardType.next7Days ? (
				<SingleCard
					key={state === CardType.today ? 0 : 1}
					weatherData={weatherData}
					state={state === CardType.today ? 0 : 1}
				/>
			) : (
				<>
					<div className="lg:hidden">
						<SevenDays />
					</div>

					<div className="lg:block hidden">
						<CardsGrid />
					</div>
				</>
			)}
		</>
	);
}

export default CardContainer;

function CardSkeleton() {
	return (
		<Card className="p-5">
			<Skeleton height={24} width="50%" />
			<Skeleton height={16} width="40%" />
			<Skeleton height={20} width="90%" />
		</Card>
	);
}
