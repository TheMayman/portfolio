import { createContext, useState } from "react"

//create a context, with createContext api
export const isLoadingContext = createContext()

function IsLoadingProvider(props) {
	const [loading, setLoading] = useState(false)
	const [pageScroll, setPageScroll] = useState(false)
	return (
		<>
			<isLoadingContext.Provider
				value={{
					loading,
					setLoading,
					pageScroll,
					setPageScroll,
				}}
			>
				{props.children}
			</isLoadingContext.Provider>
		</>
	)
}

export default IsLoadingProvider
