import type { PageServerLoad } from "./$types"
import { SECRET_APIKEY } from "$env/static/private"
import type { MovieFull } from "$lib/types"
import { WatchStatus } from "@prisma/client"
import { error, redirect } from "@sveltejs/kit"
import pc from "$lib/prisma"

export const load = (async ({ fetch, params, locals }) => {
	let imdbID = params.imdbID

	let response = await fetch(`https://www.omdbapi.com/?apikey=${SECRET_APIKEY}&i=${imdbID}`)
	let movie: MovieFull = await response.json()

	if (movie.Response !== "True") {
		throw error(404, { message: (movie.Error ??= "Movie with id " + imdbID + " not found") })
	}

	let reviews = await pc.review.findMany({
		where: {
			imdbID: movie.imdbID,
		},
		include: {
			author: {
				select: {
					username: true,
				},
			},
		},
	})

	let isLoggedIn = locals.user != null
	let userReview
	let userTitleStatus
	if (isLoggedIn) {
		userReview = await pc.review.findFirst({
			where: {
				imdbID: movie.imdbID,
				authorId: locals.user.id,
			},
		})
		userTitleStatus = await pc.userTitleStatus.findFirst({
			where: {
				imdbID: movie.imdbID,
				userId: locals.user.id,
			},
		})
	}

	return { movie, reviews, userReview, userTitleStatus, isLoggedIn }
}) satisfies PageServerLoad

export const actions = {
	upsertWatchStatus: async (event) => {
		if (!event.locals.user) throw redirect(302, "/login")

		const data = await event.request.formData()

		let watchStatus = data.get("watchStatus") as WatchStatus
		if (!Object.values(WatchStatus).includes(watchStatus)) throw error(400, { message: "Watch status is invalid" })

		let currentSeason = parseInt(data.get("currentSeason") as string)
		if (isNaN(currentSeason)) throw error(400, { message: "currentSeason is not a valid number" })

		let currentEpisode = parseInt(data.get("currentEpisode") as string)
		if (isNaN(currentEpisode)) throw error(400, { message: "currentEpisode is not a valid number" })

		const userTitleStatus = await pc.userTitleStatus.upsert({
			where: {
				userId_imdbID: {
					userId: event.locals.user.id,
					imdbID: event.params.imdbID,
				},
			},
			update: {
				watchStatus: watchStatus,
				currentSeason: currentSeason,
				currentEpisode: currentEpisode,
			},
			create: {
				userId: event.locals.user.id,
				imdbID: event.params.imdbID,
				watchStatus: watchStatus,
			},
		})
		return userTitleStatus
	},
	upsertReview: async (event) => {
		if (!event.locals.user) throw error(404, { message: "User not logged in" })

		const data = await event.request.formData()

		const title = data.get("title") as string | null
		if (title == null) return { error: "Title is empty" }

		const content = data.get("content") as string | null

		const rating = parseInt(data.get("rating") as string)
		if (isNaN(rating)) throw error(404, { message: "Review must include rating" })
		if (rating < 1 || rating > 10) throw error(404, { message: "Rating must be between 1-10" })

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
		if (!event.locals.user) throw error(404, { message: "User not logged in" })
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
