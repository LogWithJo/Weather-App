import React from "react";
// import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import getData, { getCurrentLocation } from "./hooks/useData";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import OtherCitites from "./components/footer/OtherCitites";
import Data from "./context/AppContext";

function App() {
	const { setWeatherData, setAppState } = Data();
	React.useEffect(() => {
		async function getLocation() {
			const data = await getCurrentLocation();
			getData(
				setAppState,
				setWeatherData,
				{ lat: data.lat, long: data.long },
				{ country: data.country, city: data.city },
			);
			setAppState((prev) => {
				return {
					...prev,
					currentLocation: {
						lat: Math.round(data.lat),
						long: Math.round(data.long),
					},
					location: { country: data.country, city: data.city },
				};
			});
		}
		getLocation();
	}, [setAppState, setWeatherData]);
	return (
		<SkeletonTheme baseColor="#202020" highlightColor="#444">
			<main>
				<Header />
				<Main />
				<OtherCitites />
			</main>
		</SkeletonTheme>
	);
}

export default App;
