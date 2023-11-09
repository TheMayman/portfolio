"use client"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useEffect, useRef } from "react"
import useGsapContext from "./useGsapContext"
import Headline from "./Headline"
import { Tooltip } from "react-tooltip"

const ProgrammingLanguages = () => {
	const containerRef = useRef()
	const ctx = useGsapContext(containerRef)
	gsap.registerPlugin(ScrollTrigger)

	useEffect(() => {
		const q = gsap.utils.selector(containerRef)
		ctx.add(() => {
			let tl = new gsap.timeline()

			tl.to(".lang", {
				x: -(q(".lang").length * (q(".lang")[0].offsetWidth / 1.9)),
				ease: "power3.inOut",
			})

			ScrollTrigger.create({
				trigger: ".lang",
				animation: tl,
				// markers: true,
				scrub: true,
				start: "top 80%",
				end: "bottom 30%",
				invalidateOnRefresh: true,
				smoothChildTiming: true,
			})
		})

		return () => {
			ctx.revert()
		}
	}, [ctx])

	return (
		<>
			<section className=" p-relative" ref={containerRef}>
				<Headline text={"Skills"} />
				<div className="strap">
					<div className="lang">
						<Image
							src={"/icons/nextJs.svg"}
							width={100}
							height={100}
							data-tooltip-id="my-tooltip"
							data-tooltip-content="Hello world!"
							alt="NextJs"
						/>
						<Tooltip id="my-tooltip" />
					</div>
					<div className="lang">
						<Image
							src={"/icons/react.svg"}
							width={100}
							height={100}
							alt="NextJs"
						/>
					</div>
					<div className="lang">
						<Image
							src={"/icons/php.svg"}
							width={100}
							height={100}
							alt="NextJs"
						/>
					</div>
					<div className="lang">
						<Image
							src={"/icons/laravel.svg"}
							width={50}
							height={50}
							alt="NextJs"
						/>
					</div>
					<div className="lang">
						<Image
							src={"/icons/css.svg"}
							width={100}
							height={100}
							alt="NextJs"
						/>
					</div>
					<div className="lang">
						<Image
							src={"/icons/html5.svg"}
							width={100}
							height={100}
							alt="NextJs"
						/>
					</div>
					<div className="lang">
						<Image
							src={"/icons/nginx.svg"}
							width={100}
							height={100}
							alt="NextJs"
						/>
					</div>
					<div className="lang">
						<Image
							src={"/icons/git.svg"}
							width={100}
							height={100}
							alt="NextJs"
						/>
					</div>
					<div className="lang">
						<Image
							src={"/icons/jira.svg"}
							width={100}
							height={100}
							alt="NextJs"
						/>
					</div>
					<div className="lang">
						<Image
							src={"/icons/docker.svg"}
							width={100}
							height={100}
							alt="NextJs"
						/>
					</div>
					<div className="lang">
						<Image
							src={"/icons/mysql.svg"}
							width={100}
							height={100}
							alt="NextJs"
						/>
					</div>
				</div>
			</section>
		</>
	)
}

export default ProgrammingLanguages
