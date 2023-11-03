"use client"
import gsap from "gsap"
import SplitText from "gsap/dist/SplitText"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import Lottie from "lottie-react"
import programmerAnimation from "../public/json/programmer.json"
import FadeIn from "./common/FadeIn"

const Introduction = () => {
	const introRef = useRef()
	const [isLoading, setIsLoading] = useState(true)
	gsap.registerPlugin(SplitText, ScrollTrigger)

	useEffect(() => {
		setIsLoading(false)
		const q = gsap.utils.selector(introRef)

		let tl = new gsap.timeline({
			paused: true,
		})

		const headline = SplitText.create(q(".headline-title"), {
			type: "chars",
			charsClass: "headline-character",
		})

		const description = SplitText.create(q(".headline-description"), {
			type: "words",
			wordsClass: "headline-word",
		})

		tl.to(headline.chars, {
			y: 0,
			stagger: 0.05,
			delay: 0.5,
			duration: 0.3,
			ease: "power3.out",
		})
			.to(description.words, {
				y: 0,
				stagger: 0.016,
				delay: 0.1,
				duration: 0.3,
				ease: "power3.out",
			})
			.to(q(".lottie-programmer"), {
				autoAlpha: 1,
				delay: 0.15,
				duration: 1,
				ease: "power3.in",
			})

		// ScrollTrigger.create({
		// 	trigger: q(".headline-title"),
		// 	animation: tl,
		// 	start: "top bottom",
		// 	end: "bottom bottom",
		// 	invalidateOnRefresh: true,
		// 	smoothChildTiming: true,
		// })
		// ScrollTrigger.create({
		// 	trigger: q(".lottie-programmer"),
		// 	animation: tl,
		// 	start: "top bottom",
		// 	end: "bottom bottom",
		// 	invalidateOnRefresh: true,
		// 	smoothChildTiming: true,
		// 	scrub: true,
		// })
		tl.play()
	}, [])

	return (
		<section className="introduction-section" ref={introRef}>
			<div className="left pl-6">
				<div className="headline">
					<div className="headline-title">Hi,</div>
					<div className="headline-title">I&apos;m Eyad Alasfahani</div>
					<p className="headline-description">
						A passionate web developer specializing in creating dynamic web
						applications from scratch. With expertise in both frontend and
						backend development, I leverage technologies like Next.js for
						frontend and PHP Laravel for backend to craft captivating and
						customer-centric web solutions. My goal is to help agencies and
						companies enhance their online presence, attract a wider audience,
						and deliver exceptional user experiences.
					</p>
				</div>
			</div>
			<div className="right">
				<div className="lottie-container">
					<Lottie
						className="lottie-programmer"
						animationData={programmerAnimation}
					/>
				</div>
			</div>
		</section>
	)
}

export default Introduction
