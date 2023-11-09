"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import useGsapContext from "./useGsapContext"
import SplitText from "gsap/dist/SplitText"

const Loading = () => {
	const loadingRef = useRef()
	gsap.registerPlugin(SplitText)
	const ctx = useGsapContext(loadingRef)
	useEffect(() => {
		let tl = new gsap.timeline()
		const headline = SplitText.create(".loading", {
			type: "chars",
			charsClass: "loading-character",
		})
		if (typeof window !== "undefined") {
			const loader = loadingRef.current
			if (loader)
				setTimeout(() => {
					loader.remove()
				}, 1000)
		}

		// ctx.add(() => {
		// 	tl.to(headline.chars, {
		// 		y: 0,
		// 		stagger: 0.05,
		// 		// delay: 0.5,
		// 		duration: 0.3,
		// 		ease: "power3.out",
		// 		// repeat: -1,
		// 		scrub: true
		// 	})
		// })

		return () => {
			ctx.revert()
		}
	}, [ctx])

	return (
		<div className="loading" ref={loadingRef}>
			Loading...
		</div>
	)
}

export default Loading
