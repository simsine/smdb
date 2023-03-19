<script lang="ts">
	import type { MovieShort } from "$lib/types"
	export let movie: MovieShort
</script>

<article>
	<div class="imagewrapper"><a href="/title/{movie.imdbID}"><img src={movie.Poster} alt="" /></a></div>
	<p><b>{movie.Title}</b></p>
	<p>{movie.Type} | {movie.Year}</p>
</article>

<style>
	/*! Godlike card image wrapper !*/
	div.imagewrapper {
		display: flex;
		align-items: center;
		justify-content: center;

		outline: auto;

		width: 100%;
		aspect-ratio: 2/3;

		/* background-color: rgb(0, 0, 0); */
		border-radius: 1em;
	}
	div.imagewrapper img {
		object-fit: contain;
		max-width: 100%;
		max-height: 100%;

		border-radius: 1em;
	}
</style>
