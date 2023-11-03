"use client"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useEffect, useRef } from "react"

const ProgrammingLanguages = () => {
	const containerRef = useRef()
	gsap.registerPlugin(ScrollTrigger)

	useEffect(() => {
		const q = gsap.utils.selector(containerRef)
		let tl = new gsap.timeline()

		tl.to(q(".lang"), {
			x: -(q(".lang").length * (q(".lang")[0].offsetWidth / 2)),
			ease: "power3.inOut",
		})

		ScrollTrigger.create({
			trigger: q(".lang"),
			animation: tl,
			// markers: true,
			scrub: true,
			start: "top bottom",
			end: "bottom 30%",
			invalidateOnRefresh: true,
			smoothChildTiming: true,
		})
	}, [])

	return (
		<div
			className="height p-relative"
			style={{
				minHeight: "200vh",
				width: "100%",
				backgroundColor: "#111",
			}}
			ref={containerRef}
		>
			<div className="strap">
				<div className="lang">
					<Image
						src={"/icons/nextJs.svg"}
						width={100}
						height={100}
						alt="NextJs"
					/>
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
					<Image src={"/icons/php.svg"} width={100} height={100} alt="NextJs" />
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
					<Image src={"/icons/css.svg"} width={100} height={100} alt="NextJs" />
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
					<Image src={"/icons/git.svg"} width={100} height={100} alt="NextJs" />
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
		</div>
	)
}

export default ProgrammingLanguages
