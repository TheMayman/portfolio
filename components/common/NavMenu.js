"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useContext } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"
import gsap from "gsap"
import useGsapContext from "./useGsapContext"
import NavMenuLink from "./NavMenuLink"
import Magnitizer from "./Magnitizer"
// import Drawer from "./Drawer"

const NavMenu = ({ data }) => {
	const { isMobile } = useContext(isMobileContext)
	const naveMenuWrapper = useRef()
	const linksRef = useRef()
	const menuCardsRef = useRef()
	const menuCardsAnimationRef = useRef()
	const linkRef = useRef([])
	const ctx = useGsapContext(naveMenuWrapper)

	const cardsTL = useRef(null)
	const burgerTL = useRef(null)
	const mouse = useRef({ x: 0, y: 0 })
	const linksArray = [
		{ href: "/", text: "Home" },
		{ href: "/about-us", text: "About us" },
	]

	useEffect(() => {
		console.log(menuCardsRef.current.offsetHeight,"height=");
		ctx.add(() => {
			cardsTL.current = new gsap.timeline({ paused: true })
			burgerTL.current = new gsap.timeline({ paused: false })
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
				.fromTo(
					".on",
					0.5,
					{ autoAlpha: 1 },
					{ autoAlpha: 0, ease: "power3.in" },
					0
				)

				.fromTo(
					".off",
					0.5,
					{ autoAlpha: 0 },
					{
						autoAlpha: 1,
						ease: "power3.out",
						onComplete: () => {
							if (isMobile) {
								document.body.classList.add("fixed-body")
								document?.documentElement?.classList?.add("fixed-body")
							}
						},
					},
					0.5
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

	function menu() {
		// burgerButton.addEventListener("click", function () {
		// 	if (!headerWrap.classList.contains("opened")) {
		// 		headerWrap.classList.add("opened")
		// 		burgerTL.play()
		// 		stopScroll()
		// 	} else {
		// 		closeMenu()
		// 	}
		// })
	}
	function closeMenu() {
		if (headerWrap.classList.contains("opened")) {
			headerWrap.classList.remove("opened")

			burgerTL.current.reverse()

			if (isMobile) {
				document.body.classList.remove("fixed-body")
				document?.documentElement?.classList?.remove("fixed-body")
			}

			gsap.to(menuCardsRef.current, { duration: 0.2, autoAlpha: 0 })
		}
	}
	return (
		<div
			className="menu_wrap light_color f a-c j-c"
			ref={naveMenuWrapper}
			onMouseMove={(e) => {
				handleMenuWrapMouseMove(e)
			}}
		>
			<i className="full_bg primary_bg"></i>
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
			<div className="burger_button_set">
				<div
					className="burger_button _pointer"
					onClick={() => {
						burgerTL.current.reverse()
					}}
				>
					<Magnitizer customClass={"mg"} dataDest={1}>
						<div className="burger_lines f f-c a-c j-c">
							<svg
								className="on"
								width="22"
								height="21"
								viewBox="0 0 22 21"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M3 5.5H19M3 10.5H19M3 15.5H19"
									data-arrow="M16.8425 9.05576C16.7488 9.18062 16.624 9.24305 16.4991 9.24305C16.3743 9.24305 16.2494 9.18062 16.1557 9.08697L11.5047 4.71685V16.485C11.5047 16.7659 11.255 17.0156 11.0052 17.0156C10.7555 17.0156 10.5058 16.7659 10.5058 16.485V4.71685L5.82353 9.08697C5.63623 9.27426 5.32408 9.27426 5.13679 9.05576C4.9495 8.83725 4.9495 8.5251 5.16801 8.33781L10.6619 3.15609C10.8492 2.9688 11.1301 2.9688 11.3174 3.15609L16.8113 8.33781C17.0298 8.5251 17.0298 8.83725 16.8425 9.05576Z"
									data-close="M15.8594 15.8453C15.6719 16.0516 15.3281 16.0516 15.1406 15.8453L11.0156 11.2734L6.85938 15.8453C6.67188 16.0516 6.32812 16.0516 6.14062 15.8453C5.95312 15.6391 5.95312 15.2609 6.14062 15.0547L10.2969 10.4828L6.14062 5.94531C5.95312 5.73906 5.95312 5.36094 6.14062 5.15469C6.32812 4.94844 6.67188 4.94844 6.85938 5.15469L11.0156 9.72656L15.1406 5.15469C15.3281 4.94844 15.6719 4.94844 15.8594 5.15469C16.0469 5.36094 16.0469 5.73906 15.8594 5.94531L11.7031 10.4828L15.8594 15.0547C16.0469 15.2609 16.0469 15.6391 15.8594 15.8453Z"
									stroke="currentColor"
								/>
							</svg>
							<svg
								className="off"
								width="14"
								height="14"
								viewBox="0 0 14 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="1.41431"
									width="17"
									height="2"
									transform="rotate(45 1.41431 0)"
									fill="#1E1148"
								/>
								<rect
									y="12.0208"
									width="17"
									height="2"
									transform="rotate(-45 0 12.0208)"
									fill="#1E1148"
								/>
							</svg>
						</div>
					</Magnitizer>
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
	)
}

export default NavMenu
