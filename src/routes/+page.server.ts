import db from "$lib/server/db"

export const load = (async () => {
	let news = await db.news.findMany({
		where: {
			isPublished: true,
		},
		orderBy: {
			date: "desc",
		},
	})
	return { news }
})
