import { SECRET_APIKEY } from "$env/static/private"
import pc from "$lib/prisma"
import type { MovieFull } from "$lib/types"

export async function getOMDBTitle(imdbID:string):Promise<MovieFull> {
    const storedTitle = await pc.omdbTitle.findUnique({
        where: {
            imdbID:imdbID
        }
    })
    if (storedTitle && storedTitle.lastUpdated.getDate() == new Date().getDate() ) {
        return storedTitle.data as any
    } else {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${SECRET_APIKEY}&i=${imdbID}`, {
            headers: {
                "Cache-Control": "max-age=3600"
            }
        })
        const title = await response.json()
	    if (title.Response === "True") {
            await pc.omdbTitle.upsert({
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