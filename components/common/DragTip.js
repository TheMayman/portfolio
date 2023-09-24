"use client"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { isMobileContext } from "@/contexts/isMobileContext"
import { isTouchContext } from "@/contexts/isTouchContext"
const DragTip = () => {
	const { isMobile } = useContext(isMobileContext)
	const { isTouch } = useContext(isTouchContext)
	const el = useRef()

	const tlRef = useRef(null)
	const dragTL = useRef(null)

	const slidersRef = useRef([])
	const noTipRef = useRef([])
	const isTouchRef = useRef(false)
	const isCurHiddenRef = useRef(false)
	const mouseRef = useRef({ x: 0, y: 0 })

	const handleMouseMove = useCallback((e) => {
		mouseRef.current.x = e.pageX
		mouseRef.current.y = e.pageY - window.scrollY
	}, [])

	const handleNoTipMouseEnter = useCallback(() => {
		isCurHiddenRef.current = true
		tlRef.current.reverse()
	}, [])

	const handleNoTipMouseLeave = useCallback(() => {
		isCurHiddenRef.current = false
	}, [])

	const handleSliderMouseMove = useCallback(() => {
		if (!isCurHiddenRef.current) {
			tlRef.current.play()
		}
	}, [])

	const handleSliderMouseLeave = useCallback(() => {
		if (!isCurHiddenRef.current) {
			tlRef.current.reverse()
		}
	}, [])
	function updateDrag(getX, getY) {
		let drag = document.querySelector(".drag_tip"),
			calcX = getX - drag.offsetWidth / 2,
			calcY = getY - drag.offsetHeight / 2

		gsap.to(drag, { x: calcX, y: calcY, ease: "power3.out", duration: 0.5 })
	}
	useEffect(() => {
		const sliders = document.querySelectorAll(".has_tip")
		const noTip = document.querySelectorAll(".no_tip")

		const tl = gsap
			.timeline({ paused: true })
			.to(".drag_tip", { autoAlpha: 1, ease: "power3.out", duration: 1 }, 0)
			.to(
				".drag_tip > i path",
				{ strokeDashoffset: 0, ease: "power3.out", duration: 1 },
				0
			)
			.to(
				".drag_tip > i",

				{ rotation: 360, ease: "power3.out", duration: 1 },
				0
			)
			.to(".drag_tip > svg", { x: 0, ease: "power3.out", duration: 1 }, 0)
		dragTL.current = new gsap.timeline({ paused: true }).to(
			".drag_tip i",
			0.3,
			{
				scale: 1.2,
				ease: "power3.inOut",
			}
		)

		const handleMouseMove = (e) => {
			mouseRef.current.x = e.pageX
			mouseRef.current.y = e.pageY - window.scrollY
			if (mouseRef.current.x) {
				updateDrag(mouseRef.current.x, mouseRef.current.y)
			}
		}

		const handleUpdateDrag = () => {
			if (mouseRef.current.x) {
				updateDrag(mouseRef.current.x, mouseRef.current.y)
			}
		}

		const handleMouseEnter = () => {
			isCurHiddenRef.current = true
			tl.reverse()
		}

		const handleMouseLeave = () => {
			isCurHiddenRef.current = false
		}

		const handleSliderMove = () => {
			if (!isCurHiddenRef.current) {
				tl.play()
			}
		}
		const handleSliderPointerDown = () => {
			console.log("down")
			dragTL.current.play()
		}
		const handleSliderPointerUp = () => {
			console.log("up")
			dragTL.current.reverse()
		}

		const handleSliderLeave = () => {
			if (!isCurHiddenRef.current) {
				tl.reverse()
			}
		}

		window.addEventListener("mousemove", handleMouseMove)

		if (sliders && sliders.length != 0 && !isTouch) {
			// window.addEventListener("mousemove", handleUpdateDrag)

			noTip.forEach((e) => {
				e.addEventListener("mouseenter", handleMouseEnter)
				e.addEventListener("mouseleave", handleMouseLeave)
			})

			sliders.forEach((e) => {
				e.addEventListener("mousemove", handleSliderMove)
				e.addEventListener("mouseleave", handleSliderLeave)

				e.addEventListener("pointermove", handleMouseMove)

				e.addEventListener("pointerdown", handleSliderPointerDown)

				e.addEventListener("pointerup", handleSliderPointerUp)
			})
		}

		// Cleanup
		return () => {
			window.removeEventListener("mousemove", handleMouseMove)

			if (sliders && sliders.length != 0 && !isTouch) {
				window.removeEventListener("mousemove", handleMouseMove)

				noTip.forEach((e) => {
					e.removeEventListener("mouseenter", handleMouseEnter)
					e.removeEventListener("mouseleave", handleMouseLeave)
				})

				sliders.forEach((e) => {
					e.removeEventListener("mousemove", handleSliderMove)
					e.removeEventListener("mouseleave", handleSliderLeave)
				})
			}
		}
	}, [])

	return (
		<div className="drag_tip f a-c j-c" ref={el}>
			<i className="full_bg">
				<svg
					width="634"
					height="635"
					viewBox="0 0 634 635"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M633.5 317.5C633.5 492.575 491.797 634.5 317 634.5C142.203 634.5 0.5 492.575 0.5 317.5C0.5 142.425 142.203 0.5 317 0.5C491.797 0.5 633.5 142.425 633.5 317.5Z"
						stroke="currentcolor"
						strokeWidth="4"
					/>
				</svg>
			</i>
			<svg
				width="27"
				className="arrow_ft"
				height="23"
				viewBox="0 0 27 23"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M26.625 11.75C26.625 12.2773 26.1562 12.6875 25.6289 12.6875L3.53906 12.6875L11.7422 21.4766C12.0937 21.8281 12.0937 22.4141 11.6836 22.7656C11.5078 22.9414 11.2734 23 11.0391 23C10.7461 23 10.5117 22.9414 10.3359 22.707L0.609375 12.3945C0.257812 12.043 0.257812 11.5156 0.609375 11.1641L10.3359 0.851563C10.6875 0.441406 11.2734 0.441406 11.6836 0.792969C12.0938 1.14453 12.0938 1.73047 11.7422 2.08203L3.53906 10.8125L25.6289 10.8125C26.1562 10.8125 26.625 11.2813 26.625 11.75Z"
					fill="currentcolor"
				/>
			</svg>
			<svg
				width="27"
				className="arrow_rt"
				height="23"
				viewBox="0 0 27 23"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M0.375 11.75C0.375 12.2773 0.84375 12.6875 1.37109 12.6875L23.4609 12.6875L15.2578 21.4766C14.9063 21.8281 14.9063 22.4141 15.3164 22.7656C15.4922 22.9414 15.7266 23 15.9609 23C16.2539 23 16.4883 22.9414 16.6641 22.707L26.3906 12.3945C26.7422 12.043 26.7422 11.5156 26.3906 11.1641L16.6641 0.851563C16.3125 0.441406 15.7266 0.441406 15.3164 0.792969C14.9062 1.14453 14.9062 1.73047 15.2578 2.08203L23.4609 10.8125L1.37109 10.8125C0.84375 10.8125 0.375 11.2813 0.375 11.75Z"
					fill="currentcolor"
				/>
			</svg>
		</div>
	)
}

export default DragTip

//Try this if the above function not working
// useEffect(() => {
// 	const sliders = document.querySelectorAll(".has_tip")
// 	const noTip = document.querySelectorAll(".no_tip")

// 	const tl = gsap
// 		.timeline({ paused: true })
// 		.to(".drag_tip", 1, { autoAlpha: 1, ease: "power3.out" }, 0)
// 		.to(".drag_tip > i path", 1, { strokeDashoffset: 0, ease: "power3.out" }, 0)
// 		.to(".drag_tip > i", 1, { rotation: 360, ease: "power3.out" }, 0)
// 		.to(".drag_tip > svg", 1, { x: 0, ease: "power3.out" }, 0)

// 	const handleMouseMove = (e) => {
// 		mouse.x = e.pageX
// 		mouse.y = e.pageY - window.pageYOffset
// 	}

// 	const handleUpdateDrag = () => {
// 		if (mouse.x) {
// 			updateDrag(mouse.x, mouse.y)
// 		}
// 	}

// 	const handleMouseEnter = () => {
// 		isCurHidden = true
// 		tl.reverse()
// 	}

// 	const handleMouseLeave = () => {
// 		isCurHidden = false
// 	}

// 	const handleSliderMove = () => {
// 		if (!isCurHidden) {
// 			tl.play()
// 		}
// 	}

// 	const handleSliderLeave = () => {
// 		if (!isCurHidden) {
// 			tl.reverse()
// 		}
// 	}

// 	window.addEventListener("mousemove", handleMouseMove)

// 	if (sliders && sliders.length != 0 && !isTouch) {
// 		window.addEventListener("mousemove", handleUpdateDrag)

// 		noTip.forEach((e) => {
// 			e.addEventListener("mouseenter", handleMouseEnter)
// 			e.addEventListener("mouseleave", handleMouseLeave)
// 		})

// 		sliders.forEach((e) => {
// 			e.addEventListener("mousemove", handleSliderMove)
// 			e.addEventListener("mouseleave", handleSliderLeave)
// if (!dragTL.current) {
// 	console.log("in")
// 	dragTL.current = new gsap.timeline({ paused: true })
// 	dragTL.current.to(".drag_tip i", 0.3, {
// 		scale: 1.2,
// 		ease: "power3.inOut",
// 	})
// }

// if (!isTouch) {
// 	console.log("in22")
// 	e.addEventListener("dragMove", function (event, pointer, moveVector) {
// 		updateDrag(mouseRef.x + moveVector.x, mouseRef.y + moveVector.y)
// 	})

// 	e.addEventListener("pointerDown", function () {
// 		dragTL.current.play()
// 	})

// 	e.addEventListener("pointerUp", function () {
// 		dragTL.current.reverse()
// 	})
// }
// 		})
// 	}

// 	// Cleanup
// 	return () => {
// 		window.removeEventListener("mousemove", handleMouseMove)

// 		if (sliders && sliders.length != 0 && !isTouch) {
// 			window.removeEventListener("mousemove", handleUpdateDrag)

// 			noTip.forEach((e) => {
// 				e.removeEventListener("mouseenter", handleMouseEnter)
// 				e.removeEventListener("mouseleave", handleMouseLeave)
// 			})

// 			sliders.forEach((e) => {
// 				e.removeEventListener("mousemove", handleSliderMove)
// 				e.removeEventListener("mouseleave", handleSliderLeave)
// 			})
// 		}
// 	}
// }, [])
