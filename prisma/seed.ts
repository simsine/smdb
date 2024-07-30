import { generateIdFromEntropySize } from "lucia"
import { hash } from "@node-rs/argon2"
import { PrismaClient } from "@prisma/client"
const pc = new PrismaClient()

async function main() {
	//* We use the prisma orm upsert method to seed the database with entries

	await pc.user.upsert({
		where: { username: "admin" },
		update: {},
		create: {
			id: generateIdFromEntropySize(10),
			username: "admin",
			passwordHash: await hash("admin123", {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			}),
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

	await pc.user.upsert({
		where: { username: "bjarne" },
		update: {},
		create: {
			id: generateIdFromEntropySize(10),
			username: "bjarne",
			passwordHash: await hash("bjarne123", {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			}),
			reviews: {
				create: {
					imdbID: "tt1475582",
					title: "Masterpiece",
					content: "Yeah is aight",
					rating: 5,
				},
			},
			UserTitleStatuses: {
				create: {
					imdbID: "tt1475582",
					watchStatus: "PLAN_TO_WATCH",
					currentEpisode: 12,
					currentSeason: 2,
				},
			},
		},
	})

	await pc.news.upsert({
		where: { id: 1 },
		update: {},
		create: {
			title: "Developers, developers, developers...",
			markdown:
				"Hi, this is a post that has been seeded to the development database,\
				if you see this then you have most likely done something right!",
		},
	})
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
