import Link from "next/link"

const Navbar = () => {
	return (
		<div>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/about">About Us</Link>
				</li>
				<li>
					<Link href="/blog/hello-world">Blog Post</Link>
				</li>
			</ul>
		</div>
	)
}

export default Navbar
