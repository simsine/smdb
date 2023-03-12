<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte"

    import "$lib/app.css"
</script>

<Navbar />
<main>
    <slot />
</main>

<style>
    :global(body){
        margin: 0;
        background-color: #2B2D42;
        color: #EDF2F4;
    }
    main{
        margin: 15px 30px 15px 30px;
    }
</style>