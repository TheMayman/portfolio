"use client"
import gsap from "gsap"
import { Divide as Hamburger } from "hamburger-react"
import { useEffect, useRef, useState } from "react"
import Magnitizer from "./Magnitizer"
import Image from "next/image"
import Link from "next/link"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
const Navbar = ({ burgerTL, menuCardsRef }) => {
	const [isOpen, setOpen] = useState(false)
	const scrollYTimeoutRef = useRef()
	const headerRef = useRef()

	let start = 50

	const handleMenuToggle = () => {
		if (isOpen) {
			burgerTL.current.reverse()
			gsap.to(menuCardsRef.current, { duration: 0.2, autoAlpha: 0 })
		} else {
			burgerTL.current.play()
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
				<div className="burger-container" onClick={() => handleMenuToggle()}>
					<Hamburger toggled={isOpen} toggle={setOpen} />
				</div>
			</Magnitizer>
		</header>
	)
}

export default Navbar
