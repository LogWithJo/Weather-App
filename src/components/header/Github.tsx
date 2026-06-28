import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

function Github() {
	return (
		<Button
			variant="secondary"
			size="lg"
			className="flex justify-center items-center p-2 text-2xl"
		>
			<a
				href="http://github.com/logwithjo"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaGithub />
			</a>
		</Button>
	);
}

export default Github;
