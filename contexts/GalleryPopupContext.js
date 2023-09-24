"use client"
import { useRef } from "react"
import { createContext, useState } from "react"

//create a context, with createContext api
export const galleryPopupContext = createContext()

function GalleryPopupProvider(props) {
	const [activeImage, setActiveImage] = useState({ name: "", url: "" })

	return (
		<>
			<galleryPopupContext.Provider
				value={{
					activeImage,
					setActiveImage,
				}}
			>
				{props.children}
			</galleryPopupContext.Provider>
		</>
	)
}

export default GalleryPopupProvider
