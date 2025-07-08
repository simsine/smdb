import { error } from "@sveltejs/kit"
import pc from "$lib/prisma"
import { getFullReviews, getFullStatuses, getOMDBTitle } from "$lib/helpers/index.js";

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
			},
			UserTitleStatuses: {
				take: 3,
				orderBy:{
					updatedAt:"desc"
				},
			}
		},
	})

	if (user == null) {
		error(404, { message: "User not found" });
	}

	const fullStatuses = getFullStatuses(user.UserTitleStatuses)

	const fullReviews = getFullReviews(user.reviews)

	let isLoggedIn = locals.user != null

	let pageTitle = user.username + "'s Profile"

	return {
		user,
		isLoggedIn,
		pageTitle,
		fullStatuses: await fullStatuses,
		fullReviews: await fullReviews
	}
})
