import Select, { components } from "react-select"
import { useState } from "react"

const ReactSelectInput = ({ ...props }) => {
	const [optionLabel, setOptionLabel] = useState(
		props?.defaultValue?.label || ""
	)

	const DropdownIndicator = (innerProps) => {
		return (
			components.DropdownIndicator && (
				<components.DropdownIndicator {...innerProps}>
					<svg
						width="10"
						height="13"
						viewBox="0 0 10 13"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{ width: "1rem", height: "1rem" }}
					>
						<path
							d="M1.73828 5.875H8.98438C9.64062 5.875 9.99609 5.08203 9.50391 4.58984L5.89453 0.871094C5.75781 0.707031 5.56641 0.625 5.375 0.625C5.18359 0.625 4.96484 0.707031 4.82812 0.871094L1.21875 4.58984C0.726562 5.08203 1.08203 5.875 1.73828 5.875ZM8.98438 7.625H1.73828C1.08203 7.625 0.726562 8.44531 1.21875 8.9375L4.82812 12.6562C4.96484 12.8203 5.15625 12.875 5.375 12.875C5.56641 12.875 5.75781 12.8203 5.89453 12.6562L9.50391 8.9375C9.99609 8.44531 9.64062 7.625 8.98438 7.625Z"
							fill="#211D33"
						/>
					</svg>
				</components.DropdownIndicator>
			)
		)
	}
	const SingleValue = (innerProps) => {
		return (
			components.SingleValue && (
				<components.SingleValue {...innerProps}>
					<div>
						{props.customValuePrefix} {optionLabel}
					</div>
				</components.SingleValue>
			)
		)
	}

	return (
		<Select
			options={props.options}
			defaultValue={props.defaultValue}
			styles={props.customStyles}
			placeholder={props.placeholder}
			isSearchable={false}
			className={`select-input`}
			maxMenuHeight={"16.5rem"}
			instanceId={Math.random(1, 100)}
			components={{ DropdownIndicator, SingleValue }}
			onChange={(e) => {
				setOptionLabel(e.label)
				props.onChangeFunction(e.value)
			}}
		/>
	)
}

export default ReactSelectInput
