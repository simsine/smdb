import type { PageServerLoad } from "./$types"
import pc from "$lib/prisma"
import { error } from "@sveltejs/kit"

export const load = (async ({ params }) => {
	let user = await pc.user.findUnique({
		where: {
			username: params.username,
		},
		include: {
			reviews: { take: 10 },
		},
	})

	if (user == null) {
		error(404, { message: "User not found" });
	}

	return { user }
}) satisfies PageServerLoad
