<script lang="ts">
	import type { SearchQueryResult, SearchQueryResultSearch } from "$lib/types"

    export let data

    let searchQueryResult:SearchQueryResult
    $: searchQueryResult = data.searchQueryResult
    let search:SearchQueryResultSearch
    $: search = searchQueryResult.Search
</script>

{#if searchQueryResult.Response == "True"}
    <p><b>Search</b> "{data.searchQuery}"</p>
    <p>Total results found: {searchQueryResult.totalResults}</p>
    <section>
        <hr>
        {#each search as movie}
                <!--TODO Make component-->
            <div>
                <p><b>{movie.Title}</b></p>
                <p>{movie.Type} | {movie.Year}</p>
                <a href=/title/{movie.imdbID}>
                    <img src={movie.Poster} alt="">
                </a>
                <hr>
            </div>
        {/each}
    </section>
{:else}
    <i>{searchQueryResult.Error}</i>
{/if}
    