<script>
  export let page;
  import paginate from '../utils/paginate.js';
  import { goto } from '@sapper/app'; 
  function resetPage() {
    if (page.dataCache &&  page.dataCache.length > 0) { page.data = page.dataCache; page.dataCache = [] }; 
    page.visibleData = paginate(page.data, page.paginateBy, page.currentPage);
    page.currentQuery = undefined;
    goto(page.currentPath, { replaceState: true });
  };
</script>
<div class="lg:w-1/3 my-16 mx-auto flex flex-col justify-center">
  <h2 class="text-xl tracking-wide font-bold mb-2 text-red-400">Ei hakutuloksia :(</h2>
  <p class="text-lg mb-6 text-gray-500">Ole hyvä ja poista rajaukset.</p>
  <button title="Poista rajaukset" on:click={resetPage} class="transition duration-300 ease-linear p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 hover:bg-indigo-200 text-indigo-500 bg-indigo-50">
    Poista rajaukset
  </button>
</div>