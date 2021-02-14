<svelte:head>
	<title>Tabellius - Postimerkkien painopaikat</title>
</svelte:head>

<script context="module">
  export async function preload(page, session) {
    const response = await this.fetch('_stamps.json');
    const snapshot = await response.json();

    let printers = [];
    
    snapshot.forEach((item,i) => {
      if (item.painopaikka === '') item.painopaikka = 'Tuntematon';
      let printerIndex = printers.findIndex(a => a.nimi == item.painopaikka);
      if (printerIndex < 0) {
        printers.push({
          nimi: item.painopaikka,
          stamps: [ item ]
        });
      } else {
        printers[printerIndex].stamps.push(item);
      }
    });

    const params = page;
    return { printers, params };
  };
</script>

<script>
  import paginate from '../../utils/paginate.js';
  import Toolbar from '../../components/Toolbar.svelte';
  import Pagination from '../../components/Pagination.svelte';
  import NoResults from '../../components/NoResults.svelte';
  import PrinterGrid from '../../components/PrinterGrid.svelte';

  // our master data provided by json
  export let printers;
  export let params;

  // check localStorage for existing viewMode
  const userViewMode = localStorage.getItem('tabellius__viewMode');
  if (userViewMode) {
    params.query.view = userViewMode;
  };
  
  // our page object we can share across components easily
  export let page = {
    // pagination
    data: printers,
    paginateBy: 32,
    currentPage: parseInt(params.query.page) || 1,
    suggestedPage: parseInt(params.query.page) || 1,   // Paginate input controls this
    maxPages: 1,
    visibleData: printers,

    // other
    currentHandle: params.handle,
    currentPath: params.path,
    currentQuery: params.query.search,
    currentView: params.query.view || 'grid',
    currentParams: params.query
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

<Toolbar searchPlaceholder="Hae painopaikkaa..." bind:page/>
<Pagination bind:page/>
{#if page.visibleData.length}
  <PrinterGrid bind:page/>
{:else}
  <NoResults bind:page></NoResults>
{/if}
<Pagination bind:page/>