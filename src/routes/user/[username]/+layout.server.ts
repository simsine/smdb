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

    let titleCount = await pc.userTitleStatus.count({
        where: {
            user: {
                username: user.username
            }
        }
    })
    let reviewCount = await pc.review.count({
        where: {
            author: {
                username: user.username
            }
        }
    })

    return { user, titleCount, reviewCount }
};