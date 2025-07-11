import { SECRET_APIKEY } from "$env/static/private"
import db from "$lib/server/db"
import type { MovieFull } from "$lib/types"
import type { Review, UserTitleStatus } from "@prisma/client"

export async function getOMDBTitle(imdbID:string):Promise<MovieFull> {
    const storedTitle = await db.omdbTitle.findUnique({
        where: {
            imdbID:imdbID
        }
    })
    if (storedTitle && storedTitle.lastUpdated.getDate() == new Date().getDate() ) {
        return storedTitle.data as any
    } else {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${SECRET_APIKEY}&plot=full&i=${imdbID}`, {
            headers: {
                "Cache-Control": "max-age=3600"
            }
        })
        const title = await response.json()
	    if (title.Response === "True") {
            await db.omdbTitle.upsert({
                where: {
                    imdbID:imdbID
                },
                create: {
                    imdbID:imdbID,
                    data:title,
                    lastUpdated:new Date()
                },
                update: {
                    data:title,
                    lastUpdated:new Date()
                }
            })
        }
        return title
    }
}

export function getFullStatuses(userTitleStatuses: Array<UserTitleStatus>) {
    return Promise.all(userTitleStatuses.map(async (status) => {
        const omdbTitle = await getOMDBTitle(status.imdbID);
        return { status, omdbTitle };
    }));
}

export function getFullReviews(reviews: Array<Review>) {
    return Promise.all(reviews.map(async (review) => {
        const omdbTitle = await getOMDBTitle(review.imdbID);
        return { review, omdbTitle };
    }));
}
