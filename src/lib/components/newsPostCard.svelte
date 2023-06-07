<script lang="ts">
	import SvelteMarkdown from "svelte-markdown"

	import type { PageData } from "./$types"
	export let newspost: PageData
</script>

<article>
	<h2>{newspost.title}</h2>
	<SvelteMarkdown source={newspost.markdown} />
	<p>{newspost.date}</p>
</article>

<style>
	article {
		outline: auto;
		margin: 3rem 0;
		padding: 3rem 1.5rem;
	}
</style>
