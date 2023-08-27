<script lang="ts">
	import Navbar from "$lib/components/navbar.svelte"
	export let data
	import { page } from "$app/stores"
	const username = $page.data.user.name
</script>

<Navbar {username} />

<main>
	<slot />
</main>

<style>
	main {
		margin: 15px 100px 15px 100px;
	}
</style>
