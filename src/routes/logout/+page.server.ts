import { lucia } from "$lib/server/auth.js";
import { redirect, fail } from "@sveltejs/kit"

export const load = async () => {
 	// we only use this endpoint for the api
 	// and don't need to see the page
	redirect(302, "/");
}

export const actions = {
	default: async ({locals, cookies}) => {
		if (!locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, "/login");
	}
}
