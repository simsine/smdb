import { getFullStatuses, getOMDBTitle } from '$lib/helpers/index.js';
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

    const fullStatuses = getFullStatuses(userTitleStatuses)

    return { 
        pageTitle: user.username + "'s watchlist",
        fulLStatuses: await fullStatuses
    };
})
