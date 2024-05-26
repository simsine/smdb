<script lang="ts">
	import type { PageData } from "./$types"

	export let data: PageData
</script>

<h1>Hello {data.user.username}!</h1>
<p>Joined at: {data.user.createdAt}</p>

<h1>Reviews</h1>
{#each data.user.reviews as review}
	<h3><b>{review.imdbID}</b> | {review.rating}/10</h3>
	<p>{review.content}</p>
{/each}

<style>
</style>
