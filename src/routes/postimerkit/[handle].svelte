<script context="module">
  // Need to manage handle functions here and in handleize.js
  // Couldn't figure out how to import stuff here..
  function handleize(str) {
    return str.toLowerCase().replace(/'/g, "").replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  export function generateHandle(stamp) {
    return handleize(`${stamp.merkin_vari || 'monivärinen'}-${stamp.ilmestyspaiva.split('.').pop()}${stamp.kuvan_url.split('/').pop().split('.').shift()}`);
  };
  export async function preload(page) {
    const response = await this.fetch('_stamps.json');
    const snapshot = await response.json();
    const filteredSnapshot = snapshot.filter(a => handleize(a.merkin_nimi) == page.params.handle);
    
    let currentVariantIndex = 0;
    // handle uses painosmaara & nimellisarvo to make it more uniq. having only color causes issues.
    let currentVariantHandle = page.query.versio ? page.query.versio : generateHandle(filteredSnapshot[0]);
    currentVariantIndex = filteredSnapshot.findIndex(s => generateHandle(s) == currentVariantHandle);

    let stamp = {
      asiasanat: filteredSnapshot[currentVariantIndex].asiasanat.split(' '),
      merkin_nimi: filteredSnapshot[currentVariantIndex].merkin_nimi,
      painopaikka: filteredSnapshot[currentVariantIndex].painopaikka,
      taiteilija: filteredSnapshot[currentVariantIndex].taiteilija.length > 1 ? filteredSnapshot[currentVariantIndex].taiteilija : 'Tuntematon',
      valuutta: filteredSnapshot[currentVariantIndex].valuutta,
      kuvan_url: filteredSnapshot[currentVariantIndex].kuvan_url,
      currentVariant: {
        merkin_vari: filteredSnapshot[currentVariantIndex].merkin_vari ? filteredSnapshot[currentVariantIndex].merkin_vari : `monivärinen`,
        painosmaara: filteredSnapshot[currentVariantIndex].painosmaara,
        nimellisarvo: filteredSnapshot[currentVariantIndex].nimellisarvo,
        kayton_paattyminen: filteredSnapshot[currentVariantIndex].kayton_paattyminen,
        ilmestyspaiva: filteredSnapshot[currentVariantIndex].ilmestyspaiva,
        kuvan_url: filteredSnapshot[currentVariantIndex].kuvan_url
      },
      variants: []
    };

    filteredSnapshot.forEach((variant,i) => {
      stamp.variants.push({
        merkin_vari: variant.merkin_vari ? variant.merkin_vari : `monivärinen`,
        painosmaara: variant.painosmaara,
        nimellisarvo: variant.nimellisarvo,
        kayton_paattyminen: variant.kayton_paattyminen,
        ilmestyspaiva: variant.ilmestyspaiva,
        kuvan_url: variant.kuvan_url
      })
    });

    return { stamp, page };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import Toolbar from '../../components/Toolbar.svelte';
  export let stamp;
  export let page;

  let breadcrumb = page.path.replaceAll('/','').replace(page.params.handle,'');
  breadcrumb = breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1);

  const viewVariant = (variant) => {
    page.query.versio = variant;
    let urlQuery = new URLSearchParams(page.query);
    goto(`${page.path}?${urlQuery}`, { replaceState: true });
  };
</script>

<svelte:head>
  <title>{stamp.merkin_nimi} | Tabellius - Suomalaiset postimerkit</title>
  <meta name="description" content="{stamp.merkin_nimi} on ilmestynyt vuonna {stamp.currentVariant.ilmestyspaiva}.{stamp.taiteilija != 'Tuntematon' ? ` Taiteilijana ${stamp.taiteilija}.` : ''}{stamp.variants.length > 1 ? ` Postimerkistä on ${stamp.variants.length} muunnelmaa.` : ''} Aineisto perustuu Postimuseon avoimeen dataan.">
</svelte:head>

<Toolbar/>
<div class="flex flex-wrap justify-center items-start w-full bg-gray-50 rounded-md lg:rounded-2xl">
  <div class="px-6 py-6 lg:px-8 lg:py-36 max-w-4xl w-full min-h-full flex flex-col-reverse lg:flex-row">
    <div class="lg:w-2/3 lg:pr-16">

      <!-- Breadcrumb desktop -->
      <div class="hidden lg:block lg:mb-12 text-sm tracking-wide">
        <a class="transition duration-300 ease-linear font-bold text-indigo-300 hover:text-indigo-500" href="{page.path.replace(page.params.handle,'').replace('postimerkit','.')}" title="{breadcrumb}">{breadcrumb}</a>
        <span class="text-gray-400 text-xs">/</span>
        <span class="text-gray-400 text-xs">{stamp.merkin_nimi}</span>
      </div>

      <h1 class="mb-6 text-xl lg:text-4xl font-bold">{stamp.merkin_nimi}</h1>

      <h3 class="mb-6 flex flex-row items-center text-gray-500 text-md">
        Käytössä {stamp.currentVariant.ilmestyspaiva} - {stamp.currentVariant.kayton_paattyminen}
      </h3>

      <!-- Värimuunnelmat -->
      {#if stamp.variants.length > 1}
        <h5 class="font-medium text-lg flex flex-row items-center">Värimuunnelmat <span class="text-xs text-gray-500"><span class="mx-2">&mdash;</span>{stamp.currentVariant.merkin_vari}</span></h5>
        <div class="flex flex-wrap mt-4">
          {#each stamp.variants as variant}
            <a class="{generateHandle(variant) == generateHandle(stamp.currentVariant) ? 'scale-110 ring-indigo-300' : 'scale-100 ring-indigo-50 hover:shadow-lg'} overflow-hidden relative transition duration-300 ease-linear shadow-none border-white border-2 transform hover:scale-110 ring-2 ring-offset-0 cursor-pointer ring-offset-gray-50 w-10 h-10 rounded-full mr-2 mb-2 lg:mr-4 lg:mb-4 bg-indigo-50"
                on:click|preventDefault={() => viewVariant(generateHandle(variant))} href="{page.path}?versio={generateHandle(variant)}" title="Näytä väri {variant.merkin_vari}">
              <div class="variant-swatch--img w-full h-full bg-center bg-no-repeat" style="background-image:url('{variant.kuvan_url}');"></div>
            </a>
          {/each}
        </div>
      {/if}

      <!-- Perustiedot, ikonit -->
      <div class="mt-6 flex flex-wrap flex-col md:flex-row lg:flex-row">
        <div class="md:w-1/2 lg:w-1/2 mb-4 transition duration-300 ease-linear bg-transparent hover:text-indigo-400 text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 flex items-center relative">
          <div class="w-10 h-10 p-2 rounded-lg text-indigo-300 bg-indigo-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <a title="Taiteilijan {stamp.taiteilija} koostesivu" href="/taiteilijat/{handleize(stamp.taiteilija)}" class="ml-4">
            <span class="text-gray-500 text-xs uppercase tracking-wide block">Taiteilija</span>
            <span class="font-medium tracking-wide text-sm block">{stamp.taiteilija}</span>
          </a>
        </div>

        <div class="md:w-1/2 lg:w-1/2 mb-4 transition duration-300 ease-linear bg-transparent hover:text-indigo-400 text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 flex items-center relative">
          <div class="w-10 h-10 p-2 rounded-lg text-indigo-300 bg-indigo-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <a title="Painopaikan {stamp.painopaikka} koostesivu" href="/painopaikat/{handleize(stamp.painopaikka)}" class="ml-4">
            <span class="text-gray-500 text-xs uppercase tracking-wide block">Painopaikka</span>
            <span class="font-medium tracking-wide text-sm block">{stamp.painopaikka}</span>
          </a>
        </div>

        <div class="md:w-1/2 lg:w-1/2 mb-4 transition duration-300 ease-linear bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 flex items-center relative">
          <div class="w-10 h-10 p-2 rounded-lg text-indigo-300 bg-indigo-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="ml-4">
            <span class="text-gray-500 text-xs uppercase tracking-wide block">Painosmäärä</span>
            <span class="font-medium tracking-wide text-sm block">{stamp.currentVariant.painosmaara ? `${stamp.currentVariant.painosmaara.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} kpl` : 'Ei tiedossa'}</span>
          </span>
        </div>

        {#if stamp.currentVariant.nimellisarvo}
          <div class="md:w-1/2 lg:w-1/2 mb-4 transition duration-300 ease-linear bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 flex items-center relative">
            <div class="w-10 h-10 p-2 rounded-lg text-indigo-300 bg-indigo-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="ml-4">
              <span class="text-gray-500 text-xs uppercase tracking-wide block">Nimellisarvo</span>
              <span class="font-medium tracking-wide text-sm block">{stamp.currentVariant.nimellisarvo}{stamp.valuutta ? ` ${stamp.valuutta}` : ' (valuutta ei tiedossa)'}</span>
            </span>
          </div>
        {/if}
      </div>

      <div class="mt-6 pt-6 border-t border-gray-200 flex flex-row flex-wrap lg:max-w-md">
        {#each stamp.asiasanat as tag}
          <a href="/?search={tag}" title="Näytä lisää postimerkkejä termillä '{tag}'" class="transition duration-300 ease-linear text-xs font-bold tracking-wide p-2 mr-2 mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 hover:bg-indigo-200 text-indigo-500 bg-indigo-50">{tag}</a>
        {/each}
      </div>
    </div>
    <div class="lg:w-1/3 lg:mt-12">
      <!-- Breadcrumb desmobilektop -->
      <div class="block lg:hidden mb-6 text-sm tracking-wide">
        <a class="transition duration-300 ease-linear font-bold text-indigo-300 hover:text-indigo-500" href="{page.path.replace(page.params.handle,'').replace('postimerkit','.')}" title="{breadcrumb}">{breadcrumb}</a>
        <span class="text-gray-400 text-xs">/</span>
        <span class="text-gray-400 text-xs">{stamp.merkin_nimi}</span>
      </div>

      <a class="mb-6 lg:mb-0 block" href="{stamp.currentVariant.kuvan_url}" target="_blank">
        <img class="bg-white p-2 w-full shadow-sm rounded" src="{stamp.currentVariant.kuvan_url}" alt="{stamp.merkin_nimi}, {stamp.taiteilija} - {stamp.ilmestyspaiva}"/>
      </a>
    </div>
  </div>
</div>

<style>
  .variant-swatch--img {
    filter: blur(10px) contrast(0.8) brightness(1.15);
  }
</style>