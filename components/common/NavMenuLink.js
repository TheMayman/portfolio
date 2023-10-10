import gsap from "gsap"
import Link from "next/link"

const NavMenuLink = ({
	route,
	text,
	index,
	menuCardsRef,
	menuCardsAnimationRef,
}) => {
	const handleNavMenuLinkMouseEnter = () => {
		gsap.to(menuCardsAnimationRef.current, {
			duration: 0.5,
			y: menuCardsRef.current.offsetHeight * index * -1,
			ease: "power3.out",
		})
	}
	return (
		<Link
			href={`${route}`}
			onMouseEnter={() => {
				handleNavMenuLinkMouseEnter()
			}}
		>
			{text}
		</Link>
	)
}

export default NavMenuLink
