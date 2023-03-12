import type { PageServerLoad } from './$types';
import { SECRET_APIKEY, SECRET_APIBASEURL } from '$env/static/private';

export const load = (async ({ fetch, params}) => {
    let imdbID = params.imdbID
    
    let response = await fetch(`${SECRET_APIBASEURL}?apikey=${SECRET_APIKEY}&i=${imdbID}`);
    let movieFull = await response.json()

    // console.log(movieFull)

    return {imdbID, movieFull};
}) satisfies PageServerLoad;