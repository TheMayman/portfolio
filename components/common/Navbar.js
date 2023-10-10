"use client"
import gsap from "gsap"
import { Divide as Hamburger } from "hamburger-react"
import { useState } from "react"
const Navbar = ({ burgerTL, menuCardsRef }) => {
	const [isOpen, setOpen] = useState(false)
	const handleMenuToggle = () => {
		if (isOpen) {
			burgerTL.current.reverse()
			gsap.to(menuCardsRef.current, { duration: 0.2, autoAlpha: 0 })
		} else {
			burgerTL.current.play()
		}
	}
	return (
		<>
			<div
				className=""
				style={{
					width: "2rem",
					height: "2rem",
					zIndex: "1000",
					position: "relative",
					cursor: "pointer",
					color: "#a09160",
				}}
				onClick={() => handleMenuToggle()}
			>
				<Hamburger toggled={isOpen} toggle={setOpen} />
			</div>
		</>
	)
}

export default Navbar
