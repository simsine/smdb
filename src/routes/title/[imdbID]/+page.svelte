<script lang="ts">
	import MovieFullContainer from "$lib/components/movieFullContainer.svelte"

	export let data
	let movie = data.movie
</script>

<MovieFullContainer {movie} />
