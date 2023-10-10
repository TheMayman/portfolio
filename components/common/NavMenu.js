"use client"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { useContext } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"
import gsap from "gsap"
import useGsapContext from "./useGsapContext"
import NavMenuLink from "./NavMenuLink"
import Navbar from "./Navbar"

const NavMenu = () => {
	const { isMobile } = useContext(isMobileContext)
	const naveMenuWrapper = useRef()
	const linksRef = useRef()
	const menuCardsRef = useRef()
	const menuCardsAnimationRef = useRef()
	const linkRef = useRef([])
	const ctx = useGsapContext(naveMenuWrapper)
	const burgerTL = useRef()
	const cardsTL = useRef(null)
	const mouse = useRef({ x: 0, y: 0 })

	const linksArray = [
		{ href: "/", text: "Home" },
		{ href: "/about-us", text: "About us" },
	]

	useEffect(() => {
		ctx.add(() => {
			cardsTL.current = new gsap.timeline({ paused: true })
			burgerTL.current = new gsap.timeline({ paused: true })
			cardsTL.current.fromTo(
				".menu_cards",
				0.5,
				{ autoAlpha: 0 },
				{ autoAlpha: 1, ease: "power3.inOut" }
			)
			burgerTL.current
				.set(naveMenuWrapper.current, { autoAlpha: 1 })

				.fromTo(
					"i",
					1,
					{ scaleY: 0, scaleX: 1 },
					{ scaleY: 1, scaleX: 1, ease: "power3.inOut" }
				)

				.fromTo(
					".links a",
					0.5,
					{ y: "100%", autoAlpha: 0 },
					{ y: "0%", autoAlpha: 1, stagger: 0.1, ease: "power3.out" },
					// 0.5
					0.7
				)
		})
		return () => ctx.revert()
	}, [ctx, isMobile])

	const handleMenuWrapMouseMove = (e) => {
		let rect = naveMenuWrapper.current.getBoundingClientRect()
		mouse.current.x = e.clientX - rect.left
		mouse.current.y = e.clientY - rect.top

		gsap.to(menuCardsRef.current, {
			duration: 0.2,
			x: mouse.current.x,
			y: mouse.current.y,
		})
	}

	return (
		<>
			<Navbar burgerTL={burgerTL} menuCardsRef={menuCardsRef} />
			<div
				className="menu_wrap light_color f a-c j-c"
				ref={naveMenuWrapper}
				onMouseMove={(e) => {
					handleMenuWrapMouseMove(e)
				}}
			>
				<i
					className="full_bg primary_bg"
					style={{ backgroundColor: "white" }}
				></i>
				<div className="menu_cards" ref={menuCardsRef}>
					<div className="menu_cards_animation" ref={menuCardsAnimationRef}>
						<div className="menu_card" key={1}>
							<Image src={"/images/crashDummies.webp"} alt="img" fill />
						</div>
						<div className="menu_card" key={2}>
							<Image src={"/images/dumm.webp"} alt="img" fill />
						</div>
					</div>
				</div>

				<div
					className="links"
					ref={linksRef}
					onMouseEnter={() => {
						cardsTL.current.play()
					}}
					onMouseLeave={() => {
						cardsTL.current.reverse()
					}}
				>
					{linksArray.map((link, index) => (
						<NavMenuLink
							key={index}
							index={index}
							route={link.href}
							text={link.text}
							menuCardsRef={menuCardsRef}
							menuCardsAnimationRef={menuCardsAnimationRef}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default NavMenu
