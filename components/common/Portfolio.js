"use client"
import { useEffect, useRef } from "react"
import Headline from "./Headline"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import useGsapContext from "./useGsapContext"

const Portfolio = () => {
	const cardsRef = useRef()
	const ctx = useGsapContext(cardsRef)
	gsap.registerPlugin(ScrollTrigger)

	useEffect(() => {
		ctx.add(() => {})
		let cards = cardsRef.current.children
		let tl = new gsap.timeline()

		console.log(cards)

		let stickDistance = 0

		let firstCardST = ScrollTrigger.create({
			trigger: cards[0],
			start: "center center",
		})

		let lastCardST = ScrollTrigger.create({
			trigger: cards[cards.length - 1],
			start: "center center",
		})

		for (let i = 0; i < cards.length; i++) {
			var scale = 1 - (cards.length - i) * 0.025
			let scaleDown = tl.to(cards[i], {
				scale: scale,
				autoAlpha: 1,
				"transform-origin": '"50% ' + (lastCardST.start + stickDistance) + '"',
			})

			ScrollTrigger.create({
				trigger: cards[i],
				start: "top top",
				end: () => lastCardST.start + stickDistance,
				pin: true,
				scrub: true,
				markers: true,
				pinSpacing: false,
				ease: "power3.in",
				animation: scaleDown,
				toggleActions: "restart none none reverse",
			})
		}

		return () => {
			ctx.revert()
		}
	}, [ctx])

	return (
		<section className="portfolio">
			<Headline text={"Portfolio"} />
			<div ref={cardsRef}>
				<div className="card">card1</div>
				<div className="card">card2</div>
				<div className="card">Card 3</div>
				<div className="card">Card 4</div>
				<div className="card">Card 5</div>
				<div className="card">Card 6</div>
				<div className="card">Card 7</div>
				<div className="card">Card 8</div>
				<div className="card">Card 9</div>
			</div>
			<section></section>
			<section></section>
			<section></section>
		</section>
	)
}

export default Portfolio
