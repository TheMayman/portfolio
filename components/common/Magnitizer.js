import gsap, { mapRange } from "gsap";
import SplitText from "gsap/dist/SplitText";
import Image from "next/image";
import { use, useContext, useEffect, useRef } from "react";
import { isMobileContext } from "../../contexts/isMobileContext";

gsap.registerPlugin(SplitText);
const Magnitizer = ({
	children,
	text,
	icon,
	alt,
	customClass,
	dataDest,
	splitType,
}) => {
	const {isMobile} = useContext(isMobileContext);
	const mg = useRef(null);
	let q = gsap.utils.selector(mg);
	let tl = useRef();
	let split1, split2, staggerVal, alphaVal;

	const handleMagnetizing = () => {
		document.addEventListener(
			"mousemove",
			function (e) {
				magnetize(mg.current, e);
			},
			{ passive: true }
		);

		const magnetize = (el, e) => {
			let getx = e.pageX,
				getY = e.pageY - window.pageYOffset;

			const item = el;
			const customDist = item?.dataset.dist * 20 || 120;
			const centerX =
				item?.getBoundingClientRect().left +
				item?.getBoundingClientRect().width / 2;
			const centerY =
				item?.getBoundingClientRect().top +
				item?.getBoundingClientRect().height / 2;

			let deltaX = Math.floor(centerX - getx) * -0.6;
			let deltaY = Math.floor(centerY - getY) * -0.6;
			let distance = calculateDistance(item, getx, getY);

			if (customDist == 0) {
				deltaX = 0;
				deltaY = 0;
			}

			if (distance < customDist) {
				// if (isPageReady) {
				gsap.to(item, {
					y: deltaY,
					x: deltaX,
					duration: 0.5,
					ease: "none",
				});
				// }
			} else {
				gsap.to(item, { y: 0, x: 0, duration: 0.5, ease: "none" });
			}
		};

		const calculateDistance = (elem, mouseX, mouseY) => {
			return Math.floor(
				Math.sqrt(
					Math.pow(
						mouseX -
							(elem?.getBoundingClientRect().left +
								elem?.getBoundingClientRect().width / 2),
						2
					) +
						Math.pow(
							mouseY -
								(elem?.getBoundingClientRect().top +
									elem?.getBoundingClientRect().height / 2),
							2
						)
				)
			);
		};
	};

	function interactionY() {
		tl.current = gsap.timeline({ paused: true });
		if (splitType == "chars") {
			split1 = SplitText.create(q("._element"), {
				type: "chars",
				charsClass: "",
			});
			split2 = split1.chars;
			staggerVal = 0.035;
			alphaVal = 0;
		} else {
			split1 = SplitText.create(q("._element"), {
				type: "words",
				charsClass: "SplitClass",
			});
			split2 = split1.words;
			staggerVal = 0.05;
			alphaVal = 0;
		}

		tl.current
			.to(split2, {
				y: "-100%",
				autoAlpha: alphaVal,
				ease: "power3.in",
				stagger: 0.05,
				duration: 0.4,
			})
			.set(split2, { y: "100%" })
			.to(split2, {
				y: "0%",
				autoAlpha: 1,
				ease: "power3.out",
				stagger: 0.05,
				duration: 0.6,
			});

		// let ele2 = element.querySelector('._ele')
		// if(ele2 && ele2.length != 0) {
		// 	tl.to(ele2, 0.3, { y: '-30%', autoAlpha: 0, ease: 'power3.in' }, 0)
		// 	.set(ele2, { y: '30%' })
		// 	.to(ele2, 0.6, { y: '0%', autoAlpha: 1, ease: 'power3.out' })
		// }

		mg.current.addEventListener("mouseenter", function () {
			if (!tl.current.isActive()) {
				tl.current.restart();
			}
		});
	}


	useEffect(() => {
		{!isMobile && 
			handleMagnetizing();
			interactionY();
		}
	}, []);

	return (
		<div
			ref={mg}
			className={`_pointer switch f a-c j-c _y ${customClass}`}
			data-dist={dataDest ?? 3}
		>
			{text && <span className="_element words text">{text}</span>}
			{children}
		</div>
	);
};

export default Magnitizer;
