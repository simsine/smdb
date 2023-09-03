<script lang="ts">
	import type { PageData } from "./$types"

	export let data: PageData
</script>

<h1>Hello {data.user.username}!</h1>
<p>Joined at: {data.user.createdAt}</p>

<style>
	section {
		display: flex;
		gap: 15px;
	}
</style>
