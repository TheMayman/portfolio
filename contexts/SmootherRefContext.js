"use client"
import { useRef } from "react"
import { createContext, useState } from "react"

//create a context, with createContext api
export const smootherRefContext = createContext()

function SmootherRefProvider(props) {
	const smootherRef = useRef()
	const [smootherState, setSmootherState] = useState()

	return (
		<>
			<smootherRefContext.Provider
				value={{
					smootherRef,
					smootherState,
					setSmootherState,
				}}
			>
				{props.children}
			</smootherRefContext.Provider>
		</>
	)
}

export default SmootherRefProvider
