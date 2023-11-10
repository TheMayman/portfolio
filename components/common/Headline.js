"use client"
import Marquee from "react-fast-marquee"
import useGsapContext from "./useGsapContext"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
const Headline = ({ text }) => {
	const titleRef = useRef()

	// const ctx = useGsapContext(titleRef)
	// gsap.registerPlugin(ScrollTrigger)

	const [startMarquee, setStartMarquee] = useState(true)

	// useEffect(() => {
	// 	gsap.timeline()
	// 	ctx.add(() => {
	// 		ScrollTrigger.create({
	// 			trigger: titleRef.current,
	// 			start: "top bottom",
	// 			end: "bottom top",
	// 			scrub: true,
	// 			markers: true,
	// 			onEnter: () => {
	// 				setStartMarquee(true)
	// 			},
	// 			onLeave: () => {
	// 				setStartMarquee(false)
	// 			},
	// 			onEnterBack: () => {
	// 				setStartMarquee(true)
	// 			},
	// 			onLeaveBack: () => {
	// 				setStartMarquee(false)
	// 			},
	// 		})
	// 	})

	// 	return () => {
	// 		ctx.revert()
	// 	}
	// }, [ctx])

	return (
		<div className="title-container" ref={titleRef}>
			<Marquee play={startMarquee} autoFill={false}>
				<h2 className="title">{text}</h2>
			</Marquee>
		</div>
	)
}

export default Headline
