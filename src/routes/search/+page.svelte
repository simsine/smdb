<script lang="ts">
	import Fa from "svelte-fa"
	import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons"

	import MovieShortContainer from "$lib/components/movieShortContainer.svelte"

	import { page } from "$app/stores"
	import { goto } from "$app/navigation"

	function paginate(sign: number) {
		const currentPage = parseInt(searchParameters.searchPage)
		const totalPages = Math.ceil(searchQueryResult.totalResults / 10)
		let newURL = new URL($page.url)
		if (sign == 1 && currentPage >= totalPages) {
			newURL.searchParams.set("p", "1")
		} else if (sign == -1 && currentPage <= 1) {
			newURL.searchParams.set("p", totalPages.toString())
		} else {
			newURL.searchParams.set("p", (parseInt($page.url.searchParams.get("p") || "") + sign).toString())
		}
		return goto(newURL)
	}

	import type { SearchQueryResult, SearchQueryResultSearch } from "$lib/types"

	export let data
	$: searchParameters = data.searchParameters
	let searchQueryResult: SearchQueryResult
	$: searchQueryResult = data.searchQueryResult
	let search: SearchQueryResultSearch
	$: search = searchQueryResult.Search

	$: totalPages = Math.ceil(searchQueryResult.totalResults / 10)
</script>

{#if searchQueryResult.Response == "True"}
	<h2><b>Search</b> "{searchParameters.searchQuery}"</h2>
	<p>{searchQueryResult.totalResults} results found</p>
	<div class="paginationcontainer">
		<button
			on:click|preventDefault={() => {
				paginate(-1)
			}}><Fa icon={faArrowLeftLong} /></button
		>
		<span>{searchParameters.searchPage} / {totalPages}</span>
		<button
			on:click|preventDefault={() => {
				paginate(+1)
			}}><Fa icon={faArrowRightLong} /></button
		>
	</div>
	<hr />
	<section>
		{#each search as movie}
			<MovieShortContainer {movie} />
		{/each}
	</section>
	<hr />
{:else}
	<i>{searchQueryResult.Error}</i>
{/if}

<style>
	.paginationcontainer {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
	}
	.paginationcontainer button {
		padding: 0.2em 0.75em 0.2em 0.75em;
	}

	/*! Temp  */
	section {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1em;
		row-gap: 1em;

		/* aspect-ratio: 3/4; */
	}
</style>
