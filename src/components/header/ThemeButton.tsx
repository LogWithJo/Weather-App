import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";

function ThemeButton() {
	const { setTheme, theme } = useTheme();
	return (
		<div>
			<Button
				variant="secondary"
				size="lg"
				onClick={() => {
					setTheme(theme === "dark" ? "light" : "dark");
				}}
			>
				<FaSun className="rotate-0 scale-100 transition-all dark:scale-0" />
				<FaMoon className="absolute scale-0 rotate-240 transition-all dark:scale-100" />
			</Button>
		</div>
	);
}

export default ThemeButton;
