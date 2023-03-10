<script lang="ts">
    import {page} from "$app/stores"

    // interface SearchQueryResult{
    //     Search:Array<Object>;
    //     totalResults:Number;
    //     Response:String;
    //     Error?:String;
    // }  
    // interface Movie {
    //     Title: String;
    //     Year: String;
    //     imdbID: String;
    //     Type: String;
    //     Poster: String;
    // }
    // interface SearchQueryResultSearch extends Array<Movie>{
    //     [index:number]:{
    //         Title: String;
    //         Year: String;
    //         imdbID: String;
    //         Type: String;
    //         Poster: String;
    //     };
    // }

    let searchQueryResult = $page.data.searchQueryResult
    let search = searchQueryResult.Search

</script>

{#if searchQueryResult.Response == "True"}
    <p><b>Search</b> "{$page.data.searchQuery}"</p>
    <p>Total results found: {searchQueryResult.totalResults}</p>
    <section>
        <hr>
        {#each search as movie}
            <div>
                <p><b>{movie.Title}</b></p>
                <p>{movie.Type} | {movie.Year}</p>
                <img src="{movie.Poster}" alt="">
                <hr>
            </div>
        {/each}
    </section>
{:else}
    <p>{searchQueryResult.Error}</p>
{/if}
    