import { error, redirect } from "@sveltejs/kit"
import { WatchStatus } from "@prisma/client"
import { getOMDBTitle } from "$lib/server/helpers"
import db from "$lib/server/db"

export const load = async ({params, locals }) => {
	let imdbID = params.imdbID

	let movie = await getOMDBTitle(imdbID)

	if (movie.Response !== "True") {
		error(404, { message: (movie.Error ??= "Movie with id " + imdbID + " not found") });
	}

	let reviews = await db.review.findMany({
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

	let isLoggedIn
	let userReview
	let userTitleStatus
	if (isLoggedIn = locals.user != null) {
		userReview = await db.review.findFirst({
			where: {
				imdbID: movie.imdbID,
				authorId: locals.user.id,
			},
			select: {
				title:true,
				content:true,
				rating:true
			}
		})
		userTitleStatus = await db.userTitleStatus.findFirst({
			where: {
				imdbID: movie.imdbID,
				userId: locals.user.id,
			},
			select:{
				watchStatus:true,
				currentSeason:true,
				currentEpisode:true
			}
		})
	}

	let pageTitle = movie.Title

	return { movie, reviews, userReview, userTitleStatus, isLoggedIn, pageTitle }
}

export const actions = {
	upsertWatchStatus: async (event) => {
		if (!event.locals.user) redirect(302, "/login");

		const data = await event.request.formData()

		let watchStatus = data.get("watchStatus") as WatchStatus
		if (!Object.values(WatchStatus).includes(watchStatus)) error(400, { message: "Watch status is invalid" });

		let currentSeason = parseInt(data.get("currentSeason") as string)
		if (isNaN(currentSeason)) error(400, { message: "currentSeason is not a valid number" });

		let currentEpisode = parseInt(data.get("currentEpisode") as string)
		if (isNaN(currentEpisode)) error(400, { message: "currentEpisode is not a valid number" });

		const userTitleStatus = await db.userTitleStatus.upsert({
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
				updatedAt: new Date()
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
		if (!event.locals.user) error(404, { message: "User not logged in" });

		const data = await event.request.formData()

		const title = data.get("title") as string | null
		if (title == null) return { error: "Title is empty" }

		const content = data.get("content") as string | null

		const rating = parseInt(data.get("rating") as string)
		if (isNaN(rating)) error(404, { message: "Review must include rating" });
		if (rating < 1 || rating > 10) error(404, { message: "Rating must be between 1-10" });

		await db.review.upsert({
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
		if (!event.locals.user) error(404, { message: "User not logged in" });
		await db.review.delete({
			where: {
				authorId_imdbID: {
					imdbID: event.params.imdbID,
					authorId: event.locals.user.id,
				},
			},
		})
	},
}
