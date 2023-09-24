import { createContext, useEffect, useState } from "react"

//create a context, with createContext api
export const isTouchContext = createContext()

function IsTouchProvider(props) {
	const [isTouch, setIsTouch] = useState(false)

	useEffect(() => {
		if ("ontouchstart" in window || navigator.msMaxTouchPoints > 0) {
			setIsTouch(true)
			document.body.classList.add("isTouch")
		}
	}, [])
	return (
		<>
			<isTouchContext.Provider
				value={{
					isTouch,
				}}
			>
				{props.children}
			</isTouchContext.Provider>
		</>
	)
}

export default IsTouchProvider
