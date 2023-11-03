"use client"
import gsap from "gsap"
import { useEffect, useRef } from "react"
const Headline = ({ text }) => {
	const titleRef = useRef()

	useEffect(() => {
		function animateText() {
			const text = titleRef.current

			// Calculate the duration based on the text width and animation speed
			const textWidth = text.clientWidth
			const animationSpeed = 100 // Adjust the speed as needed
			const duration = textWidth / animationSpeed

			// Create the animation
			gsap.to(text, {
				x: textWidth, // Move the text to the left
				duration: duration,
				ease: "linear",
				onComplete: () => {
					// When the animation is complete, reset the position
					gsap.set(text, { x: "100%" })
					animateText() // Restart the animation
				},
			})
		}
		animateText()
	}, [])

	return (
		<div className="title-container">
			<h2 className="title" ref={titleRef}>
				{text}
			</h2>
		</div>
	)
}

export default Headline
