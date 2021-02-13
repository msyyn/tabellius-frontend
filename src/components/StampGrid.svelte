<script>
  import { fade } from 'svelte/transition';
  import { handleize, generateHandle } from '../utils/handleize.js';
  export let page;
</script>
<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-0 py-12">
  {#each page.visibleData as stamp, i}
    <a in:fade={{delay: i * 40}} class="transition duration-300 ease-linear border items-center border-indigo-50 p-2 flex flex-row bg-white -mr-0.5 -mb-0.5 hover:z-10 hover:shadow-inner hover:border-indigo-100" href="postimerkit/{handleize(stamp.merkin_nimi)}{stamp.merkin_vari.length ? `?versio=${generateHandle(stamp)}` : ''}">
      
      <img class="h-24 w-24" src="{stamp.kuvan_url}" alt="{stamp.merkin_nimi}, {stamp.taiteilija} - {stamp.ilmestyspaiva}" loading="lazy"/>
    
      <div class="flex flex-col px-4 py-2 space-y-1">
        <h3 class="leading-tight text-sm font-medium tracking-thick">{stamp.merkin_nimi}</h3>
        {#if stamp.taiteilija}
          <h5 class="text-gray-500 text-xs border-indigo-50">{stamp.taiteilija}</h5>
        {/if}
        <h5 class="text-gray-500 text-xs pb-2 border-b border-indigo-50">Ilmestynyt {stamp.ilmestyspaiva.split('.').pop()}</h5>
        
        <small class="text-gray-500 tracking-thick text-xs">{stamp.nimellisarvo} {stamp.valuutta}a</small>
        <small class="text-gray-500 tracking-thick text-xs">Painettu {stamp.painosmaara > 0 ? `${stamp.painosmaara.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kpl` : 'tuntematon määrä'}</small>
      </div>
    </a>
  {/each}
</div>