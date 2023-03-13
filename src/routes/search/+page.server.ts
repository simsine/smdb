import type { PageServerLoad } from './$types';
import { SECRET_APIKEY, SECRET_APIBASEURL } from '$env/static/private';

export const load = (async ({ fetch, url }) => {
    let searchFilter = url.searchParams.get("f")
    let searchQuery = url.searchParams.get("s")
    let searchPage = url.searchParams.get("p") || 1

    let response = await fetch(`${SECRET_APIBASEURL}?apikey=${SECRET_APIKEY}&s=${searchQuery}&type=${searchFilter}&page=${searchPage}`);
    let searchQueryResult = await response.json()

    // console.log(searchQueryResult)

    return {searchParameters:{searchFilter, searchQuery, searchPage}, searchQueryResult}
}) satisfies PageServerLoad;