import { PrismaClient } from "@prisma/client"
const pc: PrismaClient = new PrismaClient()
import crypto from "node:crypto"
import bcrypt from "bcrypt"

async function main() {
	//* We use the prisma orm upsert method to seed the database with entries
	const bjarne = await pc.user.upsert({
		where: { username: "bjarne" },
		update: {},
		create: {
			username: "bjarne",
			passwordHash: await bcrypt.hash("bjarne_er_best_123", 10),
			userAuthToken: crypto.randomUUID(),
			profile: {
				create: {
					reviews: {
						create: {
							imdbID: "tt1475582",
							content: "Masterpiece",
							rating: 5,
						},
					},
				},
			},
		},
	})
	console.log(bjarne)
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
