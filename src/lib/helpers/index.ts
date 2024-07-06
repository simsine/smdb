import { SECRET_APIKEY } from "$env/static/private"
import pc from "$lib/prisma"

export async function getOMDBTitle(imdbID:string) {
    const storedTitle = await pc.omdbTitle.findUnique({
        where: {
            imdbID:imdbID
        }
    })
    if (storedTitle && storedTitle.lastUpdated.getDate() == new Date().getDate() ) {
        return storedTitle.data
    } else {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${SECRET_APIKEY}&i=${imdbID}`)
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