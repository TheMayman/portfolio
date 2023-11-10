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
		let tl = new gsap.timeline({ paused: true })
		const headline = SplitText.create(".loading", {
			type: "chars",
			charsClass: "loading-character",
		})
		if (typeof window !== "undefined") {
			const loader = loadingRef.current
			if (loader) tl.play()
		}

		ctx.add(() => {
			tl.to(headline.chars, {
				autoAlpha: 0,
				scaleY: 0,
				stagger: -0.1,
				ease: "power3.out",
				duration: 0.3,
			}).fromTo(
				loadingRef.current,
				{
					scaleY: 1,
				},
				{
					scaleY: 0,
					duration: 0.5,
					ease: "power3.out",
					onStart: () => {
						gsap.set(loadingRef.current, {
							backgroundColor: "#fff",
							ease: "power3.out",
							duration: 0.2,
						})
					},
				}
			)
		})

		return () => {
			ctx.revert()
		}
	}, [ctx])

	return (
		<div className="loading-container" ref={loadingRef}>
			<div className="white">
				<div className="loading">Loading...</div>
			</div>
		</div>
	)
}

export default Loading
