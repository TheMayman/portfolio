"use client"
import Lottie from "lottie-web"
// import Lottie from "lottie-react"
import earthAnimation from "../../public/json/earth.json"
import { useEffect, useRef, useState } from "react"
import Headline from "./Headline"

const ContactMe = () => {
	const rightContainerRef = useRef()
	const [animation, setAnimation] = useState()
	const [clicks, setClicks] = useState(0)

	useEffect(() => {
		let animation = Lottie.loadAnimation({
			container: rightContainerRef.current,
			renderer: "svg",
			// loop: true,
			autoplay: false,
			path: "/json/earth.json",
		})
		setAnimation(animation)
	}, [])

	const handleClick = () => {
		if (animation) {
			setClicks(clicks + 1)
			for (let index = 0; index < animation.getDuration(true); index++) {
				if (clicks <= animation.getDuration(true)) {
					animation.goToAndStop(clicks, true)
				} else {
					setClicks(1)
					animation.goToAndStop(2, true)
				}
			}
		}
	}

	return (
		<section className="contact-me">
			<Headline text={"Contact me"} />
			<div className="contact-me-container">
				<div className="left">
					<input type="text" onChange={handleClick} />
				</div>
				<div
					className="right"
					onClick={handleClick}
					ref={rightContainerRef}
				></div>
			</div>
		</section>
	)
}

export default ContactMe
