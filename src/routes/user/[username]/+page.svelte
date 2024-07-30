<script lang="ts">
	import type { MovieFull } from '$lib/types'

	export let data

	async function getTitleByID(imdbID:string):Promise<MovieFull> {
		return (await fetch(`/api/title/${imdbID}`, {
			headers: {
				"Cache-Control": "max-age=3600",
			}
		})).json()
	}
</script>

<section>
	<div class="stats-header">
		<h2>Latest updates</h2>
		<a href="/user/{data.user.username}/watchlist">See more</a>
	</div>
	<hr>
	{#each data.user.UserTitleStatuses as userTitleStatus}
		{#await getTitleByID(userTitleStatus.imdbID)}
			lol
		{:then imdbTitle}
			<article>
				<a href="/title/{userTitleStatus.imdbID}">
					<img src="{imdbTitle.Poster}" alt="" height="100px" width="75px">
				</a>
				<div>
					<p><a href="/title/{userTitleStatus.imdbID}">{imdbTitle.Title}</a></p>
					<small>{userTitleStatus.watchStatus}</small><br>
					<small>Season</small> <b>{userTitleStatus.currentSeason}</b> <small>Episode</small> <b>{userTitleStatus.currentSeason}</b>
				</div>
				<div style="flex:1"></div>
				<small>{userTitleStatus.updatedAt.toDateString()}</small>
			</article>
		{/await}
	{/each}
</section>
<section>
	<div class="stats-header">
		<h2>Latest reviews</h2>
		<a href="/user/{data.user.username}/reviews">See more</a>
	</div>
	<hr>
	{#each data.user.reviews as review}
		{#await getTitleByID(review.imdbID)}
			lol
		{:then imdbTitle} 
		<article>
			<a href="/title/{review.imdbID}">
				<img src="{imdbTitle.Poster}" alt="" height="100px" width="75px">
			</a>
			<div>
				<p><a href="/title/{review.imdbID}">{review.title}</a></p>
				<p>{review.content}</p>
				<p>{review.rating}/10</p>
			</div>
			<div style="flex:1"></div>
			<p>{review.createdAt.toDateString()}</p>
		</article>
		{/await}
	{/each}
</section>

<style>
	hr {
		flex:0;
		margin-left: 1rem;
		margin-right: 1rem;
	}
	div.stats-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	section {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-bottom: 1rem;
	}
	article {
		display: flex;
		gap: 1em;
		align-items: center;
	}

	@media screen and (max-width: 450px) {

	}
	@media screen and (min-width: 450px) and (max-width: 750px) {

	}
	@media screen and (min-width: 750px) {

	}
</style>
