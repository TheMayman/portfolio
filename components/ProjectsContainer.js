"use client"
import { useEffect, useRef, useState } from "react"
import ProjectCard from "./ProjectCard"
import gsap from "gsap"

const ProjectsContainer = () => {
	const projectsData = [
		{ id: 1, name: "Project 1" },
		{ id: 2, name: "Project 2" },
		{ id: 3, name: "Project 2" },
		{ id: 4, name: "Project 2" },
		{ id: 5, name: "Project 2" },
	]
	const projectsContainerRef = useRef(null)
	const latestProjectRef = useRef(null)
	const [getEndValue, setGetEndValue] = useState()
	const [projectLength, setProjectLength] = useState()

	let q = gsap.utils.selector(projectsContainerRef)

	useEffect(() => {
		let projects = q(".project_block")
		setProjectLength(projects.length)
        console.log(projects.length,"length");
		setGetEndValue(
			projectsContainerRef.current.offsetHeight +
				(window.innerHeight - projects[projects.length - 1].offsetHeight) -
				window.innerHeight
		)
	}, [q])

	return (
		<div className="projects_wrap" id="lastest-projects" ref={latestProjectRef}>
			<div className="projects_container" ref={projectsContainerRef}>
				{projectsData.map((project, index) => (
					<ProjectCard
						key={project.id}
						name={project.name}
						index={index}
						getEndValue={getEndValue}
						projectsLength={projectsData.length}
                        latestProjectRef={latestProjectRef}
					/>
				))}
			</div>
		</div>
	)
}

export default ProjectsContainer
