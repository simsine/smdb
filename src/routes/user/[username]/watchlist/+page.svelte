<script lang="ts">
    import SvelteTable from 'svelte-table';
    import { onMount } from "svelte"
    import { pushState } from "$app/navigation"

    let { data } = $props();
    
    const watchStatusMap = new Map([
        [undefined,"Any"],
        ["WATCHING","Watching"],
        ["PLAN_TO_WATCH","Plan to watch"],
        ["COMPLETED","Completed"],
        ["ON_HOLD","On hold"],
        ["DROPPED","Dropped"],
    ])

    interface FilterSelections {
        [status: string]: undefined|string
    }
    let filterSelections: FilterSelections = $state({
        status: undefined,
    })

    onMount(() => {
        const url = new URL(window.location.href)
        let presetFilter = url.searchParams.get("f")
        if (presetFilter !== null) {
            filterSelections.status = presetFilter
        }
    })

    function handleFilterButton(filterValue: undefined|string, event:Event) {
        filterSelections.status = filterValue

        const url = new URL(window.location.href)
        if (filterValue === undefined) {
            url.searchParams.delete("f")
        } else {
            url.searchParams.set("f", filterValue || "")
        }
        pushState(url, data)
    }

    //? SvelteTable config //
    const columns = [
        {
            key: "image",
            title: "Image",
            value: (v: { image: any }) => v.image,
        },
        {
            key: "title",
            title: "Title",
            value: (v: { title: any }) => v.title,
            sortable: true,
            // searchValue: (v: {title: string}, s: string) => v.title.toString().toLowerCase().includes(s.toLowerCase()),
        },
        {
            key: "status",
            title: "Status",
            value: (v: { status: any }) => v.status,
            sortable: true,
        },
        //{
        //    key: "type",
        //    title: "Type",
        //    value: (v: { type: any }) => v.type,
        //    sortable: true,
        //},
    ]
    const rows = data.userTitleStatuses.map((userStatus, index) => { 
        let omdbTitle = data.omdbTitles.get(userStatus.imdbID)
        return {
            id: index,
            image: omdbTitle?.Poster,
            title: omdbTitle?.Title,
            type: omdbTitle?.Type,
            imdbID: omdbTitle?.imdbID,
            status: userStatus.watchStatus,
        }
    })
</script>

<h2>Watchlist</h2>

<div class="filter-container">
    {#each watchStatusMap.entries() as [key, value]}
        <button onclick={(event)=>handleFilterButton(key, event)} role="tab" class="btn {filterSelections.status === key ? "active" : ""}">{value}</button>
    {/each}
</div>

<SvelteTable {columns} {rows} bind:filterSelections={filterSelections} rowKey="id">
    {#snippet row({ row })}
        <tr class="row"  >
            <td><a href="/title/{row.imdbID}"><img src={row.image} alt="{row.title} poster" loading="lazy" height="100px" width="75"></a></td>
            <td><a href="/title/{row.imdbID}">{row.title}</a></td>
            <td>{watchStatusMap.get(row.status)}</td>
            <!-- <td>{row.type}</td> -->
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