<script lang="ts">
	import SvelteMarkdown from "svelte-markdown"

	import type { PageData } from "./$types"
	export let newspost: PageData

	let date = new Date(newspost.date)
</script>

<article>
	<h2>{newspost.title}</h2>
	<SvelteMarkdown source={newspost.markdown} />
	<section>
		<i>{date.getDate()}.{date.getMonth()}.{date.getFullYear()}</i>
	</section>
</article>

<style>
	article {
		margin: 3rem 0;
		padding: 3rem 1.5rem;
		background-color: rgb(43, 45, 61);
		box-shadow: var(--box-shadow);
		border-radius: 0.25rem;
	}
	section {
		text-align: end;
	}
</style>
