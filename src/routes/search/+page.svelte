<script lang="ts">
    import MovieShortContainer from "$lib/components/movieShortContainer.svelte";

	import type { SearchQueryResult, SearchQueryResultSearch } from "$lib/types"

    export let data
    let searchQueryResult:SearchQueryResult
    $: searchQueryResult = data.searchQueryResult
    let search:SearchQueryResultSearch
    $: search = searchQueryResult.Search
</script>

{#if searchQueryResult.Response == "True"}
    <h2><b>Search</b> "{data.searchQuery}"</h2>
    <p>Total results found: {searchQueryResult.totalResults}</p>
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