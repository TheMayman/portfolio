import Providers from "@/utils/providers"
import { Oswald } from "next/font/google"
import "../styles/app.scss"
import { Description, Name } from "@/components/common/Variables"

const oswald = Oswald({
	weight: ["200", "300", "400"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-oswald",
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
		<html lang="en" className={`${oswald.variable}`}>
			<head />
			<body suppressHydrationWarning={true}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
