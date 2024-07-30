<script lang="ts">
    import SvelteTable from 'svelte-table';

    export let data

    const columns = [
        {
            key: "id",
            title:"#",
            value: (v: { id: any }) => v.id
        },
        {
            key: "image",
            title:"Image",
            value: (v: { image: any }) => v.image
        },
        {
            key: "title",
            title:"Title",
            value: (v: { title: any }) => v.title
        },
    ]
    const rows = data.userTitleStatuses.map((userStatus, index) => { 
        let omdbTitle = data.omdbTitles.get(userStatus.imdbID)
        return {
            id: index,
            image: omdbTitle?.Poster,
            title: omdbTitle?.Title,
        }
    })
</script>

<h2>Watchlist</h2>

<SvelteTable {columns} {rows}>
    <tr slot="row" let:row class="">
        <td>{row.id}</td>
        <td>
            <img src={row.image} alt="" loading="lazy">
        </td>
        <td>{row.title}</td>
    </tr>
</SvelteTable>
<style>
    /* :global(table) {
        border-collapse: collapse;
    }
    :global(table *) {
        border: 1px solid white;
    } */
</style>