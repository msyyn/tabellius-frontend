<script>
  import { fade } from 'svelte/transition';
  import { handleize, generateHandle } from '../utils/handleize.js';

  import StampGrid from './StampGrid.svelte';

  export let page;
  export let limit = 6;
</script>

{#each page.visibleData as artist, i}

  <div class="pt-2 pb-4 flex flex-col">
    <h1 class="transition duration-300 ease-linear text-lg font-bold text-gray-700 hover:text-indigo-500"><a rel="prefetch" href="/taiteilijat/{handleize(artist.nimi)}" title="Taiteilijan {artist.nimi} koostesivu">{artist.nimi}</a></h1>
    <div class="flex flex-row items-center justify-between">
      <span class="text-gray-500 text-sm">Näytetään { artist.stamps.length > limit ? limit : artist.stamps.length } / {artist.stamps.length} postimerkkiä</span>
      {#if artist.stamps.length > limit}
        <a rel="prefetch" href="/taiteilijat/{handleize(artist.nimi)}" title="Taiteilijan {artist.nimi} koostesivu" class="transition duration-300 ease-linear py-1 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 flex flex-row items-center hover:bg-indigo-200 text-indigo-500 bg-indigo-50">
          <span class="text-sm">Näytä kaikki</span>
          <svg class="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
      {/if}
    </div>
  </div>
  
  <div class="grid { !page.currentHandle ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6 pb-8 lg:pb-12' : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4 pb-4  '} grid-flow-row gap-0">
    {#each artist.stamps.slice(0,limit) as stamp, i}
      <a in:fade class="transition duration-300 ease-linear border items-center border-indigo-50 p-2 flex flex-col bg-white -mr-0.5 -mb-0.5 hover:z-10 hover:shadow-inner hover:border-indigo-100" href="postimerkit/{handleize(stamp.merkin_nimi)}{stamp.merkin_vari.length ? `?versio=${generateHandle(stamp)}` : ''}">
          
        <img class="mt-2 mb-2 h-24 w-24" src="{stamp.kuvan_url}" alt="{stamp.merkin_nimi}, {stamp.taiteilija} - {stamp.ilmestyspaiva}" loading="lazy"/>
      
        <div class="flex flex-col px-4 py-2  mt-auto space-y-1">
          <h3 class="leading-tight text-sm font-medium tracking-thick">{stamp.merkin_nimi}</h3>
          <h5 class="text-gray-500 text-xs pb-2 border-indigo-50">Ilmestynyt {stamp.ilmestyspaiva.split('.').pop()}</h5>
        </div>
      </a>
    {/each}
  </div>
{/each}