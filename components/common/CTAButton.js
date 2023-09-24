"use client"
import gsap from "gsap"
import SplitText from "gsap/dist/SplitText"
import Image from "next/image"
import { useContext, useEffect, useRef } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"
import Link from "next/link"

const CTAButton = ({
	customClass,
	text,
	icon,
	alt,
	splitType,
	noAnimation,
	submit,
	btn,
	useNativeButton,
	svgRightArrow,
	routerLink,
	url,
}) => {
	const { isMobile } = useContext(isMobileContext)
	const el = useRef(null)
	let q = gsap.utils.selector(el)
	let tl = useRef()
	let split1, split2, staggerVal, alphaVal
	gsap.registerPlugin(SplitText)
	function interactionY() {
		tl.current = gsap.timeline({ paused: true })
		if (splitType == "chars") {
			split1 = SplitText.create(q("._element"), {
				type: "chars",
				charsClass: "SplitClass",
			})
			split2 = split1.chars
			staggerVal = 0.035
			alphaVal = 0
		} else {
			split1 = SplitText.create(q("._element"), {
				type: "words",
				wordsClass: "SplitClass",
			})
			split2 = split1.words
			staggerVal = 0.05
			alphaVal = 0
		}

		tl.current
			.to(split2, {
				y: "-70%",
				autoAlpha: alphaVal,
				ease: "power3.in",
				stagger: staggerVal,
				duration: 0.3,
			})
			.set(split2, { y: "70%" })
			.to(split2, {
				y: "0%",
				autoAlpha: 1,
				ease: "power3.out",
				stagger: staggerVal,
				duration: 0.3,
			})

		el.current.addEventListener("mouseenter", function () {
			if (!tl.current.isActive() && !noAnimation) {
				tl.current.restart()
			}
		})
	}

	useEffect(() => {
		if (!isMobile) {
			interactionY()
		}
	}, [text, isMobile])

	if (btn) {
		return (
			<button ref={el} type={"submit"} className={`${customClass}`}>
				<span className="btn-content-container">
					{text && (
						<span className={`_element words ${splitType || "words"}`}>
							{text}
						</span>
					)}
					{icon && (
						<Image
							src={icon}
							alt={alt ? alt : "button icon"}
							className="icon"
							width={"15"}
							height={"15"}
						/>
					)}
				</span>
			</button>
		)
	} else
		return (
			<a role="button" ref={el} className={`${customClass}`}>
				<span className="btn-content-container">
					{text && (
						<span className={`_element words ${splitType || "words"}`}>
							{text}
						</span>
					)}
					{icon && (
						<Image
							src={icon}
							alt={alt ? alt : "button icon"}
							className="icon"
							width={"15"}
							height={"15"}
						/>
					)}
				</span>
			</a>
		)
}

export default CTAButton
