"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useEffect, useRef } from "react"

const StickySection = ({ children, customClass }) => {
	const el = useRef()
	const tl = useRef()
	const q = gsap.utils.selector(el)
	const mmCtx = gsap.matchMedia()
	const breakPoint = 961
	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)
		//Only handling 1 sticky section per wrapper
		let stickyTarget = q("._sticky")[0]

		mmCtx.add(
			{
				isDesktopMM: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
				isMobileMM: `(max-width: ${
					breakPoint - 1
				}px) and (prefers-reduced-motion: no-preference)`,
			},
			(ctx) => {
				let { isDesktopMM, isMobileMM } = ctx.conditions
				isDesktopMM
					? (tl.current = gsap.timeline({
							scrollTrigger: {
								id: "t-sticky",
								invalidateOnRefresh: true,
								trigger: stickyTarget,
								start: "0% 0%",
								end: () =>
									`+=${el.current.offsetHeight - stickyTarget?.offsetHeight}`,
								pin: true,
								pinSpacing: false,
							},
							defaults: { ease: "none" },
					  }))
					: isMobileMM && ScrollTrigger.getById("t-sticky")
					? ScrollTrigger.getById("t-sticky").kill(true)
					: mmCtx.revert()
			},
			el
		)
		return () => {
			mmCtx.revert()
		}
	}, [mmCtx, q])

	return (
		<div className={customClass} ref={el}>
			{children}
		</div>
	)
}

export default StickySection
