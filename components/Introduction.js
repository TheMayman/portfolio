"use client"
import gsap from "gsap"
import SplitText from "gsap/dist/SplitText"
import { useEffect, useRef } from "react"
import FadeIn from "./common/FadeIn"

const Introduction = () => {
	const headlineRef = useRef()
	gsap.registerPlugin(SplitText)

	useEffect(() => {
		let q = gsap.utils.selector(headlineRef)
		let tl = new gsap.timeline({
			paused: true,
		})
		// console.log(headlineRef);

		const headline = SplitText.create(headlineRef.current, {
			type: "chars",
			charsClass: "headline-character",
		})

		tl.to(headline.chars, {
			y: 0,
			stagger: 0.05,
			delay: 0.2,
			duration: 0.3,
			ease: "power3.our",
		})
	}, [])
	// 	tl.play()
	// }, [])

	return (
		<section className="introduction-section">
			<div className="left">
				<p className="headline" ref={headlineRef}>
					Hi, I&apos;m Eyad
				</p>
			</div>
			<div className="right"></div>
		</section>
	)
}

export default Introduction
