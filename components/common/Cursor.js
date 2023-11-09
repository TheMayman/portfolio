"use client"
import gsap from "gsap"
import { useEffect, useRef } from "react"

const Cursor = () => {
	const cursorRef = useRef()
	useEffect(() => {
		let posX = 0,
			posY = 0

		let mouseX = 0,
			mouseY = 0

		gsap.to(cursorRef.current, {
			duration: 0.018,
			repeat: -1,
			ease: "power3.inOut",
			onRepeat: function () {
				posX += (mouseX - posX) / 8
				posY += (mouseY - posY) / 8

				gsap.set(cursorRef.current, {
					css: {
						left: posX - 1,
						top: posY - 2,
					},
				})
			},
		})

		document.addEventListener("mousemove", (e) => {
			mouseX = e.clientX
			mouseY = e.clientY
		})

		// return () => {
		// 	document.removeEventListener("mousemove")
		// }
	}, [])
	return (
		<div>
			<div className="cursor" ref={cursorRef}></div>
		</div>
	)
}

export default Cursor
