<script>
	import { base } from "$app/paths"
	import { page } from "$app/stores"
</script>

<h1>My page</h1>
<p>This pages let's you see what content you have saved</p>

<section>
	<nav>
		<ul>
			<li><a href="{base}/usercontent/favorites">My favorites</a></li>
			<li><a href="{base}/usercontent/reviews">My reviews</a></li>
		</ul>
	</nav>

	<slot />
</section>

<style>
	section {
		display: flex;
		gap: 15px;
	}
</style>
