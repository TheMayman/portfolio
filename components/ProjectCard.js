"use client"
import Image from "next/image"
import { useContext, useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { gsap } from "gsap"
import { isTouchContext } from "@/contexts/isTouchContext"
import { useRouter } from "next/navigation"
import useGsapContext from "./common/useGsapContext"

const ProjectCard = ({
	index,
	getEndValue,
	projectsLength,
	projectsWrapperRef,
	name,
	description,
}) => {
	// const { isTouch } = useContext(isTouchContext)
	const el = useRef()
	const projectRef = useRef()
	const ctx = useGsapContext(projectRef)

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)
		let q = gsap.utils.selector(el)

		// Cards
		let box = q(".project_box")[0]

		ctx.add(() => {
			if (window.innerWidth > 640) {
				// if (!isTouch && window.innerWidth > 640) {
				let cardsTL = new gsap.timeline()
				let projectMockupTL = new gsap.timeline()

				projectMockupTL.to(".project-mockup", {
					scale: 1.2,
				})

				// Scale / Opacity Animation
				cardsTL
					.to(
						box,
						{
							autoAlpha: function () {
								if (index != projectsLength - 1) return 0
							},
						},
						0
					)

					.to(
						".project_block",
						{
							scale: function () {
								return 1 - (projectsLength - index - 1) * 0.03
							},
						},
						0
					)

				ScrollTrigger.create({
					id: "animation-" + index,
					invalidateOnRefresh: true,
					trigger: ".project_block",
					start: "0% 30%",
					end: () => `+=${el.current.offsetHeight / 1.5}`,
					animation: cardsTL,
					scrub: 0.5,
					defaults: { ease: "none" },
					// markers: true,
				})

				// Make the sticky effect
				ScrollTrigger.create({
					id: "sticky-" + index,
					invalidateOnRefresh: true,
					trigger: ".project_block",
					start: "0% 30%",
					endTrigger: projectsWrapperRef.current,
					end: () => `${getEndValue}`,
					pinSpacing: false,
					pin: true,
					scrub: 0.5,
					// markers: true,
				})

				//Make the Project Image Effect
				ScrollTrigger.create({
					id: "mockup-" + index,
					invalidateOnRefresh: true,
					animation: projectMockupTL,
					trigger: ".project-mockup",
					start: "0% 30%",
					end: "0 30%",
					scrub: true,
				})
			}
		})
		return () => {
			ctx.revert()
			ScrollTrigger.getById("parallax-" + index)?.kill()
			ScrollTrigger.getById("animation-" + index)?.kill()
			ScrollTrigger.getById("sticky-" + index)?.kill()
			ScrollTrigger.getById("mockup-" + index)?.kill()
		}

		// Create new triggers
	}, [getEndValue, index, projectsLength, ctx, projectsWrapperRef])

	return (
		<div className={`project_block_set `} ref={projectRef}>
			<div className={`project_block`} ref={el}>
				<div className="project_box">
					<div className="left">
						<div className="project-description-container">
							<h3>Project Title:</h3>
							<h3 className="project-name">{name}</h3>
						</div>
						<div className="project-description-container">
							<h3>Project Description:</h3>
							<h3 className="project-name">{description}</h3>
						</div>
						<div className="image-logo-container">
							<Image
								className="project-logo"
								alt=""
								src={"/images/ford-logo.svg"}
								objectFit="contain"
								fill
							/>
						</div>
					</div>
					<div className="right">
						<Image
							className="project-mockup"
							alt=""
							src={"/images/ford.webp"}
							objectFit="cover"
							fill
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
