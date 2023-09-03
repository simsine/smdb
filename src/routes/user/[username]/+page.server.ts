import type { PageServerLoad } from "./$types"
import pc from "$lib/prisma"
import { error } from "@sveltejs/kit"

export const load = (async ({ fetch, params }) => {
	let user = await pc.user.findUnique({
		where: {
			username: params.username,
		},
	})

	if (user == null) {
		throw error(404, { message: "User not found" })
	}

	return { user }
}) satisfies PageServerLoad
