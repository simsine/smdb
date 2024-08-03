<script lang="ts">
	export let form
</script>

<main>
	<h1><a href="/login">Login</a> / <u>Register</u></h1>
	
	<form action="?/register" method="POST" class="vertical-flex">
		<div>
			<label for="username">
				<h4>Username</h4>
				<input id="username" name="username" type="text" required minlength="3" maxlength="31" placeholder="Joe" title="Username should be 3-31 characters long">
			</label>
		</div>
	
		<div>
			<label for="password">
				<h4>Password</h4>
				<input id="password" name="password" type="password" required minlength="5" maxlength="255" placeholder="******" title="Password should be 5-255 characters long">
			</label>
		</div>
	
		{#if form?.message}
			<p class="error">{form.message}</p>
		{/if}
	
		<button type="submit" class="btn"><span>Register account</span></button>
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
