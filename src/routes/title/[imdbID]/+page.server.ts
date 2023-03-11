import { SECRET_APIBASEURL, SECRET_APIKEY } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {
    let imdbID = params.imdbID
    
    let response = await fetch(`${SECRET_APIBASEURL}?apikey=${SECRET_APIKEY}&i=${imdbID}`);
    let searchQueryResult = await response.json()

    return {imdbID, searchQueryResult};
}) satisfies PageServerLoad;