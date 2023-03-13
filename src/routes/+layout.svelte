<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte"
</script>

<Navbar />

<main>
    <slot />
</main>

<style>
    main{
        margin: 15px 30px 15px 30px;
    }
</style>