<script lang="ts">
	import NewsPostCard from "$lib/components/newsPostCard.svelte"

	export let data
</script>

<h1>Welcome to <b>sMDB</b></h1>
<p>simsine Movie Database is a website that lets you search information about movies, series, games and more!</p>

<h1>Latest News</h1>
{#each data.news as newspost}
	<NewsPostCard {newspost} />
{/each}
