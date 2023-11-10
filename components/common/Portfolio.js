"use client"
import { useEffect, useRef, useState } from "react"
import Headline from "./Headline"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import useGsapContext from "./useGsapContext"
import ProjectsContainer from "../ProjectsContainer"

const Portfolio = () => {
	const cardsRef = useRef()
	const sectionRef = useRef()
	const ctx = useGsapContext(cardsRef)
	const [getEndValue, setGetEndValue] = useState()

	gsap.registerPlugin(ScrollTrigger)
	let q = gsap.utils.selector(sectionRef)

	useEffect(() => {
		gsap.timeline()
		ctx.add(() => {
			ScrollTrigger.create({
				id: "header-pinned",
				trigger: cardsRef.current,
				pin: true,
				end: () => `${getEndValue}`,
				start: "0% 0%",
				pinSpacing: false,
				invalidateOnRefresh: true,
			})
		})

		return () => {
			ctx.revert()
		}
	}, [ctx, getEndValue])

	return (
		<section className="portfolio" ref={sectionRef}>
			<div className="header-pinned" ref={cardsRef}>
				<Headline text={"Portfolio"} />
			</div>
			<ProjectsContainer
				setGetEndValue={setGetEndValue}
				getEndValue={getEndValue}
			/>
			<section></section>
			<section></section>
			<section></section>
		</section>
	)
}

export default Portfolio
