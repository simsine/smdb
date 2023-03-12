<script lang="ts">
    import MovieFullContainer from '$lib/components/movieFullContainer.svelte';
	import type { MovieFull } from '$lib/types'

    export let data
    let movie:MovieFull = data.movieFull
    let imdbID = data.imdbID
</script>

{#if movie.Response === "True"}
    <MovieFullContainer {movie} />
{:else}
    <i>{movie.Error}</i>
{/if}