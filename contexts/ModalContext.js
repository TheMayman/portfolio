import { createContext, useEffect, useState } from "react"

//create a context, with createContext api
export const modalContext = createContext()

function ModalContext(props) {
	const [modalIsOpen, setModalIsOpen] = useState(false)

	return (
		<>
			<modalContext.Provider
				value={{
					modalIsOpen, setModalIsOpen
				}}
			>
				{props.children}
			</modalContext.Provider>
		</>
	)
}

export default ModalContext
