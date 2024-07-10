<script>
    import { page } from '$app/stores';
</script>
<h1>Error:</h1>
<h4>{$page.status} {$page.error?.message}</h4>
<h4>Maybe <a href="/">return to home</a>?</h4>