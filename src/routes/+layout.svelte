<script lang="ts">
	import Navbar from "$lib/components/navbar.svelte"
	import { page } from "$app/stores"

	const username = $page.data.user.name
</script>

{#if $page.data.user.name}
	<Navbar {username} />
{/if}

<main>
	<slot />
</main>

<style>
	main {
		margin: 15px 100px 15px 100px;
	}
</style>
