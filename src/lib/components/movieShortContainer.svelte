<script lang="ts">
	import type { MovieShort } from "$lib/types"
	export let movie: MovieShort
</script>

<a href="/title/{movie.imdbID}">
	<article>
		<div class="imagewrapper"><img src={movie.Poster} alt=""></div>
		<hr>
		<div class="textwrapper">
			<b>{movie.Title}</b><br>
			<small>{movie.Type} | {movie.Year}</small>
		</div>
	</article>
</a>

<style>
	a  {
		color: unset;
	}
	article {
		background-color: var(--color-dark);
		border-radius: 1em;
		padding: 0.5em;
		border: 1px	;
		border-color: rgba(237, 242, 244, 0.25);
	}
	/*! Godlike card image wrapper !*/
	div.imagewrapper {
		display: flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		aspect-ratio: unset;

		border-radius: 1em;
	}
	div.imagewrapper img {
		object-fit: contain;
		max-width: 100%;
		max-height: 100%;

		border-radius: 1em;
	}
	div.textwrapper {
		padding: 1em;
	}
	@media screen and (min-width: 750px) {
		div.imagewrapper {
			aspect-ratio: 2/3;
		}
	}
</style>
