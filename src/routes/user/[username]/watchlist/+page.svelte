<script lang="ts">
    import SvelteTable from 'svelte-table';
    import { onMount } from "svelte"
    import { pushState } from "$app/navigation"
	import { watchStatusMap } from '$lib/helpers'
	import StatusColorBar from '$lib/components/StatusColorBar.svelte'

    let { data } = $props();

    interface FilterSelections {
        [status: string]: string|undefined
    }
    let filterSelections: FilterSelections = $state({
        status: undefined,
    })

    onMount(() => {
        const url = new URL(window.location.href)
        let presetStatusFilter = url.searchParams.get("status")
        if (presetStatusFilter !== null) {
            filterSelections.status = presetStatusFilter
        }
    })

    function handleStatusFilterButton(filterValue: string|undefined) {
        filterSelections.status = filterValue

        const url = new URL(window.location.href)
        if (filterValue === undefined) {
            url.searchParams.delete("status")
        } else {
            url.searchParams.set("status", filterValue || "")
        }
        pushState(url, data)
    }

    //? SvelteTable config //
    const columns: any = [
        {
            key: "poster",
            title: "Poster",
            value: (v: { poster: any }) => v.poster,
        },
        {
            key: "title",
            title: "Title",
            value: (v: { title: any }) => v.title,
            sortable: true,
            searchValue: (v: {title: string}, s: string) => v.title.toString().toLowerCase().includes(s.toLowerCase()),
        },
        {
            key: "status",
            title: "Status",
            value: (v: { status: any }) => v.status,
        },
    ]
    const rows = data.fulLStatuses.map((status, index) => {
        return {
            id: index,
            poster: status.omdbTitle.Poster,
            title: status.omdbTitle.Title,
            type: status.omdbTitle.Type,
            imdbID: status.status.imdbID,
            status: status.status.watchStatus,
        }
    })
</script>

<h2>Watchlist</h2>

<div class="filter-container">
    {#each watchStatusMap.entries() as [status, value]}
        <button onclick={() => handleStatusFilterButton(status)} role="tab" class="btn {status === filterSelections.status ? "active" : ""}">{value}</button>
    {/each}
</div>

<SvelteTable {columns} {rows} bind:filterSelections={filterSelections} rowKey="id" sortBy="title">
{#snippet row({ row }: any)}
    <tr class="row">
        <td style="display: flex; gap: .5rem"><StatusColorBar watchStatus={row.status}/><a href="/title/{row.imdbID}"><img src={row.poster} alt="{row.title} poster" loading="lazy" height="100px" width="75"></a></td>
        <td><a href="/title/{row.imdbID}">{row.title}</a></td>
        <td>{watchStatusMap.get(row.status)}</td>
    </tr>
{/snippet}
</SvelteTable>

<style>
    .filter-container {
        overflow-x: scroll;
        display: flex;
        gap: .5rem;
        padding: 1rem 0;
    }
    .filter-container button {
        white-space: nowrap;
        color: inherit;
        background-color: unset;
        border: unset;
        border-bottom: .2rem solid var(--color-muted);
        border-radius: 0;
        box-shadow: unset;
    }
    .filter-container button:hover {
        border-bottom: .2rem solid var(--color-light);
    }
    .filter-container button.active {
        border-bottom: .2rem solid var(--color-main);
    }
</style>