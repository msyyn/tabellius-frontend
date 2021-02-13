<script>
  export let page;
  import { goto } from '@sapper/app'; 
  function resetPage() {
    goto(page.currentPath, true, true);
    page.visibleData = paginate(page.data, page.paginateBy, page.currentPage);
    page.currentQuery = undefined;
  };
</script>
<div class="lg:w-1/3 my-16 mx-auto flex flex-col justify-center">
  <h2 class="text-xl tracking-wide font-bold mb-2 text-red-400">Hakutuloksia löytäneet, emme ☹</h2>
  <p class="text-lg mb-6 text-gray-500">Harmin lista :--(</p>
  <button title="Poista rajaukset" on:click={resetPage} class="transition duration-300 ease-linear p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 hover:bg-indigo-200 text-indigo-500 bg-indigo-50">
    Poista rajaukset
  </button>
</div>