<script lang="ts">
	import {onMount} from "svelte"
	
	let { form } = $props();

	let origin = $state<string>()
    onMount(() => {
        const url = new URL(window.location.href)
        origin = url.searchParams.get("origin") ?? "/"
    })
</script>

<main>
	<h1><u>Login</u> / <a href="/register">Register</a></h1>
	
	<form action="?/login" method="POST" class="vertical-flex">
		<div>
			<label for="username">
				<h4>Username</h4>
				<input id="username" name="username" type="text" required />
			</label>
		</div>
	
		<div>
			<label for="password">
				<h4>Password</h4>
				<input id="password" name="password" type="password" required />
			</label>
		</div>
		
		<input type="hidden" name="origin" value={origin}>

		{#if form?.message}
		<p class="error">{form.message}</p>
		{/if}
		
		<button type="submit" class="btn"><span>Log In</span></button>
	</form>
</main>

<style>
	.error {
		color: crimson;
	}
	input {
		padding: .5rem;
		width: 100%;
	}
	@media screen and (min-width: 450px) {
		main {
			max-width: fit-content;
		}
	}
</style>
