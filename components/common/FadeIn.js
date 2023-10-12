"use client"
import { Fragment, useEffect, useRef, useState } from "react"
// import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect"
// import useGsapContext from "../hooks/useGsapContext"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import SplitText from "gsap/dist/SplitText"
import { Router, useRouter } from "next/navigation"
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin"

const FadeIn = ({
	children,
	onLoad,
	customClass,
	fraged,
	splitType,
	eleYValue,
	heroSliderAnimationDone,
	inFooter,
}) => {
	const el = useRef()
	const router = useRouter()
	// const ctx = useGsapContext(el)

	const q = gsap.utils.selector(el)

	const [loading, setLoading] = useState(true)
	gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText)
	useEffect(() => {
		// setTimeout(() => {
		// 	setLoading(false)
		// }, 2500)
		const tl = gsap.timeline({})
		let split1,
			split2,
			staggerVal,
			alphaVal,
			maskSplit,
			maskSplit2,
			maskSplitWords
		// if (!loading) {
		gsap.set(q("._eleWrap"), { autoAlpha: 1 }, 0)
		gsap.set(q("._eleX"), { x: 40, autoAlpha: 0 })
		gsap.set(q("._eleY"), { y: eleYValue ? eleYValue : 100, autoAlpha: 0 })
		gsap.set(q("._eleY50"), { y: 50, autoAlpha: 0 })
		gsap.set(q("._eleF"), { autoAlpha: 0 }, 0)
		gsap.set(q("._eleS"), { scale: 0, autoAlpha: 0 })
		gsap.set(q(".draw"), { autoAlpha: 1 }, 0)
		gsap.set(q(".txt"), { autoAlpha: 1 }, 0)
		if (splitType == "chars") {
			// gsap.set(q("._splitChars"), { autoAlpha: 1 })
			split1 = SplitText.create(q("._splitChars"), {
				type: "chars",
				charsClass: "SplitClass",
			})
			split2 = split1.chars
			staggerVal = 0.035
			alphaVal = 0
		} else if (splitType == "words") {
			// gsap.set(q("._splitWords"), { autoAlpha: 1 })
			split1 = SplitText.create(q("._splitWords"), {
				type: "words",
				wordsClass: "SplitClass",
			})
			gsap.set(split1, { autoAlpha: 1 })
			split2 = split1.words
			staggerVal = 0.1
			alphaVal = 0
		} else {
			split1 = SplitText.create(q("._splitLines"), {
				type: "lines",
				linesClass: "SplitClass",
			})
			maskSplit = SplitText.create(q("._mask"), {
				type: "lines",
				linesClass: "SplitClass",
			})
			maskSplit2 = SplitText.create(maskSplit.lines, {
				type: "words",
				wordsClass: "SplitClass",
			})
			split2 = split1.lines
			maskSplitWords = maskSplit2.words
			gsap.set(split2, { autoAlpha: 0 })
			gsap.set(maskSplitWords, { autoAlpha: 0 })
			staggerVal = 0.1
			alphaVal = 0
		}
		tl && tl.progress(0).kill()
		tl.to(q("._eleX"), {
			x: 0,
			autoAlpha: 1,
			delay: 0.25,
			ease: "power3.out",
			stagger: 0.1,
			duration: 1,
		})
			.to(
				q("._eleY"),
				{
					y: 0,
					autoAlpha: 1,
					delay: 0.25,
					ease: "power3.out",
					stagger: 0.1,
					duration: 1,
				},
				"<"
			)
			.to(
				q("._eleY50"),
				{
					y: 0,
					autoAlpha: 1,
					delay: 0.25,
					ease: "power3.out",
					stagger: 0.1,
					duration: 1,
				},
				"<"
			)
			.to(
				q("._eleF"),
				{
					y: 0,
					autoAlpha: 1,
					delay: 0.25,
					ease: "power3.out",
					stagger: 0.1,
					duration: 1,
				},
				"<"
			)
			.to(
				q("._eleS"),
				{
					scale: 1.2,
					autoAlpha: 1,
					delay: 0.25,
					stagger: 0.08,
					ease: "power3.out",
					duration: 1,
				},
				"<"
			)
			.fromTo(
				q(".draw"),
				{
					drawSVG: "0%",
				},
				{
					drawSVG: "100%",
					ease: "power0.none",
					delay: 0.5,
					duration: 1.5,
				},
				0
			)

		if (q("._mask").length != 0) {
			tl.fromTo(
				maskSplitWords,
				{ y: 100, autoAlpha: 0 },
				{
					y: 0,
					autoAlpha: 1,
					ease: "power3.out",
					stagger: 0.1,
					duration: 1,
					// delay: 0.25,
					onComplete: () => {
						if (heroSliderAnimationDone) {
							// alert("MMMM")
							document.body.classList.remove("no-scroll")
						}
					},
				},
				0
			)
		}
		if (q("._splitWrap").length != 0) {
			tl.set(q("._splitLines"), { autoAlpha: 1 }, 0)
			console.log(split1,"split");
			console.log(split2,"split22");
			tl.fromTo(
				split2,
				{ y: 30, autoAlpha: 0 },
				{
					y: 0,
					autoAlpha: 1,
					ease: "power3.out",
					stagger: 0.1,
					duration: 0.8,
					delay: 0.25,
					onComplete: () => {
						if (heroSliderAnimationDone) {
							// alert("MMMM")
							document.body.classList.remove("no-scroll")
						}
					},
				},
				0
			)
		}
		q(".interactive_label").forEach((element) => {
			const tlInterActive = gsap.timeline({ paused: true })
			const ele = element.querySelector("._txt")
			const ele2 = element.querySelector("._shape")

			let staggerVal, split1, split2

			if (ele && ele.length != 0) {
				if (!ele.classList.contains("words")) {
					split1 = new SplitText(ele, {
						type: "chars",
						charsClass: "SplitClass",
					})
					split2 = split1.chars
					staggerVal = 0.03
				} else {
					split1 = new SplitText(ele, {
						type: "words",
						wordsClass: "SplitClass",
					})
					split2 = split1.words
					staggerVal = 0.1
				}

				tlInterActive
					.to(
						[split2, ele2],

						{
							y: "-70%",
							autoAlpha: 0,
							ease: "power3.in",
							stagger: 0.05,
							duration: 0.3,
						},
						0
					)

					.set([split2, ele2], { y: "70%" })

					.to([split2, ele2], {
						y: "0%",
						autoAlpha: 1,
						ease: "power3.out",
						stagger: 0.05,
						duration: 0.3,
					})
			} else {
				tlInterActive
					.to(
						ele2,

						{
							y: "-70%",
							autoAlpha: 0,
							ease: "power3.in",
							stagger: 0.05,
							duration: 0.3,
						},
						0
					)

					.set(ele2, { y: "70%" })

					.to(ele2, {
						y: "0%",
						autoAlpha: 1,
						ease: "power3.out",
						stagger: 0.05,
						duration: 0.3,
					})
			}

			if (ele || ele2) {
				element.animation = tlInterActive

				element.addEventListener("mouseenter", () => {
					if (!element.animation.isActive()) {
						element.animation.restart()
					}
				})
			}
		})
		// }

		{
			!onLoad &&
				ScrollTrigger.create({
					trigger: el.current,
					animation: tl,
					// markers: true,
					// scrub: true,
					start: "top bottom",
					end: "bottom bottom",
					invalidateOnRefresh: true,
					smoothChildTiming: true,
				})
		}
		const handleReset = () => {
			maskSplit2.revert()
			maskSplit.revert()
			split1.revert()
			q("._mask").forEach((element) => element.classList.remove("_mask"))
		}
		// tl.eventCallback("onComplete", handleReset)

		// return () => ctx.revert()
	}, [eleYValue, heroSliderAnimationDone, onLoad, splitType])
	// }, [])

	if (fraged) {
		return (
			<Fragment className={customClass} ref={el}>
				{children}
			</Fragment>
		)
	} else {
		return (
			<div className={customClass} ref={el}>
				{children}
			</div>
		)
	}
}

export default FadeIn
