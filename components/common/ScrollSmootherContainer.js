"use client"
import { useContext, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import ScrollSmoother from "gsap/dist/ScrollSmoother"
import { isMobileContext } from "../../contexts/isMobileContext"
import useGsapContext from "./useGsapContext"
import { useRouter } from "next/navigation"
import { smootherRefContext } from "@/contexts/SmootherRefContext"

const ScrollSmootherContainer = ({ children }) => {
	const { isMobile } = useContext(isMobileContext)
	const { smootherRef, setSmootherState } = useContext(smootherRefContext)
	const el = useRef(null)
	const ctx = useGsapContext(el)
	gsap.config({ nullTargetWarn: false })
	const containerRef = useRef(null)
	const router = useRouter()
	const isIpad =
		((navigator.maxTouchPoints || "ontouchstart" in document.documentElement) &&
			screen.width >= 768 &&
			screen.width <= 1366) ||
		/iPad/.test(navigator.userAgent)

	useEffect(() => {
		const onWindowResize = () => {
			let vh = window.innerHeight * 0.01
			let lastWindowWidth = 0
			if (isMobile) {
				if (window.innerWidth != lastWindowWidth) {
					console.log("in here")
					run()
				}
			} else {
				run()
			}

			function run() {
				document.body.classList.add("progress")

				setH()
			}

			function setH() {
				document.documentElement.style.setProperty("--vh", `${vh}px`)

				clearTimeout(window.resizedFinished)

				window.resizedFinished = setTimeout(function () {
					document.body.classList.remove("progress")

					ScrollTrigger.refresh()
				}, 250)
			}

			lastWindowWidth = window.innerWidth
		}
		window.addEventListener("resize", onWindowResize)
		onWindowResize()
		return () => {
			window.removeEventListener("resize", onWindowResize)
		}
	}, [isMobile])

	useEffect(() => {
		if (isMobile || isIpad) {
			gsap.registerPlugin(ScrollTrigger)

			const elements = containerRef?.current?.children

			elements &&
				Array.from(elements).forEach((element) => {
					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: element,
							start: "top bottom",
							end: "bottom bottom",
							toggleActions: "play none none reverse",
							scrub: 1,
							// markers: true,
						},
					})
				})
		}
		// tl.from(element, { opacity: 0, y: 40, duration: 0.8 })
	}, [isMobile, router.asPath])

	useEffect(() => {
		if (!isMobile && !isIpad) {
			// const ctx = gsap.matchMedia()
			gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
			// Since we can't use our isMobile here, we need to use gsap internal matchMedia function
			// Also, gsap.matchMedia() has its own context under the hood, so we don't need to use gsap.context()
			// ctx.add("(min-width: 1024px)", () => {
			ctx.add(() => {
				smootherRef.current = ScrollSmoother.create({
					// smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
					smooth: 1,
					ignoreMobileResize: true,
					effects: true,
					smoothTouch: false,
					// normalizeScroll: !isIpad,
				})
				// smoother.paused(true)
				// setTimeout(() => {
				// 	smoother.paused(false)
				// 	window.scrollTo(0, 0)
				// }, 2000)
				// setSmootherState(smoother)
			})
		}
		return () => ctx.revert()
	}, [ctx, isMobile])
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	if (!isMobile || !isIpad) {
		return (
			<div id="smooth-wrapper" ref={el}>
				<div id="smooth-content">{children}</div>
			</div>
		)
	} else {
		return <div ref={containerRef}>{children}</div>
	}
}

export default ScrollSmootherContainer
