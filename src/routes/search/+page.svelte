<script lang="ts">
    interface SearchQueryResult{
        Search:Array<Object>;
        totalResults:Number;
        Response:String;
        Error?:String;
    }  
    interface Movie {
        Title: String;
        Year: String;
        imdbID: String;
        Type: String;
        Poster: String;
    }
    interface SearchQueryResultSearch extends Array<Movie>{
        [index:number]:{
            Title: String;
            Year: String;
            imdbID: String;
            Type: String;
            Poster: string;
        };
    }

    export let data

    $: searchQueryResult = data.searchQueryResult
    $: search = searchQueryResult.Search

</script>

{#if searchQueryResult.Response == "True"}
    <p><b>Search</b> "{data.searchQuery}"</p>
    <p>Total results found: {searchQueryResult.totalResults}</p>
    <section>
        <hr>
        {#each search as movie}
            <div>
                <p><b>{movie.Title}</b></p>
                <p>{movie.Type} | {movie.Year}</p>
                <img src={movie.Poster} alt="">
                <hr>
            </div>
        {/each}
    </section>
{:else}
    <p>{searchQueryResult.Error}</p>
{/if}
    