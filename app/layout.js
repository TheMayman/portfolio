import Providers from "@/utils/providers"
// import localFont from "next/font/local"
import "../styles/app.scss"
import { Description, Name } from "@/components/common/Variables"

// const suisseIntlbook = localFont({
// 	src: [
// 		{ path: "../public/fonts/suisseintl-book-webfont.woff2" },
// 		{ path: "../public/fonts/suisseintl-book-webfont.woff" },
// 		// "../public/fonts/suisseintl-book-webfont.woff2",
// 	],
// 	variable: "--suisse_intlbook",
// })
export const metadata = {
	title: Name,
	description: Description,
	icons: {
		icon: "/favicon.ico",
	},
}

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			// className={`${suisseIntlbook.variable} `}
		>
			<head />
			<body suppressHydrationWarning={true}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
