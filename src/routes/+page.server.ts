import pc from "$lib/prisma"

export const load = (async () => {
	let news = await pc.news.findMany({
		where: {
			isPublished: true,
		},
		orderBy: {
			date: "desc",
		},
	})
	return { news }
})
