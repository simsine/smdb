import type { PageServerLoad } from "./$types"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const load = (async () => {
	let news = await prisma.news.findMany({
		where: {
			isPublished: true,
		},
	})
	console.log(news)
	return { news }
}) satisfies PageServerLoad
