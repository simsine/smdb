<script lang="ts">
	import Navbar from "$lib/components/navbar.svelte"

	import "../app.css"
	export let data
</script>


<div>
	<Navbar username={data.user?.username}/>
	<slot />
</div>

<style>
	div {
		margin: 15px 100px 15px 100px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	@media screen and (max-width: 750px) {
		div {
			margin: 15px;
		}
	}
</style>
