<script lang="ts">
	export let form
</script>

<h1>Login</h1>

<form action="?/login" method="POST">
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

	
	{#if form?.message}
	<p class="error">{form.message}</p>
	{/if}
	
	<button type="submit" class="watchlistbutton"><span>Log In</span></button>
</form>
<a href="/register">register</a>

<style>
	.error {
		color: crimson;
	}
</style>
