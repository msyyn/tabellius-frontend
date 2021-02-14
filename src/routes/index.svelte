<svelte:head>
  <title>Tabellius - Suomalaiset postimerkit</title>
  <meta name="description" content="Selaa suomalaisia postimerkkejä, niiden taiteilijoita ja painotaloja vuodesta 1856 alkaen. Aineisto perustuu Postimuseon avoimeen dataan.">
</svelte:head>

<script context="module">
  export async function preload(page, session) {
    const response = await this.fetch('_stamps.json');
    const snapshot = await response.json();
    const params = page;
    return { snapshot, params };
  };
</script>

<script>
  import paginate from '../utils/paginate.js';
  import Toolbar from '../components/Toolbar.svelte';
  import Pagination from '../components/Pagination.svelte';
  import NoResults from '../components/NoResults.svelte';
  import StampGrid from '../components/StampGrid.svelte';
  import StampList from '../components/StampList.svelte';

  // our master data provided by json
  export let snapshot;
  export let params;

  // check localStorage for existing viewMode
  const userViewMode = localStorage.getItem('tabellius__viewMode');
  if (userViewMode) {
    params.query.view = userViewMode;
  };

  // our page object we can share across components easily
  export let page = {
    // pagination
    data: snapshot,
    dataCache: [], // filtering puts data here for temporar usage
    paginateBy: 32,
    currentPage: parseInt(params.query.page) || 1,
    suggestedPage: parseInt(params.query.page) || 1,   // Paginate input controls this
    maxPages: 1,
    visibleData: snapshot,

    // other
    currentPath: params.path,
    currentQuery: params.query.search,
    currentView: params.query.view || 'grid',
    currentParams: params.query,
    showFilters: true
  };

  $: page.maxPages = Math.ceil(page.data.length / page.paginateBy);

  if (page.currentPage > page.maxPages) {
    page.currentPage = page.maxPages;
    page.suggestedPage = page.maxPages;
  } else if (page.currentPage < 1) {
    page.currentPage = 1;
    page.suggestedPage = 1;
  };

  page.visibleData = paginate(page.data, page.paginateBy, page.currentPage);
</script>

<Toolbar bind:page/>
<Pagination bind:page/>

<!-- Postikortit -->
{#if page.currentView == 'grid' && page.visibleData.length}
  <StampGrid bind:page></StampGrid>
{:else if page.currentView == 'list' && page.visibleData.length}
  <StampList bind:page></StampList>
{:else}
  <NoResults bind:page></NoResults>
{/if}

<Pagination bind:page/>