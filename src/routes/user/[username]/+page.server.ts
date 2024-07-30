import { error } from "@sveltejs/kit"
import pc from "$lib/prisma"

export const load = (async ({ params, locals }) => {
	let user = await pc.user.findUnique({
		where: {
			username: params.username,
		},
		select: {
			username:true,
			createdAt:true,
			reviews: {
				take: 3,
				orderBy:{
					createdAt:"desc"
				},
				select: {
					imdbID:true,
					createdAt:true,
					title:true,
					content:true,
					rating:true
				}
			},
			UserTitleStatuses: {
				take: 3,
				orderBy:{
					updatedAt:"desc"
				},
				select: {
					imdbID:true,
					watchStatus:true,
					currentSeason:true,
					currentEpisode:true,
					updatedAt:true
				}
			}
		},
	})

	if (user == null) {
		error(404, { message: "User not found" });
	}

	let isLoggedIn
	if (isLoggedIn = locals.user != null) {
		
	}
	let pageTitle = user.username + "'s Profile"

	return { user, isLoggedIn, pageTitle }
})
