import { useField } from "formik"
import { Children, useState } from "react"
import Select from "react-select"
import { customStyles3 } from "../../utils/SelectOptions"
import {
	animated,
	useSpring,
	config,
	useSpringRef,
	useChain,
} from "react-spring"
// import CTAButtons from "./CTAButtons/CTAButtons"
// import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"

const FormReactSelect = ({ label, ...props }) => {
	const { locale } = useRouter()
	const [field, meta, { setValue, setTouched, setError }] = useField(props)
	const options = props.options
	const cities = props.cities
	const models = props.models
	const cityById = props.cityById
	const showRooms = props.showRooms
	const disabled = props.disabled

	// const onChange = ({ value }) => {
	// 	setValue(value)
	// 	setTouched(true)
	// 	// console.log(meta.error.city)
	// console.log(meta.error)
	// }
	// console.log(props.defaultValue.value==options[0].value);

	return (
		<div>
			<label htmlFor={props.id || props.name} className="form-label">
				{label}
			</label>
			<Select
				defaultValue={props.defaultValue ? props.defaultValue : null}
				options={options}
				getOptionLabel={(option) =>
					cities && !cityById
						? option[`name_${locale}`]
						: models
						? option["description"]
						: cityById
						? option.name
						: showRooms
						? option[`name_${locale}`]
						: option.label
				}
				getOptionValue={(option) =>
					cities && !cityById
						? option.code
						: cityById
						? option.id
						: showRooms
						? option.id
						: option.value
				}
				onChange={props.onChange}
				onBlur={setTouched}
				styles={customStyles3}
				placeholder={props.placeholder}
				isSearchable={false}
				className={`select-input ${
					meta.error && meta.touched ? "error-border" : ""
				}`}
				maxMenuHeight={"16.5rem"}
				name={props.name}
				isDisabled={disabled ? true : false}
				instanceId={Math.random(1, 1000)}
			/>
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</div>
	)
}

const FormTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input
				className={`text-input ${
					meta.error && meta.touched ? "error-border" : ""
				}`}
				{...field}
				{...props}
			/>

			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : props.backEndError && meta.touched && !meta.error ? (
				<div className="error">{props.backEndError}</div>
			) : props.backEndError && !meta.touched && !meta.error ? null : null}
		</>
	)
}

const FormNumberInput = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	const ar = [..."٠١٢٣٤٥٦٧٨٩"],
		en = [..."0123456789"]
	// const toEnglishNumber = (strNum) => {
	// 	var nu = strNum.key.replace("٢", "2")
	// 	strNum.target.value = nu
	// 	console.log(strNum.target.value)

	// const toEnglishNumber = (s) => {
	// 	if (ar.join("").includes(s.key)) {
	// 		var numberUsed = s.key.replace(new RegExp(`[${ar.join("")}]`, "g"), (m) => en[ar.indexOf(m)])
	// 		s.target.value += numberUsed
	// 		console.log(s.target.value);
	// 	}
	// }

	// var ar = '٠١٢٣٤٥٦٧٨٩'.split('');
	// var en = '0123456789'.split('');
	// let numberUsed = strNum?.key.replace(/[٠١٢٣٤٥٦٧٨٩]/g, x => en[ar.indexOf(x)]);
	// numberUsed = strNum?.key.replace(/[^\d]/g, '');
	// strNum.target.value = numberUsed;
	// }
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input
				className={`text-input ${
					meta.error && meta.touched ? "error-border" : ""
				}`}
				{...field}
				{...props}
				// onKeyUp={(e) => toEnglishNumber(e)}
			/>
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	)
}

const FormTextFieldInput = ({ label, row, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<textarea rows={row} className="text-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	)
}

const FormSelect = ({ label, children, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<select {...field} {...props}>
				{children}
			</select>
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	)
}
// const FormUpload = ({ label, ...props }) => {
// 	const [field, meta] = useField(props)
// 	const { t } = useTranslation()
// 	return (
// 		<div>
// 			<label htmlFor={props.id || props.name}>
// 				{props.filename ? (
// 					<div className="uploaded-file-name-container">
// 						<div className="uploaded-file-name">{props.filename}</div>
// 						<div className="img-container">
// 							<img src="/icons/close-models.svg" alt="close" />
// 						</div>
// 					</div>
// 				) : (
// 					<CTAButtons text={t("upload")} theme={"red"} />
// 				)}
// 			</label>
// 			<input {...props} />
// 			{/* {meta.touched && meta.error ? (
// 				<div className="error">{meta.error}</div>
// 			) : null} */}
// 			{meta.touched && meta.error ? (
// 				<div className="error">{meta.error}</div>
// 			) : props.backEndError && meta.touched && !meta.error ? (
// 				<div className="error">{props.backEndError}</div>
// 			) : props.backEndError && !meta.touched && !meta.error ? null : null}
// 		</div>
// 	)
// }

const FormCheckBox = ({ children, ...props }) => {
	const [field, meta] = useField({ ...props, type: "checkbox" })
	const [isChecked, setIsChecked] = useState(false)
	const checkboxAnimationRef = useSpringRef()
	const checkboxAnimationStyle = useSpring({
		backgroundColor: isChecked ? "#10C600" : "#fff",
		borderColor: isChecked ? "#10C600" : "#ddd",
		config: config.gentle,
		ref: checkboxAnimationRef,
	})

	const [checkmarkLength, setCheckmarkLength] = useState(null)

	const checkmarkAnimationRef = useSpringRef()
	const checkmarkAnimationStyle = useSpring({
		x: isChecked ? 0 : checkmarkLength,
		config: config.default,
		ref: checkmarkAnimationRef,
	})

	useChain(
		isChecked
			? [checkboxAnimationRef, checkmarkAnimationRef]
			: [checkmarkAnimationRef, checkboxAnimationRef],
		[0, 0.1]
	)

	return (
		<>
			<label>
				<input
					{...field}
					{...props}
					type="checkbox"
					onClick={() => {
						setIsChecked(!isChecked)
					}}
				/>
				<animated.svg
					className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
					// This element is purely decorative so
					// we hide it for screen readers
					ariaHidden="true"
					viewBox="0 0 15 11"
					fill="none"
					style={checkboxAnimationStyle}
				>
					<animated.path
						d="M1 4.5L5 9L14 1"
						strokeWidth="2"
						stroke="#fff"
						strokeDasharray={checkmarkLength}
						strokeDashoffset={checkmarkAnimationStyle.x} // only show the checkmark when `isCheck` is `true`
						ref={(ref) => {
							if (ref) {
								setCheckmarkLength(ref.getTotalLength())
							}
						}}
					/>
				</animated.svg>
				{children}
			</label>
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	)
}

export {
	FormTextInput,
	FormTextFieldInput,
	FormSelect,
	FormCheckBox,
	FormReactSelect,
	// FormUpload,
	FormNumberInput,
}
