import { fail, redirect } from "@sveltejs/kit"
import { hash } from "@node-rs/argon2"

import pc from "$lib/prisma"
import { generateIdFromEntropySize } from "lucia"
import { lucia } from "$lib/auth/index.js"

export const actions = {
	register: async ({ request, cookies }) => {
		const data = await request.formData()
		const username = data.get("username")
		const password = data.get("password")

		if (typeof username !== "string" || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
			return fail(400, { message: "Invalid username" })
		}

		if (await pc.user.findFirst({
			where: {
				username:username
			}
		})) return fail(400, { message: "Username taken"})

		if (typeof password !== "string" || password.length < 5 || password.length > 255) {
			return fail(400, { message: "Invalid password" });
		}

		const userId = generateIdFromEntropySize(10)
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});


		await pc.user.create({
			data: {
				id:userId,
				username:username,
				passwordHash:passwordHash
			}
		})

		const session = await lucia.createSession(userId, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		})

		redirect(302, "/");
	}
}