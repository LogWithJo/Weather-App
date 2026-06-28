import Github from "./Github";
import Location from "./Location";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeButton from "./ThemeButton";

function Header() {
	return (
		<div>
			<div className="flex justify-between p-4 items-center">
				<div className="flex justify-center items-center gap-3 p-3">
					<ThemeButton />
					<Github />
				</div>
				<div className="hidden lg:flex">
					<Location />
					<SearchBar />
				</div>
				<div className="flex-center p-3">
					<Logo />
				</div>
			</div>
			<div className="lg:hidden flex-col lg:flex-row flex">
				<Location />
				<SearchBar />
			</div>
		</div>
	);
}

export default Header;
