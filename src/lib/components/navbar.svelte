<script lang="ts">
	import Fa from "svelte-fa"
	import { faMagnifyingGlass, faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons"

	import { page } from "$app/stores"
	const username = $page.data.user?.name // Setting this to const because it becomes undefined if it is made reactive for some god forsaken reason

	import { enhance } from "$app/forms"
</script>

<nav>
	<a href="/" class="logo"><span>sMDB</span></a>
	<form action="/search" class="search-form">
		<select name="f" id="f" title="Filter">
			<option value="">All</option>
			<option value="movie">Movies</option>
			<option value="series">Series</option>
			<option value="game">Games</option>
			<option value="episode">Episodes</option>
		</select>
		<div class="searchformrightfield">
			<input placeholder="Search for movies, series, games and more..." type="text" name="s" id="s" />
			<button type="submit" value="Search" class="searchbutton" title="Search"><Fa icon={faMagnifyingGlass} size="lg" /></button>
		</div>
		<input type="hidden" name="p" value="1" />
	</form>
	{#if username}
		<a href="/user/{username}" title="Profile"><Fa icon={faUserCircle} size="2.5x" color="white" /></a>

		<!-- We need to send a form action to the logout api route -->
		<form action="/logout" method="POST" use:enhance>
			<button type="submit" title="Log out"><Fa icon={faSignOut} size="2.5x" color="white" /></button>
		</form>
	{:else}
		<a href="/login">Sign in</a>
	{/if}
</nav>

<style>
	nav {
		margin: 15px 100px 15px 100px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		gap: 15px;
	}

	@media screen and (max-width: 450px) {
	}
	@media screen and (min-width: 450px) and (max-width: 750px) {
	}
	@media screen and (min-width: 750px) {
	}

	.logo {
		letter-spacing: -1px;
		font-weight: 900;
		font-size: 2em;
		text-decoration: none;
		color: var(--color-light);
		background-color: var(--color-main);
		padding: 0 0.5em 0 0.5em;
		height: 50px;
		border-radius: 0.25rem;
	}
	form.search-form {
		height: 50px;
		width: 100%;
		display: flex;
		gap: 1px;
		border-radius: 0.25em;
	}
	form div.searchformrightfield {
		display: flex;
		width: 100%;
	}
	form button {
		appearance: none;
		border: unset;
		cursor: pointer;
		background-color: unset;
	}
	form.search-form button {
		padding: 0 1em 0 1em;
		background-color: white;
	}
	form.search-form select {
		cursor: pointer;
		border-top-left-radius: 0.25em;
		border-bottom-left-radius: 0.25em;
	}
	form.search-form button {
		border-top-right-radius: 0.25em;
		border-bottom-right-radius: 0.25em;
	}
	form.search-form select,
	form.search-form input {
		padding: 0.8em;
		font-size: 1em;
		border: none;
	}
	form.search-form input[type="text"] {
		width: 100%;
	}
</style>
