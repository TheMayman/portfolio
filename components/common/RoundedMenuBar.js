"use client"

import { useContext, useEffect, useRef } from "react"
import useGsapContext from "./useGsapContext"
import { gsap } from "gsap"
import Link from "next/link"
import SvgAnimated from "./SvgAnimated"
import InteractionYSplitter from "./InteractionYSplitter"
import FadeIn from "./FadeIn"
import { projectMenuContext } from "@/contexts/projectMenuContext"
const RoundedMenuBar = ({ links, routes, customClass }) => {
	const el = useRef()
	const ctx = useGsapContext(el)
	const q = gsap.utils.selector(el)
	const { projectMenuStart, setProjectMenuStart, activeTab, setActiveTab } =
		useContext(projectMenuContext)
	const excute = () => {
		if (!el.current.classList.contains(".static")) {
			let selector = q(".selected")[0],
				getActive = q(".active")[0]

			if (getActive) {
				let getPos = getActive.offsetLeft,
					getWidth = getActive.offsetWidth

				gsap.to(selector, {
					duration: 0.5,
					x: getPos + getWidth / 2,
					ease: "power3.out",
				})
			}
		}
	}
	const handleClickAddActive = (link) => {
		let getLinks = q(".link")
		getLinks.forEach((el) => el.classList.remove("active"))
		link.classList.add("active")
	}
	const handleMouseEnter = (e) => {
		let selector = q(".selected")[0]
		let getPos = e.offsetLeft,
			getWidth = e.offsetWidth

		gsap.to(selector, {
			duration: 0.5,
			x: getPos + getWidth / 2,
			ease: "power3.out",
		})
	}
	useEffect(() => {
		let menu = el.current
		if (!menu.classList.contains(".static")) {
			ctx.add(() => {
				let links = q("li"),
					getLinks = q(".link")

				getLinks.forEach((linkActive) =>
					linkActive.addEventListener("click", () =>
						handleClickAddActive(linkActive)
					)
				)

				links.forEach((link) =>
					link.addEventListener("mouseenter", () => handleMouseEnter(link))
				)

				menu.addEventListener("mouseleave", () => excute())
			})
			excute()

			window.addEventListener("resize", () => {
				clearTimeout(window.menuResized)

				window.menuResized = setTimeout(() => {
					excute()
				}, 250)
			})
		}
		return () => {
			ctx.revert()
			let getLinks = q(".link"),
				links = q("li")
			getLinks.forEach((link) => {
				link.removeEventListener("click", () => handleClickAddActive(link))
			})
			links.forEach((link) => {
				link.removeEventListener("mouseenter", () => handleMouseEnter(link))
			})
			menu.removeEventListener("mouseleave", () => excute())
		}
	}, [])

	return (
		<FadeIn>
			{links ? (
				<div className={customClass} ref={el}>
					<ul className="f a-c">
						{links?.map((link, index) => (
							<li
								className="interactive_label"
								key={index}
								onClick={() => setActiveTab(link)}
							>
								<span
									className={`uppercase link _txt words pointer ${
										index === 0 ? "active" : ""
									}`}
								>
									{link}
								</span>
							</li>
						))}
					</ul>
					<div className="selected"></div>
				</div>
			) : (
				<nav className={customClass} ref={el}>
					<ul className="f a-c">
						{routes?.map((route, index) => (
							<li className="interactive_label" key={index}>
								<Link
									className={`uppercase link _txt words ${
										route.icon ? "f ac" : ""
									} ${index === 0 ? "active" : ""}`}
									href={route.href}
									aria-label={route.ariaLabel}
								>
									{route?.icon && (
										<SvgAnimated
											dataSrc={route.icon}
											customClass={"_shape svgAnimated"}
										/>
									)}
									{/* <InteractionYSplitter
										text={route.text}
										customClass={"link uppercase words"}
									/> */}
									{route.text}
								</Link>
							</li>
						))}
					</ul>
					<div className="selected"></div>
				</nav>
			)}
		</FadeIn>
	)
}

export default RoundedMenuBar
