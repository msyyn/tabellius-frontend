<script>
  import SidebarToggle from './SidebarToggle.svelte';
  import filterPage from '../utils/filterPage.js';
  import paginate from '../utils/paginate.js';
  import { goto } from '@sapper/app';

  export let page;

  let timer;
  function onSearch(query) {
    if (query.length > 0 && query.length < 4) return;
    // debounce is required for search. otherwise search is performed instantly,
    // which is not ideal as we want to make sure user has stopped writing first.
    // oterwise we query the data on every key stroke.
    clearTimeout(timer);
    timer = setTimeout(async () => {

      query = query.toLowerCase();
      
      // Revert visible data back to old state if query is empty.
      if (query.length == 0) { 
        page.visibleData = paginate(page.data, page.paginateBy, page.currentPage);
        goto(page.currentPath, true, true);
        return; 
      };

      page.currentParams.search = query;
      let urlQuery = new URLSearchParams(page.currentParams);
      goto(`${page.currentPath}?${urlQuery}`, true, true);

      page.visibleData = await filterPage(page.data, 'all', query);
    }, 500);
  };

  const clearQuery = () => {
    clearTimeout(timer);
    page.visibleData = paginate(page.data, page.paginateBy, page.currentPage);

    page.currentQuery = undefined;
    delete page.currentParams.search;

    let urlQuery = new URLSearchParams(page.currentParams);
    goto(`${page.currentPath}?${urlQuery}`, false, true);
  };

  const initialQuery = async () => {
    clearTimeout(timer);
    page.visibleData = await filterPage(page.data, 'all', page.currentQuery)
  };
  if (page && page.currentQuery) { initialQuery() };

  const setViewMode = (mode) => {
    page.currentView = mode;
    localStorage.setItem('tabellius__viewMode', mode);
  };
</script>

<header class="mb-6 flex justify-between flex-wrap{ page ? '' : ' lg:hidden'}">
  <div class="items-center w-full lg:w-auto flex lg:space-x-2 flex-wrap lg:flex-nowrap md:mr-auto">
    <a href="." class="mr-auto lg:hidden tracking-tight text-2xl select-none text-gray-700 font-bold text-upcase">Tabellius</a>
    <SidebarToggle/>
    {#if page}
      <!-- search icon -->
      <div class="w-full flex flex-row items-center mt-8 lg:mb-0 lg:mt-0 lg:w-auto">
        <svg class="hidden lg:block w-5 h-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input bind:value={page.currentQuery} on:keyup={({ target: { value } }) => onSearch(value)} type="text" placeholder="Hae sivustolta..." class="w-full lg:w-auto transition duration-300 ease-linear px-4 py-2 rounded-md lg:max-w-sm md:flex-1 focus:outline-none bg-gray-50 {page.currentQuery ? 'lg:bg-gray-50' : 'lg:bg-transparent'} hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-gray-100 mr-2"/>
        {#if page.currentQuery}
          <button type="button" on:click={clearQuery} class="text-gray-400 hover:text-indigo-500 bg-gray-50 hover:bg-indigo-50 focus:outline-none p-3 rounded-md">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/if}
      </div>
    {/if}
  </div>
  <!--
  {#if page}
    <div class="hidden lg:flex items-center justify-end space-x-2 ml-auto">
      <button type="button" on:click={() => setViewMode('list')} class="{page.currentView == 'list' ? 'text-indigo-500 bg-indigo-50': 'text-gray-400 bg-gray-50'}  hover:text-indigo-500 hover:bg-indigo-50 transition duration-300 ease-linear focus:outline-none p-3 rounded-md flex flex-row items-center flex-1 lg:flex-grow-0">
        <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
        <span>Listanäkymä</span>
      </button>
      <button type="button" on:click={() => setViewMode('grid')} class="{page.currentView == 'grid' ? 'text-indigo-500 bg-indigo-50': 'text-gray-400 bg-gray-50'}  hover:text-indigo-500 hover:bg-indigo-50 transition duration-300 ease-linear focus:outline-none p-3 rounded-md flex flex-row items-center flex-1 lg:flex-grow-0">
        <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span>Ruudukko</span>
      </button>
    </div>
  {/if}
  -->
</header>