import { getFullStatuses, getOMDBTitle } from '$lib/server/helpers';
import db from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    let user = await db.user.findUnique({
        where: {
            username: params.username,
        }
    })
    if (!user) {
        error(404, { message: "User not found" });
    }

    let userTitleStatuses = await db.userTitleStatus.findMany({
        where: {
            userId: user.id
        },
    })

    const fullStatuses = getFullStatuses(userTitleStatuses)

    return { 
        pageTitle: user.username + "'s watchlist",
        fulLStatuses: await fullStatuses
    };
})
