<script lang="ts">
	import Fa from "svelte-fa"
	import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons"
	import { goto } from "$app/navigation"
	import { enhance, applyAction } from "$app/forms"

	export let data
	let isLoggedIn = data.isLoggedIn
	let movie = data.movie
	let reviews = data.reviews
	let userTitleStatus = data.userTitleStatus
	let userReview = data.userReview

	let userTitleStatusForm:HTMLFormElement
	let reviewModal:HTMLDialogElement
	
	function onChangeSubmitUserTitleStatus() {
		userTitleStatusForm.requestSubmit()
	}

	function handleReviewButton() {
		if (isLoggedIn) {
			reviewModal.showModal()
		} else {
			goto("/login")
		}
	}
	function closeReviewModal() {
		reviewModal.close()
	}
</script>

<article>
	<main>
		<img src={movie.Poster} alt="" class="movieposter" />
		<div class="movie-info">
			<div>
				<h1><b>{movie.Title}</b></h1>
				<p>{movie.Type} | {movie.Year} | {movie.Rated} | {movie.Runtime}</p>
			</div>
			<div class="movie-genres">
				{#each movie.Genre.split(", ") as genre} <span class="genre">{genre}</span>{/each}
			</div>
				<form action="?/upsertWatchStatus" method="post" class="watch-status-form horizontal-flex" bind:this={userTitleStatusForm} use:enhance={() => {
					return async ({result}) => {
						// @ts-ignore
						userTitleStatus = result.data
						applyAction(result)
					}
				}}>
					{#if userTitleStatus == null}
						<button class="watchlistbutton" type="submit"><Fa icon={faPlus} size="lg"/><span>Add to watchlist</span></button>
						<input type="hidden" name="watchStatus" value="PLAN_TO_WATCH">
						<input type="hidden" name="currentSeason" value="0">
						<input type="hidden" name="currentEpisode" value="0">
					{:else}
						<select name="watchStatus" title="Watch status" value={userTitleStatus.watchStatus} on:change={onChangeSubmitUserTitleStatus}>
							<option value="PLAN_TO_WATCH">Plan to watch</option>
							<option value="WATCHING">Watching</option>
							<option value="ON_HOLD">On hold</option>
							<option value="DROPPED">Dropped</option>
							<option value="COMPLETED">Completed</option>
						</select>
						<label for="currentSeason">Season
							<input type="number" inputmode="numeric" name="currentSeason" title="Current season" min="0" max="9999" value={userTitleStatus.currentSeason} size="6" on:change={onChangeSubmitUserTitleStatus}>
						</label>
						<label for="currentSeason">Episode
							<input type="number" inputmode="numeric" name="currentEpisode" title="Current episode" min="0" max="9999" value={userTitleStatus.currentEpisode} size="6" on:change={onChangeSubmitUserTitleStatus}>
						</label>
					{/if}
				</form>
			<hr>
			<p>{movie.Plot}</p>
			<hr />
			<p>
				<b>Writers</b>{#each movie.Writer.split(", ") as writer}<span class="infolisting">{writer}</span>{/each}
			</p>
			<p>
				<b>Actors</b>{#each movie.Actors.split(", ") as actor}<span class="infolisting">{actor}</span>{/each}
			</p>
			<hr />
			<p>
				<b>Languages</b>{#each movie.Language.split(", ") as language}<span class="infolisting">{language}</span>{/each}
			</p>
		</div>
		<aside class="">
			<div class="">
				<h2><b>Ratings</b></h2>
				<button on:click={handleReviewButton} class="watchlistbutton"><Fa icon={faPlus} size="lg"/><span>{userReview ? "Edit your review" : "Write review"}</span></button>
			{#each movie.Ratings as rating}
				<p><b>{rating.Source}</b></p>
				<small>{rating.Value}</small>
			{/each}
				<!-- <span>
				<b>{movie.imdbRating}</b>/10
				<span class="star-rating"><Fa icon={faStar}/></span>
				</span>
				<span>{movie.imdbVotes} votes</span>
				<a href="#critic-ratings"><p><b>{movie.Ratings.length}</b> Critic ratings</p></a> -->
			</div>
		</aside>
	</main>
	
	<div id="user-reviews">
		<h2>User reviews</h2>
		<dialog bind:this={reviewModal}>
			<h3>{userReview ? "Edit your review" : "Write new review"}</h3>
			<form class="vertical-flex" method="post" action="?/upsertReview">
				<label for="title">
					Title
				</label>
				<input type="text" name="title" id="title" required value={userReview?.title ?? ""}>
				<label for="content">
					Content
				</label>
				<textarea name="content" id="content" cols="25" rows="5" maxlength="250" value={userReview?.content ?? ""}></textarea>
				<label for="rating">
					Rating <span class="star-rating"><Fa icon={faStar}/></span>
				</label>
				<select name="rating" id="rating" title="Rating" required value={userReview?.rating.toString() ?? ""}>
					<option value="">Select</option>
					<option value="10">10</option>
					<option value="9">9</option>
					<option value="8">8</option>
					<option value="7">7</option>
					<option value="6">6</option>
					<option value="5">5</option>
					<option value="4">4</option>
					<option value="3">3</option>
					<option value="2">2</option>
					<option value="1">1</option>
				</select>
				<div class="horizontal-flex">
					<button type="button" on:click={closeReviewModal}>Cancel</button>
					<button form="delete-review">Delete review</button>
					<button type="submit">Submit review</button>
				</div>
			</form>
			<form class="vertical-flex" action="?/deleteReview" method="post" id="delete-review"></form>
		</dialog>
		{#each reviews as review}
			<h3>
				{review.title}
				-
				<a href="/user/{review.author.username}">{review.author.username}</a>
			</h3>
			<p>{review.rating}/10 <span class="star-rating"><Fa icon={faStar}/></span></p>
			<p>{review.content}</p>
		{:else}
			<p>No reviews for this {movie.Type} yet :(</p>
		{/each}
	</div>
	<!-- <div id="critic-ratings">
		<h2>Critic ratings</h2>
		{#each movie.Ratings as rating}
			<h3><b>{rating.Source}</b> | {rating.Value}</h3>
		{/each}
	</div> -->
</article>

<style>
	.movie-info {
		flex: 1;
	}
	.sMDB-rating {
		padding: 0.5rem 1rem;
		display: flex;
		flex-direction: column;
	}
	.star-rating {
		color: var(--color-main);
	}
	main {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}
	img.movieposter {
		box-shadow: 0 3px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
	}
	.watch-status-form input, .watch-status-form select {
		width:  min-content;
	}

	@media screen and (max-width: 450px) {
		main {
			flex-direction: column;
		}
		aside.vertical-flex {
			flex-direction: row-reverse;
		}

		img.movieposter {
			width: 100%;
		}
		button.watchlistbutton {
			width: 100%;
		}
	}
	@media screen and (min-width: 450px) and (max-width: 750px) {
		main {
			flex-direction: column;
		}
		img.movieposter {
			/* width: 50%; */
		}
	}
	@media screen and (min-width: 750px) {
		main {
			flex-direction: row;
		}
	}
	.vertical-flex {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.horizontal-flex {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}
	div.movie-genres {
		display: flex;
		gap: 5px;
		margin-bottom: 1rem;
	}
	span.genre {
		padding: 5px;
		background-color: var(--color-dark);
	}
	span.infolisting::before {
		content: " | ";
	}

	textarea {
		resize: none;
	}
</style>
