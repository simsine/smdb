import { SECRET_APIKEY } from "$env/static/private"

export const load = (async ({ fetch, url }) => {
	let searchFilter = url.searchParams.get("f")
	let searchQuery = url.searchParams.get("s")?.trim()
	let searchPage = url.searchParams.get("p") || "1"

	let response = await fetch(`https://www.omdbapi.com/?apikey=${SECRET_APIKEY}&s=${searchQuery}&type=${searchFilter}&page=${searchPage}`)
	let searchQueryResult = await response.json()

	return {
		searchParameters: { searchFilter, searchQuery, searchPage },
		searchQueryResult,
	}
})
