"use client"

import IsLoadingProvider from "@/contexts/isLoadingContext"
import IsMobileProvider from "@/contexts/isMobileContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export default function Providers({ children }) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<IsMobileProvider>
						<IsLoadingProvider>
							{children}
						</IsLoadingProvider>
				</IsMobileProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	)
}
