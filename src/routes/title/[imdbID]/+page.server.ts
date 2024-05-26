import type { PageServerLoad } from "./$types"
import { SECRET_APIKEY, SECRET_APIBASEURL } from "$env/static/private"
import type { MovieFull } from "$lib/types"
import { error } from "@sveltejs/kit"
import pc from "$lib/prisma"

export const load = (async ({ fetch, params, locals }) => {
	let imdbID = params.imdbID

	let response = await fetch(`${SECRET_APIBASEURL}?apikey=${SECRET_APIKEY}&i=${imdbID}`)
	let movie: MovieFull = await response.json()

	if (movie.Response !== "True") {
		throw error(404, { message: (movie.Error ??= "Movie with id " + imdbID + " not found") })
	}

	let reviews = await pc.review.findMany({
		where: {
			imdbID: movie.imdbID,
		},
		include: {
			author: true,
		},
	})

	let isLoggedIn = locals.user != null
	let userReview
	if (isLoggedIn) {
		userReview = await pc.review.findFirst({
			where: {
				imdbID: movie.imdbID,
				authorId: locals.user.id,
			},
			include: {
				author: true,
			},
		})
	}

	return { movie, reviews, userReview, isLoggedIn }
}) satisfies PageServerLoad

export const actions = {
	upsertReview: async (event) => {
		if (!event.locals.user) return { error: "User not logged in" }

		const data = await event.request.formData()

		const title = data.get("title") as string | null
		if (title == null) return { error: "Title is empty" }

		const content = data.get("content") as string | null

		const rating = parseInt(data.get("rating") as any)
		if (rating == null) return { error: "Review must include rating" }
		if (rating < 1 || rating > 10) return { error: "Rating must be between 1-5" }

		await pc.review.upsert({
			where: {
				authorId_imdbID: {
					authorId: event.locals.user.id,
					imdbID: event.params.imdbID,
				},
			},
			update: {
				title: title,
				content: content,
				rating: rating,
			},
			create: {
				imdbID: event.params.imdbID,
				authorId: event.locals.user.id,
				title: title,
				content: content,
				rating: rating,
			},
		})
	},
	deleteReview: async (event) => {
		if (!event.locals.user) return { error: "User not logged in" }
		await pc.review.delete({
			where: {
				authorId_imdbID: {
					imdbID: event.params.imdbID,
					authorId: event.locals.user.id,
				},
			},
		})
	},
}
