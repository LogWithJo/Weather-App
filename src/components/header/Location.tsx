import { FaLocationArrow } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import Data from "@/context/AppContext";
import "react-loading-skeleton/dist/skeleton.css";

function Location() {
	const { weatherData, appState } = Data();
	return (
		<div>
			<div
				className={`text-2xl flex justify-start items-center px-6 py-4 gap-6 ${appState.isLoading ? "hidden" : ""}`}
			>
				<div>
					<FaLocationArrow />
				</div>
				<div>
					{`${weatherData?.address?.country} , ${weatherData?.address?.city || ""}`}
				</div>
			</div>
			<div  className={`px-6 ${appState.isLoading ? "" : "hidden"}`}>
					<Skeleton height={24} width="70%" />
			</div>
		</div>
	);
}

export default Location;
