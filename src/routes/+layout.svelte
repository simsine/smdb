<script lang="ts">
	import Navbar from "$lib/components/navbar.svelte"
	import { page } from "$app/stores"

	export let data
	
	let username = data.user?.username

	$: url = $page.url.href
</script>

<svelte:head>
	<title>{$page.data.pageTitle ? $page.data.pageTitle + " | sMDB" : "sMDB"}</title>
</svelte:head>

<div>
	<Navbar {username} {url}/>
	<slot />
</div>

<style>
	div {
		margin: 1rem 6rem 1rem 6rem;
		display: flex;	
		flex-direction: column;
		gap: 15px;
		min-height: max-content;
	}
	@media screen and (max-width: 750px) {
		div {
			margin: 1rem;
		}
	}
</style>
