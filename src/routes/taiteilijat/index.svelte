<svelte:head>
	<title>Tabellius - Postimerkkien taiteilijat</title>
</svelte:head>

<script context="module">
  export async function preload(page, session) {
    const response = await this.fetch('_stamps.json');
    const snapshot = await response.json();

    let artists = [];
    
    snapshot.forEach((item,i) => {
      if (item.taiteilija === '') item.taiteilija = 'Tuntematon';
      let artistIndex = artists.findIndex(a => a.nimi == item.taiteilija);
      if (artistIndex < 0) {
        artists.push({
          nimi: item.taiteilija,
          stamps: [ item ]
        });
      } else {
        artists[artistIndex].stamps.push(item);
      }
    });

    const params = page;
    return { artists, params };
  };
</script>

<script>
  import paginate from '../../utils/paginate.js';
  import Toolbar from '../../components/Toolbar.svelte';
  import Pagination from '../../components/Pagination.svelte';
  import NoResults from '../../components/NoResults.svelte';
  import ArtistGrid from '../../components/ArtistGrid.svelte';

  // our master data provided by json
  export let artists;
  export let params;

  // check localStorage for existing viewMode
  const userViewMode = localStorage.getItem('tabellius__viewMode');
  if (userViewMode) {
    params.query.view = userViewMode;
  };
  
  // our page object we can share across components easily
  export let page = {
    // pagination
    data: artists,
    paginateBy: 32,
    currentPage: parseInt(params.query.page) || 1,
    suggestedPage: parseInt(params.query.page) || 1,   // Paginate input controls this
    maxPages: 1,
    visibleData: artists,

    // other
    currentHandle: params.handle,
    currentPath: params.path,
    currentQuery: params.query.search,
    currentView: params.query.view || 'grid',
    currentParams: params.query
  };

  page.maxPages = Math.ceil(page.data.length / page.paginateBy);
  if (page.currentPage > page.maxPages) {
    page.currentPage = page.maxPages;
    page.suggestedPage = page.maxPages;
  } else if (page.currentPage < 1) {
    page.currentPage = 1;
    page.suggestedPage = 1;
  };

  page.visibleData = paginate(page.data, page.paginateBy, page.currentPage);
</script>

<Toolbar searchPlaceholder="Hae taiteilijaa..." bind:page/>
<Pagination bind:page/>
{#if page.visibleData.length}
  <ArtistGrid bind:page/>
{:else}
  <NoResults bind:page></NoResults>
{/if}
<Pagination bind:page/>