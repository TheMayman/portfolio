"use client"
import Image from "next/image"
import { useContext, useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { gsap } from "gsap"
import { isTouchContext } from "@/contexts/isTouchContext"
import { useRouter } from "next/navigation"

const ProjectCard = ({
	index,
	getEndValue,
	projectsLength,
	latestProjectRef,
}) => {
	// const { isTouch } = useContext(isTouchContext)
	const el = useRef()
	let q = gsap.utils.selector(el)

	console.log(projectsLength, "project length")

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		// Cards
		let box = q(".project_box")[0]

		// Kill all triggers
		if (ScrollTrigger.getById("parallax-" + index)) {
			ScrollTrigger.getById("parallax-" + index).kill(true)
		}
		if (ScrollTrigger.getById("animation-" + index)) {
			ScrollTrigger.getById("animation-" + index).kill(true)
		}
		if (ScrollTrigger.getById("sticky-" + index)) {
			ScrollTrigger.getById("sticky-" + index).kill(true)
		}

		// Create new triggers
		if (window.innerWidth > 640) {
			// if (!isTouch && window.innerWidth > 640) {
			let cardsTL = new gsap.timeline()

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
					el.current,
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
				trigger: el.current,
				start: "0% 0%",
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
				trigger: el.current,
				start: "0% 0%",
				endTrigger: latestProjectRef.current,
				end: () => `${getEndValue}`,
				pinSpacing: false,
				pin: true,
				scrub: 0.5,
			})
		}
	}, [getEndValue, index, latestProjectRef, projectsLength, q])

	return (
		<div className={`project_block_set `}>
			<div className={`project_block`} ref={el}>
				<div className="project_box f s-b">
					<div
						style={{
							backgroundColor: "darkblue",
							width: "100%",
							height: "100%",
						}}
					></div>
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
