import { createContext, useEffect, useState } from "react"

//create a context, with createContext api
export const OpenModalContext = createContext()

function OpenModal(props) {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	return (
		<>
			<OpenModalContext.Provider
				value={{
					modalIsOpen,
					setModalIsOpen,
				}}
			>
				{props.children}
			</OpenModalContext.Provider>
		</>
	)
}

export default OpenModal
