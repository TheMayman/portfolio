"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useContext } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"
import gsap from "gsap"
import useGsapContext from "./useGsapContext"
// import Drawer from "./Drawer"

const NavMenu = ({ data }) => {
	const { isMobile } = useContext(isMobileContext)
	const naveMenuWrapper = useRef()
	const ctx = useGsapContext(naveMenuWrapper)

	useEffect(() => {
		menu()
		ctx.add(() => {})
		return () => ctx.revert()
	}, [])

	function menu() {
		// let headerWrap = document.querySelector(".header_wrap")
		// if (headerWrap && headerWrap.length != 0) {
		let burgerButton = document.querySelector(".burger_button"),
			menuWrap = document.querySelector(".menu_wrap"),
			menuCards = document.querySelector(".menu_cards"),
			linksWrap = document.querySelector(".links"),
			links = document.querySelectorAll(".links a"),
			mouse = { x: 0, y: 0 }

		let burgerTL = new gsap.timeline({ paused: false }),
			cardsTL = new gsap.timeline({ paused: true })

		cardsTL.fromTo(
			".menu_cards",
			0.5,
			{ autoAlpha: 0 },
			{ autoAlpha: 1, ease: "power3.inOut" }
		)
		burgerTL
			.set(".menu_wrap", { autoAlpha: 1 })

			.fromTo(
				".menu_wrap > i",
				1,
				{ scaleY: 0, scaleX: 1 },
				{ scaleY: 1, scaleX: 1, ease: "power3.inOut" }
			)

			.fromTo(
				".menu_wrap .links a",
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

		linksWrap.addEventListener("mouseenter", function () {
			cardsTL.play()
		})

		linksWrap.addEventListener("mouseleave", function () {
			cardsTL.reverse()
		})

		links.forEach(function (e) {
			e.addEventListener("mouseenter", function () {
				let cardHeight = menuCards.offsetHeight,
					getIndex = Array.from(links).indexOf(e)

				gsap.to(".menu_cards_animation", 0.5, {
					y: cardHeight * getIndex * -1,
					ease: "power3.out",
				})
			})
		})

		menuWrap.addEventListener("mousemove", function () {
			let rect = menuWrap.getBoundingClientRect()

			mouse.x = event.clientX - rect.left
			mouse.y = event.clientY - rect.top

			gsap.to(".menu_cards", 0.2, { x: mouse.x, y: mouse.y })
		})

		// burgerButton.addEventListener("click", function () {
		// 	if (!headerWrap.classList.contains("opened")) {
		// 		headerWrap.classList.add("opened")

		// 		burgerTL.play()
		// 		stopScroll()
		// 	} else {
		// 		closeMenu()
		// 	}
		// })

		function closeMenu() {
			if (headerWrap.classList.contains("opened")) {
				headerWrap.classList.remove("opened")

				burgerTL.reverse()

				startScroll()
				if (isMobile) {
					document.body.classList.remove("fixed-body")
					document?.documentElement?.classList?.remove("fixed-body")
				}

				gsap.to(".menu_cards", 0.2, { autoAlpha: 0 })
			}
		}
	}
	return (
		<div className="menu_wrap light_color f a-c j-c" ref={naveMenuWrapper}>
			<i className="full_bg primary_bg"></i>
			<div className="menu_cards">
				<div className="menu_cards_animation">
					<div className="menu_card" key={1}>
						<Image src={"/images/crashDummies.webp"} alt="img" fill />
					</div>
					<div className="menu_card" key={2}>
						<Image src={"/images/dumm.webp"} alt="img" fill />
					</div>
				</div>
			</div>

			<div className="links">
				<Link href="/">Home</Link>
				<Link href="/about-us">About us</Link>
			</div>
		</div>
	)
}

export default NavMenu
