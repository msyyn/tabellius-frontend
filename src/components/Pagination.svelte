<script>
  export let page;
  import { goto } from '@sapper/app'; 
  import Button from './Button.svelte';
  import paginate from '../utils/paginate.js';

  function gotoPage(thePage) {
    if (thePage < 1 || thePage > page.maxPages) return;
    
    page.visibleData = paginate(page.data, page.paginateBy, thePage);
    page.suggestedPage = thePage;
    page.currentParams.page = thePage;

    let urlQuery = new URLSearchParams(page.currentParams);
    goto(`${page.currentPath}?${urlQuery}`);
  };

  $: {
    page.currentPage = parseInt(page.currentParams.page);
    page.suggestedPage = parseInt(page.currentParams.page);
  }
</script>

<div class="flex flex-row justify-center items-center">

  <span class="block text-xs tracking-wide uppercase text-gray-500 mr-auto">{ page.currentPage < page.maxPages ? page.currentPage *  page.paginateBy : page.data.length } / { page.data.length } kohdetta • Sivu { page.currentPage } / { page.maxPages }</span>
  
  <Button on:click={() => gotoPage( page.currentPage - 1 )} isDisabled={page.currentPage == 1} class="h-8" padding="p-2">
    <svg slot="icon" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  </Button>

  <input on:change={ () => gotoPage( page.suggestedPage ) } bind:value={page.suggestedPage} class="transition duration-300 ease-linear text-gray-400 bg-gray-50 hover:bg-indigo-50 focus:bg-indigo-50 focus:text-indigo-500 hover:text-indigo-500 focus:outline-none rounded-md text-center w-16 h-8 mx-2"/>

  <Button on:click={() => gotoPage( page.currentPage + 1 )} isDisabled={page.currentPage == page.maxPages} class="h-8" padding="p-2">
    <svg slot="icon" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </Button>
</div>