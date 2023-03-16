import type { PageServerLoad} from './$types';
import { SECRET_APIKEY, SECRET_APIBASEURL } from '$env/static/private';

export const load = (async ({ fetch, url }) => {
    let searchFilter = url.searchParams.get("f")
    let searchQuery = url.searchParams.get("s")
    let searchPage = url.searchParams.get("p") || "1"

    let response = await fetch(`${SECRET_APIBASEURL}?apikey=${SECRET_APIKEY}&s=${searchQuery}&type=${searchFilter}&page=${searchPage}`);
    let searchQueryResult = await response.json()

    return {searchParameters:{searchFilter, searchQuery, searchPage}, searchQueryResult}
}) satisfies PageServerLoad;

// import type { Actions } from './$types';
// import { goto } from '$app/navigation';

// export const actions:Actions = {
//     default: async({ request, url })=>{
//         const formData = await request.formData()
//         const pagination = formData.get("pagination")
//         const totalpages = formData.get("totalpages")
//         console.log(pagination, totalpages)
        
//         const newPageURL = url

//         console.log(newPageURL)

//         // let newPageURL = new URL(url)
//         return goto(newPageURL)
//     }
// }