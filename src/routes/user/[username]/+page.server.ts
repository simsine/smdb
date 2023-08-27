import type { PageServerLoad } from "./$types"
import pc from "$lib/prisma"

export const load = (async ({ fetch, params }) => {
	let username = params.username

	let user = pc.user.findUnique({
		where: {
			username: username,
		},
	})

	return { user }
}) satisfies PageServerLoad
