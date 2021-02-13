<script>
  export let page;
  import { goto } from '@sapper/app'; 
  import paginate from '../utils/paginate.js';

  async function gotoPage(thePage) {
    if (thePage < 1 || thePage > page.maxPages) return;

    page.currentParams.page = thePage;
    let urlQuery = new URLSearchParams(page.currentParams);
    goto(`${page.currentPath}?${urlQuery}`, { replaceState: false });

    page.visibleData = paginate(page.data, page.paginateBy, thePage);
    page.currentPage = thePage;
    page.suggestedPage = thePage;
  };
</script>

<div class="flex flex-row justify-center items-center">
  <span class="block text-xs tracking-wide uppercase text-gray-500 mr-auto">{ page.currentPage < page.maxPages ? page.currentPage *  page.paginateBy : page.data.length } / { page.data.length } kohdetta • Sivu { page.currentPage } / { page.maxPages }</span>
  <button on:click={ () => gotoPage( page.currentPage - 1 ) } class="transition duration-300 ease-linear {page.currentPage == 1 ? 'text-gray-200 bg-gray-50 cursor-not-allowed' : 'text-gray-400 hover:text-indigo-500 bg-gray-50 hover:bg-indigo-50'} focus:outline-none p-2 rounded-md h-8" type="button">
    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <input on:change={ () => gotoPage( page.suggestedPage ) } bind:value={page.suggestedPage} class="transition duration-300 ease-linear text-gray-400 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-500 focus:outline-none rounded-md text-center w-16 h-8 mx-2" type="number" placeholder="{page.currentPage}"/>

  <button on:click={ () => gotoPage( page.currentPage + 1 ) } class="transition duration-300 ease-linear {page.currentPage == page.maxPages ? 'text-gray-200 bg-gray-50 cursor-not-allowed' : 'text-gray-400 hover:text-indigo-500 bg-gray-50 hover:bg-indigo-50'} focus:outline-none p-2 rounded-md h-8" type="button">
    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>