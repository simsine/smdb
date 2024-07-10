<script lang="ts">
	export let form
</script>

<h1>Register</h1>

<form action="?/register" method="POST">
	<div>
		<label for="username">
			<h4>Username</h4>
			<input id="username" name="username" type="text" required minlength="3" maxlength="31" placeholder="Joe">
		</label>
	</div>

	<div>
		<label for="password">
			<h4>Password</h4>
			<input id="password" name="password" type="password" required minlength="5" maxlength="255" placeholder="******">
		</label>
	</div>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}

	<button type="submit" class="watchlistbutton"><span>Register</span></button>
</form>

<style>
	.error {
		color: crimson;
	}
</style>
