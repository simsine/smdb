import type { PageServerLoad } from "./$types"
import { SECRET_APIKEY, SECRET_APIBASEURL } from "$env/static/private"
import type { MovieFull } from "$lib/types"
import { error } from "@sveltejs/kit"

export const load = (async ({ fetch, params }) => {
	let imdbID = params.imdbID

	let response = await fetch(`${SECRET_APIBASEURL}?apikey=${SECRET_APIKEY}&i=${imdbID}`)
	let movie: MovieFull = await response.json()

	if (movie.Response !== "True") {
		throw error(404, { message: (movie.Error ??= "Movie with id " + imdbID + " not found") })
	}

	return { movie }
}) satisfies PageServerLoad
