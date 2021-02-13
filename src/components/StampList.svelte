<script>
  import { fade } from 'svelte/transition';
  import { handleize, generateHandle } from '../utils/handleize.js';
  import paginate from '../utils/paginate.js';
  export let page;

  // holds table sort state. initialized to reflect table sorted by id column ascending.
  let sortBy = { col: 'id', ascending: true };
  $: sort = (column) => {
    if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending
		} else {
			sortBy.col = column
			sortBy.ascending = true
		}
		
		// Modifier to sorting function for ascending or descending
		let sortModifier = (sortBy.ascending) ? 1 : -1;
		
		let sort = (a, b) => 
			(a[column] < b[column]) 
			? -1 * sortModifier 
			: (a[column] > b[column]) 
			? 1 * sortModifier 
			: 0;
    
    let sortedData = page.data.sort(sort);
    sortedData = paginate(sortedData, page.paginateBy, 1)
    //page.visibleData = paginate(sortedData, page.pageinateBy, 1);
    page.visibleData = sortedData;
  };
</script>
<p>
  sortBy: {sortBy.col} ({sortBy.ascending})
</p>
<table class="w-full table-fixed">
  <tr class="table-row-group">
    <th on:click={sort('kuva')} class="py-3 border-b-2 border-indigo-50 text-left text-sm leading-4 text-gray-500 tracking-wide">
      Kuva
    </th>
    <th on:click={sort('merkin_nimi')} class="cursor-pointer py-3 border-b-2 border-indigo-50 text-left text-sm leading-4 text-gray-500 tracking-wide">
      <span class="mr-2 float-left">Merkin nimi</span>
      {#if sortBy.col == 'merkin_nimi'}
        {#if !sortBy.ascending}
          <svg class="float-left mt-0.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
          </svg>
        {:else}
          <svg class="float-left mt-0.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
          </svg>
        {/if}
      {:else}
        <svg class="float-left w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      {/if}
    </th>
    <th on:click={sort('taiteilija')} class="cursor-pointer py-3 border-b-2 border-indigo-50 text-left text-sm leading-4 text-gray-500 tracking-wide">
      <span class="mr-2 float-left">Taiteilija</span>
      {#if sortBy.col == 'taiteilija'}
        {#if !sortBy.ascending}
          <svg class="float-left mt-0.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
          </svg>
        {:else}
          <svg class="float-left mt-0.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
          </svg>
        {/if}
      {:else}
        <svg class="float-left w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      {/if}
    </th>
    <th on:click={sort('ilmestynyt')} class="cursor-pointer py-3 border-b-2 border-indigo-50 text-left text-sm leading-4 text-gray-500 tracking-wide">
      <span class="mr-2 float-left">Ilmestynyt</span>
      {#if sortBy.col == 'ilmestynyt'}
        {#if !sortBy.ascending}
          <svg class="float-left mt-0.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
          </svg>
        {:else}
          <svg class="float-left mt-0.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
          </svg>
        {/if}
      {:else}
        <svg class="float-left w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      {/if}
    </th>
    <th on:click={sort('nimellisarvo')} class="cursor-pointer py-3 border-b-2 border-indigo-50 text-left text-sm leading-4 text-gray-500 tracking-wide">
      <span class="mr-2 float-left">Nimellisarvo</span>
      {#if sortBy.col == 'nimellisarvo'}
        {#if !sortBy.ascending}
          <svg class="float-left mt-0.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
          </svg>
        {:else}
          <svg class="float-left mt-0.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
          </svg>
        {/if}
      {:else}
        <svg class="float-left w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      {/if}
    </th>
    <th on:click={sort('painosmaara')} class="cursor-pointer py-3 border-b-2 border-indigo-50 text-left text-sm leading-4 text-gray-500 tracking-wide">
      <span class="mr-2 float-left">Painosmäärä</span>
      {#if sortBy.col == 'painosmaara'}
        {#if !sortBy.ascending}
          <svg class="float-left mt-0.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
          </svg>
        {:else}
          <svg class="float-left mt-0.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
          </svg>
        {/if}
      {:else}
        <svg class="float-left w-4 h-4" xml ns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      {/if}
    </th>
    <th class="py-3 border-b-2 border-indigo-50 text-left text-sm leading-4 text-gray-500 tracking-wide"></th>
  </tr>
  {#each page.visibleData as stamp}
    <tr>
      <td class="border-b border-indigo-50">
        <img class="h-16 w-16" src="{stamp.kuvan_url}" alt="{stamp.merkin_nimi}, {stamp.taiteilija} - {stamp.ilmestyspaiva}" loading="lazy"/>
      </td>
      <td class="pr-4 py-4 whitespace-no-wrap border-b border-indigo-50">
        <span class="block truncate text-sm leading-5 text-gray-800">{stamp.merkin_nimi}{stamp.merkin_vari.length > 0 ? ` (${stamp.merkin_vari})` : ''}</span>
      </td>
      {#if stamp.taiteilija}
        <td class="pr-4py-4 whitespace-no-wrap border-b border-indigo-50">
          <a href="/taiteilijat/{encodeURIComponent(stamp.taiteilija)}" class="block truncate text-sm leading-5 text-gray-800">{stamp.taiteilija}</a>
        </td>
      {:else}
        <td class="pr-4py-4 whitespace-no-wrap border-b border-indigo-50">
          <span class="block truncate text-sm leading-5 text-gray-800">Tuntematon</span>
        </td>
      {/if}
      <td class="pr-4py-4 whitespace-no-wrap border-b border-indigo-50">
        <span class="block truncate text-sm leading-5 text-gray-800">{stamp.ilmestyspaiva}</span>
      </td>
      <td class="pr-4 py-4 whitespace-no-wrap border-b border-indigo-50">
        <span class="block truncate text-sm leading-5 text-gray-800">{stamp.nimellisarvo} €</span>
      </td>
      <td class="pr-4py-4 whitespace-no-wrap border-b border-indigo-50">
        <span class="block truncate text-sm leading-5 text-gray-800">{stamp.painosmaara.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
      </td>
      <td class="pr-4py-4 whitespace-no-wrap border-b border-indigo-50">
        <a href="postimerkit/{handleize(stamp.merkin_nimi)}{stamp.merkin_vari.length ? `?versio=${generateHandle(stamp)}` : ''}" class="text-gray-400 bg-gray-100 hover:bg-indigo-50 focus:outline-none p-2 rounded-md">Avaa</a>
      </td>
    </tr>
  {/each}
</table>

<style>
  th:nth-child(1),
  td:nth-child(1){
    width:8%;
  }
  th:nth-child(2),
  td:nth-child(2){
    width:30%;
  }
  th:nth-child(3),
  td:nth-child(3){
    width:20%;
  }
  th:nth-child(4),
  th:nth-child(5),
  th:nth-child(6),
  td:nth-child(4),
  td:nth-child(5),
  td:nth-child(6) {
    width:15%;
  }
  th:nth-child(7),
  td:nth-child(7){
    width:5%;
  }
</style>