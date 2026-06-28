import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "cmdk";
import Fuse from "fuse.js";
import React from "react";
import Data from "@/context/AppContext";
import getData, { searchLocation } from "@/hooks/useData";
import type { SearchResults } from "@/types/types";
import { Input } from "../ui/input";

function SearchBar() {
	const { setAppState, setWeatherData } = Data();
	const [searchValue, setSearchValue] = React.useState("");
	const [result, setResult] = React.useState<SearchResults[]>([]);

	async function handleClick(data: SearchResults) {
		getData(
			setAppState,
			setWeatherData,
			{ lat: data.lat, long: data.long },
			{ country: data.country, city: data.city },
		);
		setSearchValue("");
	}

	function handleInput(value: string) {
		setSearchValue(value);
		if (!value) return;
		const timeout = setTimeout(async () => {
			const coordinates: SearchResults[] | null = await searchLocation(value);

			if (!coordinates) return;
			const fuse = new Fuse(
				coordinates?.map((coordinate) => {
					return {
						country: coordinate?.country,
						city: coordinate?.city,
					};
				}),
				{
					keys: ["city", "country"],
					includeScore: true,
				},
			);

			const filtered = [
				...new Set(
					fuse
						.search(value)
						.map((item) => item.item)
						.map((filteredName) => {
							return coordinates.find(
								(item) => item.country === filteredName.country,
							);
						})
						.filter((data) => data !== undefined),
				),
			];
			setResult(filtered);
		}, 1000);
		return () => clearTimeout(timeout);
	}

	return (
		<div className="p-4">
			<Command className="relative" shouldFilter={false}>
				<CommandInput value={searchValue} className="hidden" />
				<Input
					placeholder="Search..."
					className="p-3"
					value={searchValue}
					onChange={(e) => {
						handleInput(e.target.value);
					}}
				/>
				<CommandList
					className={`absolute top-full mt-2 w-full rounded-lg border bg-background shadow-lg z-50 max-h-72 overflow-y-auto ${searchValue.length > 0 ? "" : "hidden"}`}
				>
					<CommandGroup>
						{result?.map((item, i) => {
							const index = i;
							return (
								<CommandItem
									key={`${index}`}
									className="
					cursor-pointer
					px-4 py-3
					rounded-lg
					mx-1 my-1
					transition-colors
					data-[selected=true]:bg-accent
					data-[selected=true]:text-accent-foreground
				"
									onSelect={() => {
										handleClick(item);
									}}
								>
									<div className="flex flex-col">
										<span className="font-medium">
											{item.country}, {item.city}
										</span>
										<span className="text-xs text-muted-foreground">
											{item.country}
										</span>
									</div>
								</CommandItem>
							);
						})}
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
	);
}

export default SearchBar;
