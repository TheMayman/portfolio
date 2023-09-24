"use client"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { useContext, useEffect, useRef, useState } from "react"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
import SvgAnimated from "./SvgAnimated"
import FadeIn from "./FadeIn"
import { isTouchContext } from "@/contexts/isTouchContext"
import { isMobileContext } from "@/contexts/isMobileContext"
import SearchFilters from "./SearchFilters"

const StickyNavbar = () => {
	const el = useRef()
	const scrollToTop = useRef()
	const q = gsap.utils.selector(el)
	const { isTouch } = useContext(isTouchContext)
	const { isMobile } = useContext(isMobileContext)

	const [isActive, setIsActive] = useState(false)
	const menuOpenedRef = useRef(false)
	const isMobileRef = useRef(false)

	const handleStickyMenu = () => {
		let isEnd =
			window.innerHeight + window.scrollY >= document.body.offsetHeight
		let sections = document.querySelectorAll("section:not(.page_menu_wrapper)")
		let pageMenu = document.querySelector(".page_menu_wrapper")
		if (sections && el?.current) {
			let firstSectionTop = sections[1]?.getBoundingClientRect().top
			let stickyMenuTop =
				el?.current?.getBoundingClientRect().top + el?.current?.offsetHeight / 2

			// To top button
			isEnd
				? el.current.classList.add("to_top")
				: el.current.classList.remove("to_top")

			// Sticky menu toggle
			window.scrollY > 100
				? el.current.classList.add("closed")
				: el.current.classList.remove("closed")

			// Change color when the menu is on white background
			firstSectionTop > stickyMenuTop
				? el.current.classList.add("light")
				: el.current.classList.remove("light")

			if (pageMenu) {
				firstSectionTop > stickyMenuTop
					? pageMenu.classList.add("light")
					: pageMenu.classList.remove("light")
			}
		}
	}
	const handleScrollToTop = () => {
		// to top
		let toTop = scrollToTop.current

		if (toTop) {
			gsap.to(window, {
				scrollTo: 0,
				duration: 0.5,
				ease: isMobileRef.current ? "power3.out" : "power3.inOut",
				delay: 0,
			})
		}
	}
	const handleFilterBtn = () => {
		setIsActive((current) => !current)
		// isActive ? (menuOpenedRef.current = true) : (menuOpenedRef.current = false)
		// if (!menuOpenedRef.current) {
		// 	el.current.classList.add("light")
		// 	el.current.classList.remove("search_opened")
		// } else {
		// 	el.current.classList.remove("light")
		// 	el.current.classList.add("search_opened")
		// }
	}
	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
		// Check If Mobile
		if (
			/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			isMobileRef.current = true
			document.body.classList.add("isMobile")
		} else {
			document.body.classList.add("isDesktop")
		}
		ScrollTrigger.create({
			onUpdate: handleStickyMenu,
			start: 0,
			end: "max",
		})
	}, [isMobileRef])

	useEffect(() => {
		// isActive ? (menuOpenedRef.current = true) : (menuOpenedRef.current = false)
		if (isActive) {
			el.current.classList.add("search_opened")
			el.current.classList.remove("light")
			console.log("opened", isActive)
		} else {
			el.current.classList.remove("search_opened")
			el.current.classList.add("light")
			console.log("closed", isActive)
		}
	}, [isActive])

	return (
		<>
			<div className="sticky_menu_wrap pointer " ref={el}>
				<span className="sm_border full_bg"></span>
				<div className="sm_content full_bg f a-c">
					<FadeIn customClass={"f a-c search_side"}>
						<span
							className="interactive_label f a-c"
							onClick={() => handleFilterBtn()}
						>
							<SvgAnimated
								customClass={"_shape svgAnimated"}
								dataSrc={"json/search.json"}
							></SvgAnimated>
							<span className="uppercase _txt words">Search properties</span>
						</span>
					</FadeIn>
					<div className="burger_side">
						<div className="burger_button full_bg f a-c j-c">
							<div
								className="burger_top arrow full_bg f a-c j-c"
								ref={scrollToTop}
								onClick={() => handleScrollToTop()}
							>
								<svg
									width="14"
									height="17"
									viewBox="0 0 14 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M0.460938 6.84375L6.36719 0.65625C6.54297 0.480469 6.75391 0.410156 7 0.410156C7.21094 0.410156 7.42188 0.480469 7.59766 0.65625L13.5039 6.84375C13.8203 7.19531 13.8203 7.72266 13.4688 8.03906C13.1523 8.35547 12.5898 8.35547 12.2734 8.00391L7.84375 3.32812V15.2812C7.84375 15.7734 7.45703 16.125 7 16.125C6.57812 16.125 6.15625 15.7734 6.15625 15.2812V3.32812L1.69141 8.00391C1.375 8.35547 0.8125 8.35547 0.496094 8.03906C0.144531 7.72266 0.144531 7.16016 0.460938 6.84375Z"
										fill="black"
									/>
								</svg>
							</div>
							<div className="burger_bars f f-c s-b">
								<span></span>
								<span></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<SearchFilters isActive={isActive} />
		</>
	)
}

export default StickyNavbar
