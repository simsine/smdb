<script lang="ts">
    import SvelteTable from 'svelte-table';

    export let data

    const columns = [
        {
            key: "id",
            title: "#",
            value: (v: { id: any }) => v.id
        },
        {
            key: "image",
            title: "Image",
            value: (v: { image: any }) => v.image
        },
        {
            key: "title",
            title: "Title",
            value: (v: { title: any }) => v.title,
            sortable: true
        },
        {
            key: "status",
            title: "Status",
            value: (v: { status: any }) => v.status,
            sortable: true
        },
    ]
    const rows = data.userTitleStatuses.map((userStatus, index) => { 
        let omdbTitle = data.omdbTitles.get(userStatus.imdbID)
        return {
            id: index,
            image: omdbTitle?.Poster,
            title: omdbTitle?.Title,
            status: userStatus.watchStatus,
            type: omdbTitle?.Type
        }
    })
</script>

<h2>Watchlist</h2>

<SvelteTable {columns} {rows}>
    <tr slot="row" let:row class="">
        <td>{row.id}</td>
        <td>
            <img src={row.image} alt="" loading="lazy" height="100px" width="75">
        </td>
        <td>{row.title}</td>
        <td>{row.status}</td>
    </tr>
</SvelteTable>
<style>
    tr {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    :global(table) {
        border-collapse: collapse;
    }
</style>