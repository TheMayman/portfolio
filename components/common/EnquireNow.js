"use client"

import Image from "next/image"
import FadeIn from "./FadeIn"
import CTAButton from "./CTAButton"
import { useEffect } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { FormSelect, FormTextInput } from "./FormInputs"

const EnquireNow = () => {
	function forms() {
		let formInput = document.querySelectorAll(".form_input")

		formInput.forEach(function (e) {
			let getInput = e.querySelector("input")

			if (getInput) {
				getInput.addEventListener("focus", function () {
					e.classList.add("focus")
				})

				getInput.addEventListener("change", function () {
					updateInputs()
				})

				getInput.addEventListener("blur", function () {
					updateInputs()
				})

				getInput.addEventListener("keyup", function () {
					updateInputs()
				})
			}
		})
	}

	function updateInputs() {
		let formInput = document.querySelectorAll(".form_input")

		formInput.forEach(function (e) {
			let getInput = e.querySelector("input")

			if (getInput) {
				let inputValue = getInput.value

				inputValue.length != 0
					? e.classList.add("focus")
					: e.classList.remove("focus")
			}
		})
	}
	const initialValues = {
		name: "",
		email: "",
		phone_number: "",
		project: "",
		unit_type: "",
	}
	const validationSchema = Yup.object({
		name: Yup.string().required("Required"),
		email: Yup.string()
			.email("Please enter a valid email address")
			.required("Required")
			.matches(/^([a-zA-Z0-9_\-\.])/, "Please enter a valid email address"),
		phone_number: Yup.string()
			.required("Required")
			.min(9, "Your phone number must be valid")
			.max(13, "Your phone number must be valid")
			.matches("^[0-9]*$", "Your phone number must be valid"),
		project: Yup.string().required("Required"),
		unit_type: Yup.string().required("Required"),
	})
	useEffect(() => {
		forms()
	}, [])

	return (
		<section id="section-enquire" className="enquire_section page-section">
			<div className="inner_padding_less x_padding">
				<div className="enq_sides f">
					<div className="enq_side">
						<div className="enq_image_cover cover" data-speed="0.95">
							<Image src="/images/enquire_bg.webp" alt="enquire_now_img" fill />
						</div>
					</div>

					<div className="enq_side">
						<FadeIn customClass={"enq_container"}>
							<div className=" _eleWrap">
								<h4 className="_mask">Enquire Now</h4>

								{/* <!-- Form Start --> */}
								<div className="inputs_wrap">
									<Formik
										initialValues={initialValues}
										validationSchema={validationSchema}
										onSubmit={(
											values,
											{ resetForm, setSubmitting, setFieldValue }
										) => {
											console.log(values)
											setSubmitting(false)
											setTimeout(() => {}, 2000)
										}}
									>
										{(formik) => (
											<form onSubmit={formik.handleSubmit}>
												<div className="form_input f a-c _eleY">
													<div className="input_container f a-c">
														<FormTextInput
															label={"Name"}
															type="text"
															name="name"
															autoComplete="off"
															tabIndex="-1"
														/>
													</div>
												</div>

												<div className="form_input f a-c _eleY">
													<div className="input_container f a-c">
														<FormTextInput
															label={"Email Address"}
															type="email"
															name="email"
															autoComplete="off"
															tabIndex="-1"
														/>
													</div>
												</div>

												<div className="form_input f a-c _eleY">
													<div className="input_container f a-c">
														<FormTextInput
															label={"Phone Number"}
															type="text"
															name="phone_number"
															autoComplete="off"
															tabIndex="-1"
														/>
													</div>
												</div>

												<div className="form_input f a-c _eleY">
													<div className="input_container f a-c">
														<FormSelect
															name="project"
															autoComplete="off"
															tabIndex="-1"
														>
															<option value="">Project</option>
															<option value="Project 1">Project 1</option>
															<option value="Project 2">Project 2</option>
															<option value="Project 3">Project 3</option>
															<option value="Project 4">Project 4</option>
															<option value="Project 5">Project 5</option>
														</FormSelect>

														<div className="select_arrow">
															<svg
																width="11"
																height="8"
																viewBox="0 0 11 8"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M5.49963 7.5C5.2986 7.5 5.09746 7.41455 4.94425 7.24365L0.230179 1.99365C-0.0767265 1.65186 -0.0767265 1.09814 0.230179 0.756348C0.537085 0.414551 1.03427 0.414551 1.34118 0.756348L5.49963 5.38906L9.65882 0.757031C9.96573 0.415234 10.4629 0.415234 10.7698 0.757031C11.0767 1.09883 11.0767 1.65254 10.7698 1.99434L6.05575 7.24434C5.90229 7.41523 5.70096 7.5 5.49963 7.5Z"
																	fill="black"
																/>
															</svg>
														</div>
													</div>
												</div>

												<div className="form_input f a-c _eleY">
													<div className="input_container f a-c">
														<FormSelect
															name="unit_type"
															autoComplete="off"
															tabIndex="-1"
														>
															<option value="">Unit Type</option>
															<option value="Unit Type 1">Unit Type 1</option>
															<option value="Unit Type 2">Unit Type 2</option>
															<option value="Unit Type 3">Unit Type 3</option>
															<option value="Unit Type 4">Unit Type 4</option>
															<option value="Unit Type 5">Unit Type 5</option>
														</FormSelect>

														<div className="select_arrow">
															<svg
																width="11"
																height="8"
																viewBox="0 0 11 8"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M5.49963 7.5C5.2986 7.5 5.09746 7.41455 4.94425 7.24365L0.230179 1.99365C-0.0767265 1.65186 -0.0767265 1.09814 0.230179 0.756348C0.537085 0.414551 1.03427 0.414551 1.34118 0.756348L5.49963 5.38906L9.65882 0.757031C9.96573 0.415234 10.4629 0.415234 10.7698 0.757031C11.0767 1.09883 11.0767 1.65254 10.7698 1.99434L6.05575 7.24434C5.90229 7.41523 5.70096 7.5 5.49963 7.5Z"
																	fill="black"
																/>
															</svg>
														</div>
													</div>
												</div>

												<div className="form_end _eleY">
													<CTAButton
														btn
														customClass={
															"site_button noselect solid f a-c j-c interactive_label pointer uppercase _txt words"
														}
														text={"Send Message"}
													/>
												</div>
											</form>
										)}
									</Formik>
								</div>
								{/* <!-- Form End --> */}
							</div>
						</FadeIn>
					</div>
				</div>
			</div>
		</section>
	)
}

export default EnquireNow
