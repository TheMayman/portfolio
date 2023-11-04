"use client"
import gsap from "gsap"
import { useEffect, useRef } from "react"
const Headline = ({ text }) => {
	const titleRef = useRef()
	const intervalRef = useRef()

	useEffect(() => {
		function animate(element) {
			let elementWidth = element.offsetWidth
			let parentWidth = element.parentElement.offsetWidth
			let flag = 0

			intervalRef.current = setInterval(() => {
				element.style.marginLeft = --flag + "px"

				if (elementWidth == -flag) {
					flag = parentWidth
				}
			}, 10)
		}

		animate(titleRef.current)
		return () => {
			clearInterval(intervalRef.current)
		}
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
