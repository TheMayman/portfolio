"use client"
import Marquee from "react-fast-marquee"
const Headline = ({ text }) => {
	return (
		<div className="title-container">
			<Marquee autoFill={false}>
				<h2 className="title">{text}</h2>
			</Marquee>
		</div>
	)
}

export default Headline
