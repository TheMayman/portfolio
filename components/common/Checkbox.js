import { useState } from "react"

const Checkbox = ({ name }) => {
	const [isActive, setIsActive] = useState(false)

	const handleCheckbox = () => {
		!isActive ? setIsActive(true) : setIsActive(false)
	}

	return (
		<div
			className={`checkbox_container pointer f a-c ${isActive && "active"} `}
			onClick={handleCheckbox}
		>
			<div className="check f a-c j-c">
				<svg
					width="10"
					height="7"
					viewBox="0 0 10 7"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.46387 0.14502C9.67871 0.359863 9.67871 0.682129 9.46387 0.875488L3.79199 6.54736C3.59863 6.76221 3.27637 6.76221 3.08301 6.54736L0.161133 3.62549C-0.0537109 3.43213 -0.0537109 3.10986 0.161133 2.89502C0.354492 2.70166 0.676758 2.70166 0.870117 2.89502L3.44824 5.47314L8.75488 0.14502C8.94824 -0.0483398 9.27051 -0.0483398 9.46387 0.14502Z"
						fill="white"
					/>
				</svg>
			</div>
			<span>{name}</span>
		</div>
	)
}

export default Checkbox
