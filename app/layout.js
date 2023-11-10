import Providers from "@/utils/providers"
import { Oswald } from "next/font/google"
import localFont from "next/font/local"
import "../styles/app.scss"
import { Description, Name } from "@/components/common/Variables"

const oswald = Oswald({
	weight: ["200", "300", "400"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-oswald",
})

const gta = localFont({
	// weight: ["200", "300", "400"],
	// display: "swap",
	// subsets: ["latin"],
	variable: "--font-gta",
	src: [
		{
			path: "../public/fonts/headline.ttf",
		},
	],
})

export const metadata = {
	title: Name,
	description: Description,
	icons: {
		icon: "/favicon.ico",
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${gta.variable} ${oswald.variable}`}>
			<head />
			<body suppressHydrationWarning={true}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
