"use client"

import { useContext, useEffect, useRef } from "react"
import useGsapContext from "./useGsapContext"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { isTouchContext } from "@/contexts/isTouchContext"
import SvgAnimated from "./SvgAnimated"
import { smootherRefContext } from "@/contexts/SmootherRefContext"
import { ScrollSmoother } from "gsap/dist/ScrollSmoother"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"

const PageMenuNav = ({ menu, smallBanner }) => {
	const el = useRef()
	const pageMenuRef = useRef()
	const pageMenuTL = useRef()
	const pageMenuTL2 = useRef()
	const isAnimationActive = useRef(false)
	const mouseIN = useRef(false)
	const canNavigate = useRef(true)
	const isMobile = useRef()
	const currentLink = useRef(-1)
	const resizeTimeout = useRef()
	const scrollTimeout = useRef()

	let q = gsap.utils.selector(el)
	const ctx = useGsapContext(el)
	const { isTouch } = useContext(isTouchContext)

	const { smootherState } = useContext(smootherRefContext)

	const handleMouseEnter = () => {
		if (isAnimationActive.current) {
			mouseIN.current = true

			createReversedTL()
		}
	}
	const handleMouseLeave = () => {
		mouseIN.current = false

		sectionUpdate()
	}

	const handleLinkClick = (link) => {
		let id = link.dataset.id,
			element = document.getElementById(id),
			offset = element.getBoundingClientRect().top + window.scrollY

		canNavigate.current = false

		gsap.to(window, {
			scrollTo: offset,
			// Manual Animation
			onStart: () => {
				animate(link)
			},
			onComplete: () => {
				console.log(canNavigate, "can navigation")
				scrollTimeout.current = setTimeout(function () {
					canNavigate.current = true
				}, 2000)
			},
			duration: 0.1,
			ease: isMobile.current ? "power3.out" : "power3.inOut",
		})
	}
	// Functions
	const createReversedTL = () => {
		// Reseting menu
		let roundedMenu = q(".rounded_menu")[0],
			links = q(".rounded_menu_link")
		if (pageMenuTL2.current) {
			pageMenuTL2.current.pause().kill()
		}

		pageMenuTL2.current = new gsap.timeline()

		pageMenuTL2.current

			.to(
				q(".page_nav_icon")[0],
				{ autoAlpha: 0, ease: "power3.out", duration: 0.5 },
				0
			)

			.to(roundedMenu, { width: "auto", ease: "power3.out", duration: 0.5 }, 0)

			.to(q(".page_nav")[0], { x: 0, ease: "power3.out", duration: 0.5 }, 0)

			.to(
				(q(".page_menu .rounded_button")[0], ".centered_filters"),
				{ autoAlpha: 0, scale: 0.8, ease: "power3.out", duration: 0.5 },
				0
			)

		links.forEach((link) => link.classList.add("active"))

		currentLink.current = -1
	}

	const sectionUpdate = () => {
		// Adjust the menu links
		let sections = document.querySelectorAll(".page-section")
		sections.forEach((section, i) => {
			isAnimationActive.current = true

			if (
				ScrollTrigger.isInViewport(section) &&
				section.getBoundingClientRect().top <= 2 &&
				!mouseIN.current &&
				canNavigate.current
			) {
				let getID = section.id,
					getLink = q("li.rounded_menu_link[data-id=" + getID + "]")[0]

				if (getLink && currentLink.current != getLink) {
					currentLink.current = getLink

					animate(getLink)
				}
			}
		})
	}

	const animate = (getLink) => {
		// Calculations

		let getWidth = getLink.offsetWidth,
			roundedMenu = q(".rounded_menu")[0],
			links = q(".rounded_menu_link"),
			ul = q(".rounded_menu ul")[0],
			padding = window
				.getComputedStyle(ul, null)
				.getPropertyValue("padding-left"),
			getOffset = getLink.offsetLeft

		links.forEach((link) => link.classList.remove("active"))

		getLink.classList.add("active")

		// Animation
		if (pageMenuTL.current) {
			pageMenuTL.current.pause().kill()
		}

		pageMenuTL.current = new gsap.timeline()

		pageMenuTL.current
			.to(
				q(".page_nav")[0],
				{
					x: -(getOffset - parseFloat(padding)),
					ease: "power3.out",
					duration: 0.5,
				},
				0
			)

			.to(
				roundedMenu,
				{
					width: getWidth + parseFloat(padding) * 3,
					ease: "power3.out",
					duration: 0.5,
				},
				0
			)

			.to(
				q(".page_nav_icon")[0],
				{ autoAlpha: 1, ease: "power3.out", duration: 0.5 },
				0
			)

			.to(
				(q(".page_menu .rounded_button")[0], ".centered_filters"),
				{ autoAlpha: 1, scale: 1, ease: "power3.out", duration: 0.5 },
				0
			)
	}

	const createTrigger = () => {
		let sections = document.querySelectorAll(".page-section"),
			menu = pageMenuRef.current,
			links = q(".rounded_menu_link")

		if (ScrollTrigger.getById("Menu")) {
			ScrollTrigger.getById("Menu").kill(true)
		}

		if (window.innerWidth > 960) {
			ScrollTrigger.create({
				invalidateOnRefresh: true,
				id: "Menu",
				trigger: menu,
				start: "0% 0%",
				endTrigger: sections[sections.length - 1],
				end: "0% 0%",
				onLeaveBack: () => {
					createReversedTL()

					isAnimationActive.current = false
				},
				onUpdate: () => sectionUpdate(),
				pin: true,
				pinSpacing: false,
				scrub: 0.1,
			})
		}

		links.forEach((link) => link.classList.add("active"))
	}
	const resized = () => {
		clearTimeout(resizeTimeout.current)

		resizeTimeout.current = setTimeout(() => {
			currentLink.current = -1

			// Re-create the sticky trigger
			createTrigger()

			// Importnat in case if resize is finished and sections aren't in the inviewport
			createReversedTL()

			// If sections are in the inviewport
			sectionUpdate()

			ScrollTrigger.refresh()
		}, 500)
	}

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
		let menu = pageMenuRef.current
		if (
			/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			isMobile.current = true
		}
		if (menu) {
			let roundedMenu = q(".rounded_menu")[0],
				links = q(".rounded_menu_link")

			if (!isTouch) {
				// Mouse Events

				roundedMenu.addEventListener("mouseenter", () => handleMouseEnter())

				roundedMenu.addEventListener("mouseleave", () => handleMouseLeave())

				// Click Event
				links.forEach(function (link) {
					link.addEventListener("click", () => handleLinkClick(link))
				})

				// Resize event
				window.addEventListener("resize", () => {
					resized()
				})

				// Init
				createTrigger()

				resized()
			}
		}
		return () => {
			let roundedMenu = q(".rounded_menu")[0],
				links = q(".rounded_menu_link")
			roundedMenu?.removeEventListener("mouseenter", () => handleMouseEnter())
			roundedMenu?.removeEventListener("mouseleave", () => handleMouseLeave())
			links.forEach((link) => {
				link?.removeEventListener("click", () => handleLinkClick(link))
			})
			window.removeEventListener("resize", () => resized())
			clearTimeout(resizeTimeout.current)
			clearTimeout(scrollTimeout.current)
		}
	}, [q])

	return (
		<section
			className={`page_menu_wrapper  ${
				smallBanner ? "small_banner" : "full_page"
			} `}
			ref={el}
		>
			<div className="page_menu f a-e s-b x_padding">
				<div className="page_menu_outter f a-c" id="pageMenu" ref={pageMenuRef}>
					<div className="rounded_menu static">
						<div className="page_nav">
							<ul className="f a-c">
								{menu?.map((item, index) => {
									return (
										<li
											className="rounded_menu_link"
											data-id={`${item?.dataId}`}
											key={index}
										>
											<span className="link uppercase pointer">
												{item?.name}
											</span>
										</li>
									)
								})}
								{/* <li
									className="rounded_menu_link"
									data-id="section-project-concept"
								>
									<span className="link uppercase pointer">
										Project Concept
									</span>
								</li>
								<li className="rounded_menu_link" data-id="section-masterplan">
									<span className="link uppercase pointer">Masterplan</span>
								</li>
								<li
									className="rounded_menu_link"
									data-id="section-payment-calculator"
								>
									<span className="link uppercase pointer">
										Payment Calculator
									</span>
								</li>
								<li
									className="rounded_menu_link"
									data-id="section-location-map"
								>
									<span className="link uppercase pointer">Location Map</span>
								</li>
								<li className="rounded_menu_link" data-id="section-gallery">
									<span className="link uppercase pointer">Gallery</span>
								</li>
								<li
									className="rounded_menu_link"
									data-id="section-construction-updates"
								>
									<span className="link uppercase pointer">
										Construction Updates
									</span>
								</li> */}
							</ul>
						</div>

						<div className="page_nav_icon f a-c j-c">
							<svg
								width="16"
								height="8"
								viewBox="0 0 16 8"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M16 4C16 4.21875 15.9062 4.4375 15.75 4.5625L12.5 7.5625C12.3438 7.6875 12.1562 7.75 12 7.75C11.7812 7.75 11.5938 7.6875 11.4375 7.53125C11.1562 7.21875 11.1562 6.75 11.4688 6.46875L13.3125 4.75H2.65625L4.5 6.46875C4.8125 6.75 4.8125 7.21875 4.53125 7.53125C4.375 7.6875 4.1875 7.75 4 7.75C3.8125 7.75 3.625 7.6875 3.46875 7.5625L0.21875 4.5625C0.0625 4.4375 0 4.21875 0 4C0 3.8125 0.0625 3.59375 0.21875 3.46875L3.46875 0.46875C3.78125 0.1875 4.25 0.1875 4.53125 0.5C4.8125 0.8125 4.8125 1.28125 4.5 1.5625L2.65625 3.25H13.3125L11.4688 1.5625C11.1875 1.28125 11.1562 0.8125 11.4375 0.5C11.7188 0.1875 12.1875 0.1875 12.5 0.46875L15.75 3.46875C15.9062 3.59375 16 3.8125 16 4Z"
									fill="currentColor"
								/>
							</svg>
						</div>
					</div>

					<span
						className="rounded_button noselect pointer f a-c j-c interactive_label _eleY scrollTo"
						data-scroll="section-enquire"
					>
						<SvgAnimated
							customClass={"_shape svgAnimated"}
							dataSrc={"/json/message.json"}
						/>
					</span>
				</div>
			</div>
		</section>
	)
}

export default PageMenuNav
