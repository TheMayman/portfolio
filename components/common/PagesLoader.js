"use client"
import gsap from "gsap"
import { useContext, useEffect, useRef, useState } from "react"
import useGsapContext from "./useGsapContext"
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin"
import { isLoadingContext } from "@/contexts/isLoadingContext"
import SvgAnimated from "./SvgAnimated"
import Odometer from "react-odometerjs"
import "odometer/themes/odometer-theme-default.css"

const PagesLoader = () => {
	const loadingRef = useRef(null)
	const tl = useRef()
	const tlSVG = useRef()
	const tlBanner = useRef()
	const ctx = useGsapContext(loadingRef)
	const q = gsap.utils.selector(loadingRef)
	const { loading, setLoading, pageScroll, setPageScroll } =
		useContext(isLoadingContext)
	const [value, setValue] = useState(0)

	useEffect(() => {
		gsap.registerPlugin(DrawSVGPlugin)

		let loader = document.getElementById("loader")
		let counter = document.querySelector(".loader_count")
		let counterH6 = q(".odometer")
		tl.current = new gsap.timeline({ delay: 1 })

		tl.current.call(function () {
			counterH6.innerHTML = 99
		})
		tl.current
			.fromTo(
				q(".loader_count"),
				1,
				{ autoAlpha: 0, y: "50%" },
				{ autoAlpha: 1, y: 0, ease: "power3.out" },
				0
			)

			.set(q("#smooth-wrapper"), { autoAlpha: 1 }, 0)

			.to(
				q(".loader_count"),
				0.8,
				{ autoAlpha: 0, y: "-50%", ease: "power3.out" },
				1.9
			)

			.to(q(".site_loader .bg_a"), 0.8, { scaleY: 0, ease: "power3.in" }, 1.9)

			.call(function () {
				document.body.classList.add("wait")

				// pageScroll()
				setPageScroll(true)
				setLoading(false)
			})

			.to(q(".site_loader .bg_b"), 0.8, { scaleY: 0, ease: "power3.out" })

			.call(function () {
				loader?.remove()

				document.body.classList.remove("wait")

				// disableScroll(false)
				// setPageScroll(true)
			})

		const timeoutId = setTimeout(() => {
			setValue(99)
		}, 500)
		return () => {
			clearTimeout(timeoutId)
		}
	}, [])
	return (
		// <!-- Loader Start -->
		<div
			className="site_loader full_page f f-c a-c j-c"
			id="loader"
			ref={loadingRef}
		>
			<i className="full_bg loader_bg bg_a"></i>

			<i className="full_bg loader_bg bg_b"></i>

			<div className="loader_count f a-c j-c" style={{ visibility: "hidden" }}>
				<h6 className="odometer">
					<Odometer value={value} format="(.ddd),dd" />
				</h6>
				<span> %</span>
			</div>

			<div
				className="loader_icon svgAnimated _ele"
				data-src="json/loader.json"
			></div>
		</div>
		// <!-- Loader End -->
	)
}

export default PagesLoader
