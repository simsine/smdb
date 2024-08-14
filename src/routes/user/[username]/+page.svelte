<script lang="ts">
	export let data
	let userTitleStatuses = data.user.UserTitleStatuses
	let omdbTitles = data.omdbTitles
	let reviews = data.user.reviews
</script>

<section>
	<div class="stats-header">
		<h2>Latest updates</h2>
		<a href="/user/{data.user.username}/watchlist">See more</a>
	</div>
	<hr>
	{#each userTitleStatuses as userTitleStatus}
		<article>
			<a href="/title/{userTitleStatus.imdbID}">
				<img src="{omdbTitles.get(userTitleStatus.imdbID)?.Poster}" alt="" height="100px" width="75px">
			</a>
			<div>
				<p><a href="/title/{userTitleStatus.imdbID}">{omdbTitles.get(userTitleStatus.imdbID)?.Title}</a></p>
				<small>{userTitleStatus.watchStatus}</small><br>
				<small>Season</small> <b>{userTitleStatus.currentSeason}</b> <small>Episode</small> <b>{userTitleStatus.currentEpisode}</b>
			</div>
			<div class="flex-1"></div>
			<small>{userTitleStatus.updatedAt.toDateString()}</small>
		</article>
	{/each}
</section>
<section>
	<div class="stats-header">
		<h2>Latest reviews</h2>
		<a href="/user/{data.user.username}/reviews">See more</a>
	</div>
	<hr>
	{#each reviews as review}
		<article>
			<a href="/title/{review.imdbID}">
				<img src="{omdbTitles.get(review.imdbID)?.Poster}" alt="" height="100px" width="75px">
			</a>
			<div>
				<p><a href="/title/{review.imdbID}">{review.title}</a></p>
				<p>{review.content}</p>
				<p>{review.rating}/10</p>
			</div>
			<div style="flex:1"></div>
			<p>{review.createdAt.toDateString()}</p>
		</article>
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
