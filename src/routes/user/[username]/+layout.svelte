<script lang="ts">
    export let data
</script>

<main>
    <aside>
        <a href="/user/{data.user.username}">
            <h1>{data.user.username}'s Profile</h1>
        </a>
        <p>User since <b>{data.user.createdAt.toDateString()}</b></p>
        <p>Title count <b>{data.titleCount}</b></p>
        <p>Review count <b>{data.reviewCount}</b></p>
        <div class="horizontal-flex margin">
            <a href="/user/{data.user.username}/watchlist" class="btn flex-1"><span>WatchList</span></a>
            <a href="/user/{data.user.username}/reviews" class="btn flex-1"><span>Reviews</span></a>
        </div>
    </aside>
    <div>
        <slot></slot>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
    }
    div.margin {
        margin: 1rem 0;
    }
    p b {
        float: right;
    }

    @media screen and (max-width: 450px) {
        
    }
    @media screen and (min-width: 450px) and (max-width: 750px) {

    }
    @media screen and (min-width: 750px) {
        main {
            flex-direction: row;
            gap: 2rem;
        }
    }
</style>