"use client"
import { useEffect, useRef, useState } from "react"
import ProjectCard from "./ProjectCard"
import gsap from "gsap"

const ProjectsContainer = ({ getEndValue, setGetEndValue }) => {
	const projectsData = [
		{
			id: 1,
			name: "AutoConnect Ford KSA",
			description:
				"Connect with customers online to drive sales and increase customer loyalty to unprecedented levels.",
		},
		{
			id: 2,
			name: "AutoConnect Ford KSA",
			description:
				"Connect with customers online to drive sales and increase customer loyalty to unprecedented levels.",
		},
		{
			id: 3,
			name: "AutoConnect Ford KSA",
			description:
				"Connect with customers online to drive sales and increase customer loyalty to unprecedented levels.",
		},
		{
			id: 4,
			name: "AutoConnect Ford KSA",
			description:
				"Connect with customers online to drive sales and increase customer loyalty to unprecedented levels.",
		},
		{
			id: 5,
			name: "AutoConnect Ford KSA",
			description:
				"Connect with customers online to drive sales and increase customer loyalty to unprecedented levels.",
		},
	]
	const projectsContainerRef = useRef(null)
	const projectsWrapperRef = useRef(null)
	// const [getEndValue, setGetEndValue] = useState()
	const [projectLength, setProjectLength] = useState()

	useEffect(() => {
		let q = gsap.utils.selector(projectsContainerRef)
		let projects = q(".project_block")
		setProjectLength(projects.length)
		setGetEndValue(
			projectsContainerRef.current.offsetHeight +
				(window.innerHeight - projects[projects.length - 1].offsetHeight) -
				window.innerHeight
		)
	}, [setGetEndValue])

	return (
		<div className="projects_wrap" ref={projectsWrapperRef}>
			<div className="projects_container" ref={projectsContainerRef}>
				{projectsData.map((project, index) => (
					<ProjectCard
						key={project.id}
						name={project.name}
						description={project.description}
						index={index}
						getEndValue={getEndValue}
						projectsLength={projectsData.length}
						projectsWrapperRef={projectsWrapperRef}
					/>
				))}
			</div>
		</div>
	)
}

export default ProjectsContainer
