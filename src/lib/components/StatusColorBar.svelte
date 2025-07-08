<script lang="ts">
	import type { WatchStatus } from "@prisma/client"

	interface Props {
		watchStatus: WatchStatus
	}

	let { watchStatus }: Props = $props()
</script>

<div class={["status-colorbar", watchStatus]}></div>

<style>
	.status-colorbar {
		width: 5px;
		height: 100px; /*! Dont do this, big nasty */
	}
	.PLAN_TO_WATCH {
		background-color: var(--status-plan-to-watch);
	}
	.WATCHING {
		background-color: var(--status-watching);
	}
	.ON_HOLD {
		background-color: var(--status-on-hold);
	}
	.COMPLETED {
		background-color: var(--status-completed);
	}
	.DROPPED {
		background-color: var(--status-dropped);
	}
</style>