"use client"
import gsap, { SteppedEase } from "gsap"
import { useEffect, useRef } from "react"

const Introduction = () => {
	const typeWriterRef = useRef()

	useEffect(() => {
		var tl = new gsap.timeline({
			paused: true,
		})

		tl.fromTo(
			typeWriterRef.current,
			8,
			{
				width: "0",
			},
			{
				width: "20rem" /* same as CSS .line-1 width */,
				ease: SteppedEase.config(18),
			},
			0
		)
		// text cursor animation
		tl.fromTo(
			typeWriterRef.current,
			0.7,
			{
				"border-right-color": "rgba(255,255,255,0.75)",
			},
			{
				"border-right-color": "rgba(255,255,255,0)",
				repeat: -1,
				ease: SteppedEase.config(18),
			},
			0
		)

		tl.play()
	}, [])

	return (
		<section className="introduction-section">
			<div className="left">
				<p class="line-1 anim-typewriter" ref={typeWriterRef}>
					Hi, <br /> I'm Eyad
				</p>
			</div>
			<div className="right"></div>
		</section>
	)
}

export default Introduction
