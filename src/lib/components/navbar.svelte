<nav>
    <a href="/" class="logo">sMDB</a>
    <form action="/search">
        <select name="f" id="f">
            <option value="">All</option>
            <option value="movie">Movies</option>
            <option value="series">Series</option>
            <option value="game">Games</option>
            <option value="episode">Episodes</option>
        </select>
        <input placeholder="Search movies, series, games and more..." type="text" name="s" id="s">
        <input type="submit" value="Search">
    </form>
    <a href="/usercontent" class="user-content">My content</a>
</nav>

<style>
    nav{
        margin: 15px 30px 15px 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 15px;

        border-radius: 0.25em;
    }

    .logo{
        letter-spacing: -1px;
        font-size: 2em;
        text-decoration: none;
        color: #161A1D;
        background-color: #D90429;
        padding: 5px;
        border-radius: 0.25em;
    }
    .user-content{
        font-size: 1.5em;
        color: inherit;
        text-decoration: none;
        margin: 5px;
        width:12ch;
    }
    form {
        width: 100%;
        display: flex;
    }
    form select, form input, form option{
        padding: 0.8em;
        border-radius: 0.25em;
        font-size: 1em;
    }
    form input[type=text]{
        width: 100%;
    }
    form input[type=submit]:hover{
        cursor: pointer;
    }
</style>