<script>
    import { page } from '$app/stores';
</script>
<h1>{$page.status} {$page.error?.message}</h1>
<h2>Seems like something went wrong. Maybe <a href="/">return to home</a>?</h2>