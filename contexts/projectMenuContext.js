"use client"

import { createContext, useState } from "react"

//create a context, with createContext api
export const projectMenuContext = createContext()

function ProjectMenuProvider(props) {
	const [projectMenuStart, setProjectMenuStart] = useState()
	const [activeTab, setActiveTab] = useState("")

	return (
		<>
			<projectMenuContext.Provider
				value={{
					projectMenuStart,
					setProjectMenuStart,
					activeTab,
					setActiveTab,
				}}
			>
				{props.children}
			</projectMenuContext.Provider>
		</>
	)
}

export default ProjectMenuProvider
