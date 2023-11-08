import Lottie from "lottie-react"
import scroll from "../../public/json/scroll-down.json"

const ScrollMe = () => {
	return (
		<>
			<Lottie className="scroll-me" animationData={scroll} />
		</>
	)
}

export default ScrollMe
