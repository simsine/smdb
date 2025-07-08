<script>
	import { faStar } from "@fortawesome/free-solid-svg-icons/index.js"
	import Fa from "svelte-fa"
</script>

<span class="star-rating"><Fa icon={faStar}/></span>

<style>
	.star-rating {
		color: var(--color-main);
	}
</style>