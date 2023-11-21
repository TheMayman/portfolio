"use client"
import Lottie from "lottie-web"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import Headline from "./Headline"
import gsap from "gsap"
import useGsapContext from "./useGsapContext"
import { Field, Form, Formik } from "formik"
import Select from "react-select"
import Button from "./Button"

const ContactMe = () => {
	const rightContainerRef = useRef()
	const contactMeRef = useRef()
	const [animation, setAnimation] = useState()
	const [clicks, setClicks] = useState(0)

	const options = [
		// { value: "" },
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
	]

	gsap.registerPlugin(ScrollTrigger)

	const ctx = useGsapContext(contactMeRef)

	useEffect(() => {
		let animation = Lottie.loadAnimation({
			container: rightContainerRef.current,
			renderer: "svg",
			autoplay: false,
			path: "/json/earth.json",
		})
		setAnimation(animation)
		// ctx.add(() => {
		// 	let tl = new gsap.timeline()

		// 	tl.fromTo(
		// 		".left-svg",
		// 		{
		// 			drawSvg: 0,
		// 		},
		// 		{ drawSvg: "100%" }
		// 	)
		// 	return () => {
		// 		ctx.revert()
		// 	}
		// })
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
			<div className="contact-me-container" ref={contactMeRef}>
				<div className="left">
					<svg className="left-svg" width="400" height="110">
						<rect width="300" height="100" />
					</svg>
					<svg className="right-svg" width="400" height="110">
						<rect width="300" height="100" />
					</svg>
					<div className="form-container">
						<h3 className="title">
							Reach Out to Transform Your <br /> Online Presence
						</h3>
						<p className="sub-title">
							Ready to elevate your online presence? Whether you have a specific
							project in mind or just want to explore the possibilities,
							I&apos;m here to help. Drop me a message, and let&apos;s start the
							conversation.
						</p>
						<div>
							<Formik
								initialValues={{
									firstName: "",
									lastName: "",
									email: "",
								}}
								onSubmit={async (values) => {
									await new Promise((r) => setTimeout(r, 500))
									alert(JSON.stringify(values, null, 2))
								}}
							>
								<Form id="contact-me">
									<div className="form-group">
										<div className="form-control">
											<label htmlFor="firstName">First Name</label>
											<Field
												id="firstName"
												name="firstName"
												placeholder="Jane"
											/>
										</div>
										<div className="form-control">
											<label htmlFor="lastName">Last Name</label>
											<Field id="lastName" name="lastName" placeholder="Doe" />
										</div>
									</div>

									<div className="form-group">
										<div className="form-control">
											<label htmlFor="email">Email</label>
											<Field
												id="email"
												name="email"
												placeholder="jane@acme.com"
												type="email"
											/>
										</div>
										<div className="form-control">
											<label htmlFor="project_size">Project Size</label>
											<Select
												id="project_size"
												name="project_size"
												styles={{
													control: (baseStyles, state) => ({
														...baseStyles,
														border: "none",
														borderBottom: state.isFocused
															? "1px solid #a09160"
															: "1px solid #fff",
														borderRadius: "0",
														background: "transparent",
														outline: "none",
														boxShadow: "none",
														color: "#fff",
														cursor: "pointer",
														paddingLeft: 0,
													}),
													container: (baseStyles) => ({
														...baseStyles,
														height: "54px",
													}),
													input: (baseStyles) => ({
														...baseStyles,
														margin: 0,
														color: "#fff",
													}),
													singleValue: (baseStyles) => ({
														...baseStyles,
														margin: 0,
														color: "#fff",
													}),
													menuList: (baseStyles) => ({
														...baseStyles,
														color: "#111",
														backgroundColor: "#111",
													}),
													valueContainer: (baseStyles) => ({
														...baseStyles,
														paddingLeft: 0,
													}),
													option: (provided, state) => ({
														...provided,
														backgroundColor: state.isSelected
															? "#a09160"
															: "#fff",
														cursor: "pointer",
														":hover": {
															backgroundColor: "#a091606e",
															color: "#fff",
														},
													}),
													indicatorSeparator: (baseStyles) => ({
														...baseStyles,
														// display:"none"
													}),
												}}
												options={options}
											/>
										</div>
									</div>
									<div className="form-group full">
										<div className="form-control full">
											<label htmlFor="message">Message</label>
											<textarea
												name="message"
												id="message"
												rows="10"
												width="100%"
											></textarea>
										</div>
									</div>
									<Button text={"Submit"} />
								</Form>
							</Formik>
						</div>
					</div>
				</div>
				<div
					className="right"
					onClick={handleClick}
					ref={rightContainerRef}
				></div>
			</div>
			<section> </section>
		</section>
	)
}

export default ContactMe
