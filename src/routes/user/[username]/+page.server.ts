import { error } from "@sveltejs/kit"
import pc from "$lib/prisma"
import { getOMDBTitle } from "$lib/helpers/index.js";

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

	let omdbTitlesArr = await Promise.all(user.UserTitleStatuses.map(element=> element.imdbID).concat(user.reviews.map(element => element.imdbID)).map(element => {
        return getOMDBTitle(element)
    }))
    let omdbTitles = new Map(
        omdbTitlesArr.map(title => {
            return [title.imdbID, title]
        })
    )

	let isLoggedIn
	if (isLoggedIn = locals.user != null) {
		
	}
	let pageTitle = user.username + "'s Profile"

	return { user, isLoggedIn, pageTitle, omdbTitles }
})
