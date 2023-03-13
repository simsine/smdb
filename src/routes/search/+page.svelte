<script lang="ts">
    import MovieShortContainer from "$lib/components/movieShortContainer.svelte";

    import { page } from "$app/stores";
    import { paginate } from "./pagination"

	import type { SearchQueryResult, SearchQueryResultSearch } from "$lib/types"

    export let data
    $: searchParameters = data.searchParameters
    let searchQueryResult:SearchQueryResult
    $: searchQueryResult = data.searchQueryResult
    let search:SearchQueryResultSearch
    $: search = searchQueryResult.Search
</script>

{#if searchQueryResult.Response == "True"}
    <h2><b>Search</b> "{searchParameters.searchQuery}"</h2>
    <p>Total results found: {searchQueryResult.totalResults}</p>
    <button on:click={()=>{paginate(-1, $page.url)}}>&lt;--</button>
    <span>{searchParameters.searchPage} / {Math.floor(searchQueryResult.totalResults/10)}</span>
    <button on:click={()=>{paginate(1, $page.url)}}>--&gt;</button>
    <hr>
    <section>
        {#each search as movie}
            <MovieShortContainer {movie} />
        {/each}
    </section>
    <hr>
{:else}
    <i>{searchQueryResult.Error}</i>
{/if}
    
<style>
    /*! Temp  */
    section{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1em;
        row-gap: 1em;

        /* aspect-ratio: 3/4; */
    }
</style>