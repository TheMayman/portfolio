import { useRef, useState, useEffect, useCallback } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import ReactPlayer from "react-player"
import Image from "next/image"
import Magnitizer from "./Magnitizer"
import ArrowsAnimation from "./ArrowsAnimation"
const ModalGsap = ({ setIsPlaying, isPlaying, data }) => {
	gsap.registerPlugin(ScrollTrigger)
	const modalRef = useRef(null)
	const videoRef = useRef(null)
	const [isVisible, setIsVisible] = useState(false)

	const toggleModal = () => {
		setIsPlaying(!isPlaying)
	}

	useEffect(() => {
		if (isPlaying) {
			gsap.to(modalRef.current, { duration: 0.5, opacity: 1, display: "block" })
		} else {
			gsap.to(modalRef.current, { duration: 0.5, opacity: 0, display: "none" })
		}
	}, [isPlaying])
	useEffect(() => {
		ScrollTrigger.create({
			trigger: modalRef.current,
			start: "top 80%",
			// onEnter: () => toggleModal(),
			// onLeaveBack: () => toggleModal(),
		})
	}, [modalRef])

	const handleClickOutside = (event) => {
		if (videoRef.current && !videoRef.current.contains(event.target)) {
			setIsPlaying(false)
		}
	}
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [videoRef])
	return (
		<div className="modal" ref={modalRef}>
			<div className="modal-content" ref={videoRef}>
				<ReactPlayer
					className="video-player"
					playing={isPlaying}
					// url={"https://www.youtube.com/watch?v=bNucJgetMjE"}
					url={data?.video_link}
					width={"100%"}
					height={"100%"}
					playsinline={true}
					controls={true}
				/>
				<a>
					<div className="close-container rounded_corners _pointer">
						<div className={`icon-container ${isPlaying ? "playing" : ""}`}>
							<Magnitizer
								customClass={`icon ${isPlaying ? "playing-icon" : ""}`}
								dataDest={1.5}
							>
								<div className="play-container" onClick={toggleModal}>
									<ArrowsAnimation>
										<svg
											className=""
											width="20"
											height="25"
											viewBox="0 0 26 31"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M1.84375 0.839844C2.83984 0.242188 4.10156 0.242188 5.09766 0.90625L24.2227 12.5273C25.1523 13.125 25.75 14.1875 25.75 15.25C25.75 16.3789 25.1523 17.4414 24.2227 17.9727L5.09766 29.6602C4.10156 30.2578 2.83984 30.3242 1.84375 29.7266C0.847656 29.1953 0.25 28.1328 0.25 26.9375V3.5625C0.25 2.43359 0.847656 1.37109 1.84375 0.839844ZM3.96875 2.69922C3.63672 2.5 3.23828 2.5 2.90625 2.69922C2.57422 2.83203 2.375 3.23047 2.375 3.5625V26.9375C2.375 27.3359 2.57422 27.7344 2.90625 27.8672C3.23828 28.0664 3.63672 28.0664 3.96875 27.8672L23.0938 16.1797C23.4258 15.9805 23.625 15.6484 23.625 15.25C23.625 14.918 23.4258 14.5859 23.0938 14.3867L3.96875 2.69922Z"
												fill="white"
											/>
										</svg>
									</ArrowsAnimation>
								</div>
							</Magnitizer>
						</div>
					</div>
				</a>
			</div>
		</div>
	)
}

export default ModalGsap
