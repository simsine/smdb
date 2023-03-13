<nav>
    <a href="/" class="logo"><span>sMDB</span></a>
    <form action="/search">
        <select name="f" id="f">
            <option value=""       >All</option>
            <option value="movie"  >Movies</option>
            <option value="series" >Series</option>
            <option value="game"   >Games</option>
            <option value="episode">Episodes</option>
        </select>
        <input placeholder="Search for movies, series, games and more..." type="text" name="s" id="s">
        <input name="p" value="1" hidden>
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
        font-weight: 900;
        font-size: 2em;
        text-decoration: none;
        color: #EDF2F4;
        background-color: #EF233C;
        padding: 5px ;
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
        gap: 1px;
    }
    form select{
        border-top-left-radius: 0.25em;
        border-bottom-left-radius: 0.25em;
    }
    form input:last-of-type{
        border-top-right-radius: 0.25em;
        border-bottom-right-radius: 0.25em;
    }
    form select, form input{
        padding: 0.8em;
        font-size: 1em;
        border: none;
    }
    form input[type=text]{
        width: 100%;
    }
    form input[type=submit]:hover{
        cursor: pointer;
    }
</style>