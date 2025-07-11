import db from "$lib/server/db"
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
    let user = await db.user.findUnique({
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

    let titleCount = await db.userTitleStatus.count({
        where: {
            user: {
                username: user.username
            }
        }
    })
    let reviewCount = await db.review.count({
        where: {
            author: {
                username: user.username
            }
        }
    })

    return { user, titleCount, reviewCount }
};