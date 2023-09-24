"use client"

import Lottie from "lottie-web"
import { useEffect, useRef } from "react"

const SvgAnimated = ({ customClass, dataSrc, children }) => {
	const el = useRef()
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
	useEffect(() => {
		Lottie.loadAnimation({
			container: el.current,
			renderer: "svg",
			loop: true,
			autoplay: isSafari ? false : true,
			path: el.current.dataset.src,
		})

		el.current.removeAttribute("data-src")
	}, [])

	return (
		<div className={customClass} ref={el} data-src={dataSrc}>
			{children}
		</div>
	)
}

export default SvgAnimated
