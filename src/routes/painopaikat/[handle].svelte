<script context="module">
    // Need to manage handle functions here and in handleize.js
    // Couldn't figure out how to import stuff here..
    function handleize(str) {
      return str.toLowerCase().replace(/'/g, "").replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    export async function preload(page){
      const response = await this.fetch('_stamps.json');
      const snapshot = await response.json();
      const filteredSnapshot = snapshot.filter((a) => {
        if (a.painopaikka == '') a.painopaikka = 'Tuntematon';
        if (handleize(a.painopaikka) == page.params.handle) return a;
      });
  
      // We wrap artist around array because of how ArtistGrid is built.
      // It expects array and cba to refactor it at this point.
      const printer = {
        nimi: filteredSnapshot[0].painopaikka,
        stamps: filteredSnapshot
      };
  
      const params = page;
      return { printer , params };
    }
  </script>
  
  <script>
    import paginate from '../../utils/paginate.js';
    import Toolbar from '../../components/Toolbar.svelte';
    import Pagination from '../../components/Pagination.svelte';
    import NoResults from '../../components/NoResults.svelte';
    import StampGrid from '../../components/StampGrid.svelte';
  
    // our master data provided by json
    export let printer;
    export let params;
    let breadcrumb;
  
    // check localStorage for existing viewMode
    const userViewMode = localStorage.getItem('tabellius__viewMode');
    if (userViewMode) {
      params.query.view = userViewMode;
    };
    
    // our page object we can share across components easily
    export let page = {
      // pagination
      data: printer.stamps,
      dataCache: [],
      paginateBy: 32,
      currentPage: parseInt(params.query.page) || 1,
      suggestedPage: parseInt(params.query.page) || 1,   // Paginate input controls this
      maxPages: 1,
      visibleData: printer.stamps,
  
      // other
      currentHandle: params.params.handle,
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

    if (page.currentHandle) {
    breadcrumb = page.currentPath.replaceAll('/','').replace(page.currentHandle,'');
    breadcrumb = breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1);
  };
  
    page.visibleData = paginate(page.data, page.paginateBy, page.currentPage);
  </script>
  
  <Toolbar showFilters={true} bind:page/>
  <Pagination bind:page/>
  <!-- Breadcrumb desktop -->
  <div class="text-sm tracking-wide mt-4">
    <a class="transition duration-300 ease-linear font-bold text-indigo-300 hover:text-indigo-500" href="{page.currentPath.replace(page.currentHandle,'')}" title="{breadcrumb}">{breadcrumb}</a>
    <span class="text-gray-400 text-xs">/</span>
    <span class="text-gray-400 text-xs">{printer.nimi}</span>
  </div>
  {#if page.visibleData.length}
    <StampGrid bind:page/>
  {:else}
    <NoResults bind:page></NoResults>
  {/if}
  <Pagination bind:page/>