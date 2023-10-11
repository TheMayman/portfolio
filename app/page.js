import getQueryClient from "@/utils/getQueryClient"
import { Hydrate, dehydrate } from "@tanstack/react-query"

import NavMenu from "@/components/common/NavMenu"
import Navbar from "@/components/common/Navbar"
import Introduction from "@/components/Introduction"

async function getUser() {
	const res = await fetch(
		"https://cms.xplor.beyond-creation.net/api/form?populate=deep"
	)
	const users = await res.json()
	return users
}
export default async function Home() {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery(["user"], getUser)
	const dehydratedState = dehydrate(queryClient)

	return (
		<Hydrate state={dehydratedState}>
			<NavMenu />
			<Introduction />
		</Hydrate>
	)
}
