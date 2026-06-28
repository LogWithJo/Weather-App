import { FaReact } from "react-icons/fa";

function Logo() {
	return (
		<div className="flex justify-center items-center gap-4">
			<div className='text-blue-600 text-4xl'><FaReact /></div>
			<div className="text-2xl capitalize font-bold shadow-2xl rounded-2xl dark:shadow-white shadow-black">
				youssef
			</div>
		</div>
	);
}

export default Logo;
