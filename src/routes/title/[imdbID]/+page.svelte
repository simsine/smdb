<script lang="ts">
	import MovieFullContainer from "$lib/components/movieFullContainer.svelte"
	import type { MovieFull } from "$lib/types"
	import type { PageData } from "./$types"

	export let data: PageData
	let movie: MovieFull = data.movieFull
	let imdbID = data.imdbID
</script>

{#if movie.Response === "True"}
	<MovieFullContainer {movie} />
{:else}
	<i>Error: {movie.Error}</i>
{/if}
