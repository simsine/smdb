<script lang="ts">
	import Star from '$lib/components/star.svelte'
	import { watchStatusMap } from '$lib/helpers/frontend'

	let { data } = $props();
	let fullStatuses = data.fullStatuses
	let fullReviews = data.fullReviews
</script>

<section>
	<div class="stats-header">
		<h2>Latest updates</h2>
		<a href="/user/{data.user.username}/watchlist">See more</a>
	</div>
	<hr>
	{#each fullStatuses as fullStatus}
		<article>
			<a href="/title/{fullStatus.status.imdbID}">
				<img src="{fullStatus.omdbTitle.Poster}" alt="" height="100px" width="75px">
			</a>
			<div>
				<p><a href="/title/{fullStatus.status.imdbID}">{fullStatus.omdbTitle.Title}</a></p>
				<small>{watchStatusMap.get(fullStatus.status.watchStatus)}</small><br>
				<small>Season</small> <b>{fullStatus.status.currentSeason}</b> <small>Episode</small> <b>{fullStatus.status.currentEpisode}</b>
			</div>
			<div class="flex-1"></div>
			<small>{fullStatus.status.updatedAt.toDateString()}</small>
		</article>
	{/each}
</section>
<section>
	<div class="stats-header">
		<h2>Latest reviews</h2>
		<a href="/user/{data.user.username}/reviews">See more</a>
	</div>
	<hr>
	{#each fullReviews as fullReview}
		<article>
			<a href="/title/{fullReview.review.imdbID}">
				<img src="{fullReview.omdbTitle.Poster}" alt="" height="100px" width="75px">
			</a>
			<div>
				<p><a href="/title/{fullReview.review.imdbID}">{fullReview.omdbTitle.Title}</a></p>
				<p>{fullReview.review.content?.slice(0, 25)}</p>
				<p>{fullReview.review.rating}/10 <Star/></p>
			</div>
			<div style="flex:1"></div>
			<p>{fullReview.review.createdAt.toDateString()}</p>
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
