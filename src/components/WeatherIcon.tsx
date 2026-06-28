import {
	Cloud,
	CloudDrizzle,
	CloudFog,
	CloudLightning,
	CloudRain,
	CloudSnow,
	CloudSun,
	Sun,
} from "lucide-react";

export default function GetWeatherIcon({ code }: { code: number }) {
	if (code === 0) return <Sun className=" w-full h-full" />;

	if ([1, 2].includes(code)) return <CloudSun className=" w-full h-full" />;

	if (code === 3) return <Cloud className=" w-full h-full" />;

	if ([45, 48].includes(code)) return <CloudFog className=" w-full h-full" />;

	if ([51, 53, 55].includes(code)) return <CloudDrizzle className=" w-full h-full" />;

	if ([61, 63, 65].includes(code)) return <CloudRain className=" w-full h-full" />;

	if ([71, 73, 75].includes(code)) return <CloudSnow className=" w-full h-full" />;

	if (code >= 95) return <CloudLightning className=" w-full h-full" />;

	return <Cloud />;
}
