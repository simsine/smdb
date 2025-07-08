import { json } from '@sveltejs/kit'
import { getOMDBTitle } from '$lib/helpers/backend.js'

export async function GET({ params }) {
    return json(await getOMDBTitle(params.imdbID))
}