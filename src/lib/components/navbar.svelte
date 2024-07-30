<script lang="ts">
	import Fa from "svelte-fa"
	import { faMagnifyingGlass, faUserCircle, faSignOut, faSignIn, faXmark } from "@fortawesome/free-solid-svg-icons"

	export let username
	let showMobileSearch = false
</script>

<nav>
	{#if showMobileSearch}
		<form action="/search" class="search-form">
			<select name="f" id="f" title="Filter">
				<option value="">All</option>
				<option value="movie">Movies</option>
				<option value="series">Series</option>
				<option value="game">Games</option>
				<option value="episode">Episodes</option>
			</select>
			<div class="searchformrightfield mobile">
				<input placeholder="Search for anything..." type="text" name="s" id="s" />
			</div>
			<input type="hidden" name="p" value="1" />
		</form>
		<button on:click={()=>{showMobileSearch = !showMobileSearch}}>
			<Fa icon={faXmark} size="2.5x" color="white" />
		</button>
	{:else}
		<a href="/" class="logo link-button">Seenit</a>
		<form action="/search" class="search-form desktop">
			<select name="f" id="f" title="Filter">
				<option value="">All</option>
				<option value="movie">Movies</option>
				<option value="series">Series</option>
				<option value="game">Games</option>
				<option value="episode">Episodes</option>
			</select>
			<div class="searchformrightfield">
				<input placeholder="Search for movies, series, games and more..." type="text" name="s" id="s" required/>
				<button type="submit" value="Search" class="searchbutton" title="Search"><Fa icon={faMagnifyingGlass} size="lg"/></button>
			</div>
			<input type="hidden" name="p" value="1" />
		</form>
		<div class="spacer"></div>
		{#if username}<!-- User is logged in, show profile and logout-->
			<a href="/user/{username}" title="Profile"><Fa icon={faUserCircle} size="2.5x" color="white" /></a>
			
			<!-- We need to send a form action to the logout api route -->
			<form action="/logout" method="POST">
				<button type="submit" title="Log out"><Fa icon={faSignOut} size="2.5x" color="white" /></button>
			</form>
		{:else}
			<a href="/login"><Fa icon={faSignIn} size="2.5x" color="white" /></a>
		{/if}
		<button class="mobile-search-button"  on:click={()=>{showMobileSearch = !showMobileSearch}}>
			<Fa icon={faMagnifyingGlass} size="2.5x" color="white" />
		</button>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}
	div.spacer {
		flex:1;
	}
	.logo {
		letter-spacing: -1px;
		font-weight: 900;
		font-size: 2em;
		padding: 0 0.5em;
		height: 50px;
	}
	form.search-form {
		height: 3rem;
		width: 100%;
		display: flex;
		gap: 1px;
		border-radius: 0.25em;
	}
	form div.searchformrightfield {
		display: flex;
		width: 100%;
	}
	button {
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
	.mobile-search-button {
		display: none;
	}
	.mobile {
		border-top-right-radius: 0.25em;
		border-bottom-right-radius: 0.25em;
		overflow: hidden;
	}

	@media screen and (max-width: 450px) {
		form.desktop {
			display:none;
		}
		.mobile-search-button {
			display: block; 
		}
	}
	@media screen and (min-width: 450px) and (max-width: 750px) {

	}
	@media screen and (min-width: 750px) {
		div.spacer {
			display: none;
		}
	}
</style>
