import { json } from '@sveltejs/kit'
import { getOMDBTitle } from '$lib/server/helpers'

export async function GET({ params }) {
    return json(await getOMDBTitle(params.imdbID))
}