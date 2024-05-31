import { PrismaClient } from "@prisma/client"
const pc: PrismaClient = new PrismaClient()
import crypto from "node:crypto"
import bcrypt from "bcrypt"

async function main() {
	//* We use the prisma orm upsert method to seed the database with entries

	const admin = await pc.user.upsert({
		where: { username: "admin" },
		update: {},
		create: {
			username: "admin",
			passwordHash: await bcrypt.hash("admin", 10),
			userAuthToken: crypto.randomUUID(),
			isAdmin: true,
			reviews: {
				create: {
					imdbID: "tt8524868",
					title: "Mmmmyess",
					content: "now this is for me",
					rating: 10,
				},
			},
		},
	})

	const bjarne = await pc.user.upsert({
		where: { username: "bjarne" },
		update: {},
		create: {
			username: "bjarne",
			passwordHash: await bcrypt.hash("bjarne_er_best_123", 10),
			userAuthToken: crypto.randomUUID(),
			reviews: {
				create: {
					imdbID: "tt1475582",
					title: "Masterpiece",
					content: "Yeah is aight",
					rating: 5,
				},
			},
		},
	})

	const newspost = await pc.news.upsert({
		where: { id: 1 },
		update: {},
		create: {
			title: "Developers, developers, developers...",
			markdown:
				"Hi, this is a post that has been seeded to the development database,\
				if you see this then you have most likely done something right!",
		},
	})
	console.info("Database seeded with the following rows:")
	console.info(admin, bjarne, newspost)
}
main()
	.then(async () => {
		await pc.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await pc.$disconnect()
		process.exit(1)
	})
