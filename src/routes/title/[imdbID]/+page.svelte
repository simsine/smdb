<script lang="ts">
    export let data

    let movie = data.searchQueryResult
</script>

{#if movie.Response === "True"}
        <!--TODO Make component-->
    <div>
        <p><b>{movie.Title}</b></p>
        <p>{movie.Type} | {movie.Year}</p>
        <img src={movie.Poster} alt="">
    </div>
{:else}
    <i>{movie.Error}</i>
{/if}
