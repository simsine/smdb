import { getOMDBTitle } from '$lib/helpers/index.js';
import pc from '$lib/prisma.js';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    let user = await pc.user.findUnique({
        where: {
            username: params.username,
        }
    })
    if (!user) {
        error(404, { message: "User not found" });
    }

    let userTitleStatuses = await pc.userTitleStatus.findMany({
        where: {
            userId: user.id
        },
    })
    let omdbTitlesArr = await Promise.all(userTitleStatuses.map(element => {
        return getOMDBTitle(element.imdbID)
    }))
    let omdbTitles = new Map(
        omdbTitlesArr.map(title => {
            return [title.imdbID, title]
        })
    )
    return { userTitleStatuses, omdbTitles, pageTitle: user.username + "'s watchlist" };
})