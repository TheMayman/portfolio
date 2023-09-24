import { createContext, useEffect, useState } from "react"

//create a context, with createContext api
export const isMobileContext = createContext()

function IsMobileProvider(props) {
	const [isMobile, setMobile] = useState(null)
	const isMobileHandler = (e) => {
		setMobile(e.matches)
	}
	useEffect(() => {
		try {
			// Chrome & Firefox
			window
				.matchMedia(`(max-width : 961px)`)
				.addEventListener("change", isMobileHandler)
			setMobile(window.matchMedia(`(max-width : 961px)`).matches)
		} catch (e1) {
			try {
				// Safari
				window
					.matchMedia(`(max-width : 961px)`)
					.addListener(() => isMobileHandler())
				setMobile(window.matchMedia(`(max-width : 961px)`).matches)
			} catch (e2) {
				console.error(e2)
			}
		}
	}, [])
	return (
		<>
			<isMobileContext.Provider
				value={{
					isMobile,
					setMobile,
				}}
			>
				{isMobile != null ? props.children : null}
			</isMobileContext.Provider>
		</>
	)
}

export default IsMobileProvider
