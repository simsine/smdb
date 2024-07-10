import { Lucia } from "lucia"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import pc from "$lib/prisma"
import { dev } from "$app/environment"

const adapter = new PrismaAdapter(pc.session, pc.user)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            // set to `true` when using HTTPS
            secure: !dev
        }
    }    ,
    getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			id: attributes.id,
			username: attributes.username
		};
	}
})

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia; 
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
    id: string;
}