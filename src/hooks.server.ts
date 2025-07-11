import { lucia } from "$lib/server/auth"

export const handle = async ({ event, resolve }) => {
	// get cookies from browser
	const sessionId = event.cookies.get(lucia.sessionCookieName)
	if (!sessionId) {
		event.locals.user = null
		event.locals.session = null
		return resolve(event)
	}

	const {session, user} = await lucia.validateSession(sessionId)
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id)
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		})
	}
	if (!session) {
		const sessionCookie =  lucia.createBlankSessionCookie()
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		})
	}
	event.locals.user = user
	event.locals.session = session
	return await resolve(event)
}
