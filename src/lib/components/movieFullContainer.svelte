<script lang="ts">
	import type { MovieFull } from "$lib/types"
    export let movie:MovieFull;
</script>

<div>
    <p><b>{movie.Title}</b></p>
    <p>{movie.Type} | {movie.Year}</p>
    <img src={movie.Poster} alt="">
</div>

<style>

</style>