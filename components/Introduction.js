"use client"
import gsap, { SteppedEase } from "gsap"
import { useEffect, useRef } from "react"
import FadeIn from "./common/FadeIn"

const Introduction = () => {
	const typeWriterRef = useRef()

	// useEffect(() => {
	// 	var tl = new gsap.timeline({
	// 		paused: true,
	// 	})

	// 	tl.fromTo(
	// 		typeWriterRef.current,
	// 		8,
	// 		{
	// 			width: "0",
	// 		},
	// 		{
	// 			width: "20rem" /* same as CSS .line-1 width */,
	// 			ease: SteppedEase.config(18),
	// 		},
	// 		0
	// 	)
	// 	// text cursor animation
	// 	tl.fromTo(
	// 		typeWriterRef.current,
	// 		0.7,
	// 		{
	// 			"border-right-color": "rgba(255,255,255,0.75)",
	// 		},
	// 		{
	// 			"border-right-color": "rgba(255,255,255,0)",
	// 			repeat: -1,
	// 			ease: SteppedEase.config(18),
	// 		},
	// 		0
	// 	)

	// 	tl.play()
	// }, [])

	return (
		<section className="introduction-section">
			<div className="left">
				<FadeIn splitType={"lines"}>
					{/* <div className="_eleWrap"> */}
						<div className="_splitWrap">
							<p
								className="line-1 anim-typewriter _splitLines"
								ref={typeWriterRef}
							>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, consectetur nemo non vitae labore assumenda aperiam fuga sequi quos exercitationem enim aut. Error laborum similique provident sunt pariatur a obcaecati.
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, consectetur nemo non vitae labore assumenda aperiam fuga sequi quos exercitationem enim aut. Error laborum similique provident sunt pariatur a obcaecati.
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, consectetur nemo non vitae labore assumenda aperiam fuga sequi quos exercitationem enim aut. Error laborum similique provident sunt pariatur a obcaecati.
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, consectetur nemo non vitae labore assumenda aperiam fuga sequi quos exercitationem enim aut. Error laborum similique provident sunt pariatur a obcaecati.
							</p>
						</div>
					{/* </div> */}
				</FadeIn>
			</div>
			<div className="right"></div>
		</section>
	)
}

export default Introduction
