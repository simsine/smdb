import { fail, redirect } from "@sveltejs/kit"
import { verify } from "@node-rs/argon2"
import { lucia } from "$lib/auth"
import pc from "$lib/prisma"

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData()
		const username = data.get("username")
		const password = data.get("password")
		const origin = data.get("origin") as string

		if (typeof username !== "string" || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
			return fail(400, { message: "Invalid username" })
		}

		if (typeof password !== "string" || password.length < 5 || password.length > 255) {
			return fail(400, { message: "Invalid password" });
		}
		const existingUser = await pc.user.findFirst({
			where: {
				username: username
			}
		})
		if (!existingUser) return fail(400, { message: "Incorrect username or password" })
		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) return fail(400, { message: "Incorrect username or password" })

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, origin??"/")
	}
}