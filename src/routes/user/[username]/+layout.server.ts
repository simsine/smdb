import pc from "$lib/prisma"
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
    let user = await pc.user.findUnique({
        where: {
            username: params.username
        },
        select: {
            username:true,
            createdAt:true
        }
    })

    if (user == null) {
		error(404, { message: "User not found" });
	}

    return { user }
};