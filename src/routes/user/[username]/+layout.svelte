<script lang="ts">
    export let data
</script>

<main>
    <aside>
        <a href="/user/{data.user.username}">
            <h1>{data.user.username}'s Profile</h1>
        </a>
        <p>User since {data.user.createdAt.toDateString()}</p>
        <div class="horizontal-flex">
            <a href="/user/{data.user.username}/watchlist" class="link-button"><span>WatchList</span></a>
            <a href="/user/{data.user.username}/reviews" class="link-button"><span>Reviews</span></a>
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
        gap: 2rem;
    }

    @media screen and (max-width: 450px) {
        
    }
    @media screen and (min-width: 450px) and (max-width: 750px) {

    }
    @media screen and (min-width: 750px) {
        main {
            flex-direction: row;
        }
    }
</style>