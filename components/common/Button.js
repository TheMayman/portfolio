"use client"

import Image from "next/image"
import Link from "next/link"

const Button = ({ text, href, target, icon }) => {
	return (
		<>
			<Link className="button" href={href} target={target}>
				{icon && (
					<div className="icon">
						<Image fill alt="" src={`/icons/${icon}`} />
					</div>
				)}
				<span>{text}</span>
				<div className="transition"></div>
			</Link>
		</>
	)
}

export default Button
