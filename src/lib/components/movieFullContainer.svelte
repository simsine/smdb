<script lang="ts">
	import type { MovieFull } from "$lib/types"
    export let movie:MovieFull;
</script>

<article>
    <div>
        <h1><b>{movie.Title}</b></h1>
        <p>{movie.Type} | {movie.Year} | {movie.Rated} | {movie.Runtime}</p>
    </div>
    <div class="movie-main">
        <img src={movie.Poster} alt="" class="movieposter">
        <div>
            <div class="genres">
                {#each movie.Genre.split(", ") as genre} <span class="genre">{genre}</span>{/each}
            </div>
            <p>{movie.Plot}</p>
            <hr>
            <p><b>Writers</b>{#each movie.Writer.split(", ") as writer}<span class="person">{writer}</span>{/each}</p>
            <p><b>Actors</b>{#each movie.Actors.split(", ") as actor}<span class="person">{actor}</span>{/each}</p>
            <hr>
            <p>{movie.Language}</p>
        </div>
        <button class="watchlistbutton"><span>+</span> Add to watchlist</button>
    </div>
</article>

<style>
    div.movie-main{
        display: flex;
        gap: 10px;
        align-items: flex-start;
    }
    @media screen and (max-width: 450px) {
        div.movie-main{
            flex-direction: column;
        }
        div.movie-main img.movieposter{
            width: 100%;
        }
        button.watchlistbutton{
            width: 100%;
        }
    }
    @media screen and (min-width: 450px) and (max-width: 750px) {
        div.movie-main img.movieposter{
            width: 50%;
        }
    }
    @media screen and (min-width: 750px) {
        div.movie-main{
            flex-direction: row;
        }
    }

    div.genres{
        display: flex;
        gap: 5px;
    }
    span.genre{
        padding: 5px;
        background-color: #202326;
    }
    span.person::before{
        content: " | ";
    }

    /*? Global */
    button.watchlistbutton{
        padding: 0.75em;
        width:25ch;
        color: inherit;
        border: none;
        border-radius: 0.25em;
        background-color: #202326;
        font-size: 1em;
    }
    button.watchlistbutton:hover{
        background-color:#2a2d30;
    }
    button.watchlistbutton:active{
        box-shadow: inset 3px 3px 2px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    }
    button.watchlistbutton span{
        font-weight: 900;
    }
</style>