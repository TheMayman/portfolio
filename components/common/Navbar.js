"use client"
import gsap from "gsap"
import { Divide as Hamburger } from "hamburger-react"
import { useContext, useEffect, useRef, useState } from "react"
import Magnitizer from "./Magnitizer"
import Image from "next/image"
import Link from "next/link"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { smootherRefContext } from "@/contexts/SmootherRefContext"
const Navbar = ({ burgerTL, menuCardsRef }) => {
	const { smootherRef, setSmootherState } = useContext(smootherRefContext)
	const [isOpen, setOpen] = useState(false)
	const scrollYTimeoutRef = useRef()
	const headerRef = useRef()

	let start = 50

	const handleMenuToggle = (toggled) => {
		if (toggled) {
			burgerTL.current.play()
			smootherRef.current.paused(true)
		} else {
			smootherRef.current.paused(false)
			gsap.to(menuCardsRef.current, { duration: 0.2, autoAlpha: 0 })
			burgerTL.current.reverse()
		}
	}
	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const handleStickyNavbar = () => {
			scrollYTimeoutRef.current = setTimeout(() => {
				if (window.scrollY > start) {
					headerRef.current.classList.add("sticky")
				} else {
					headerRef.current.classList.remove("sticky")
				}
			}, 100)
		}

		ScrollTrigger.create({
			onUpdate: () => handleStickyNavbar(),
			start: "0% 0%",
			end: "max",
		})
		return () => {
			clearTimeout(scrollYTimeoutRef.current)
		}
	}, [start])

	return (
		<header ref={headerRef}>
			<Magnitizer customClass={"logo-container"}>
				<Link href={"/"}>
					<Image
						src={"/images/logo.svg"}
						alt={"logo"}
						className="logo"
						fill={true}
					/>
				</Link>
			</Magnitizer>
			<Magnitizer customClass={"burger-magintizer"}>
				<div className="burger-container">
					<Hamburger
						onToggle={(toggled) => {
							handleMenuToggle(toggled)
						}}
					/>
				</div>
			</Magnitizer>
		</header>
	)
}

export default Navbar
