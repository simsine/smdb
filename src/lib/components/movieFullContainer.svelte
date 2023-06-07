<script lang="ts">
	import Fa from "svelte-fa"
	import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons"

	import type { MovieFull } from "$lib/types"

	export let movie: MovieFull
	console.log(movie)
</script>

<article>
	<div class="movie-header">
		<div>
			<h1><b>{movie.Title}</b></h1>
			<p>{movie.Type} | {movie.Year} | {movie.Rated} | {movie.Runtime}</p>
		</div>
		<div class="sMDB-rating">
			<span><b>sMDB rating</b></span>
			<span>
				<span class="star-rating"><Fa icon={faStar} /></span>
				<b>{movie.imdbRating}</b>/10
			</span>
			<span>{movie.imdbVotes} votes</span>
		</div>
	</div>
	<div class="movie-main">
		<img src={movie.Poster} alt="" class="movieposter" />
		<div class="movie-info">
			<div class="movie-genres">
				{#each movie.Genre.split(", ") as genre} <span class="genre">{genre}</span>{/each}
			</div>
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
		<div class="movie-aside">
			<button class="watchlistbutton"><Fa icon={faPlus} size="lg" /><span>Add to favorites</span></button>
			<a href="#critic-ratings"><p><b>{movie.Ratings.length}</b> Critic ratings</p></a>
		</div>
	</div>
	<div id="critic-ratings">
		<h2>Critic ratings</h2>
		{#each movie.Ratings as rating}
			<h3><b>{rating.Source}</b> | {rating.Value}</h3>
		{/each}
	</div>
</article>

<style>
	/*!  pls stop writing css  */

	div.movie-header {
		display: flex;
		justify-content: space-between;
	}
	.sMDB-rating {
		padding: 0.5rem 1rem;
		display: flex;
		flex-direction: column;
	}
	.star-rating {
		color: var(--color-main);
	}
	div.movie-main {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}
	img.movieposter {
		box-shadow: 0 3px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
	}
	@media screen and (max-width: 450px) {
		div.movie-main {
			flex-direction: column;
		}
		div.movie-main img.movieposter {
			width: 100%;
		}
		button.watchlistbutton {
			width: 100%;
		}
	}
	@media screen and (min-width: 450px) and (max-width: 750px) {
		div.movie-main img.movieposter {
			width: 50%;
		}
	}
	@media screen and (min-width: 750px) {
		div.movie-main {
			flex-direction: row;
		}
	}

	div.movie-info {
		/* width: 70ch; */
	}
	div.movie-aside {
		display: flex;
		flex-direction: column;
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
	div#critic-ratings {
		margin-top: 2rem;
	}

	/*? Global */
	button.watchlistbutton {
		padding: 1em;
		color: inherit;
		border: none;
		background-color: var(--color-dark);
		white-space: nowrap;
		min-width: fit-content;
	}
	button.watchlistbutton:hover {
		background-color: rgba(32, 35, 38, 0.8);
		cursor: pointer;
	}
	button.watchlistbutton:active {
		box-shadow: inset 3px 3px 2px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
	}
	button.watchlistbutton span {
		margin-left: 0.5em;
		font-weight: 900;
	}
</style>
