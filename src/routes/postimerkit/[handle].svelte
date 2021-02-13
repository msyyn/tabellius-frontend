<script context="module">
  // Need to manage handle functions here and in handleize.js
  // Couldn't figure out how to import stuff here..
  function handleize(str) {
    return str.toLowerCase().replace(/'/g, "").replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  export function generateHandle(stamp) {
    return handleize(`${stamp.merkin_vari}-${stamp.painosmaara}${stamp.nimellisarvo}-${stamp.ilmestyspaiva.split('.').pop()}`)
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
        merkin_vari: filteredSnapshot[currentVariantIndex].merkin_vari,
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
        merkin_vari: variant.merkin_vari,
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

  console.dir(page.path)
  
  let breadcrumb = page.path.replaceAll('/','').replace(page.params.handle,'');
  breadcrumb = breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1);

  console.dir(stamp);

  const viewVariant = (variant) => {
    page.query.versio = variant;
    let urlQuery = new URLSearchParams(page.query);
    goto(`${page.path}?${urlQuery}`, { replaceState: true });
  };
</script>

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

      <h1 class="mb-2 text-xl lg:text-4xl font-bold">{stamp.merkin_nimi}</h1>
      <h2 class="mb-6 flex flex-row items-center transition duration-300 ease-linear text-indigo-300 hover:text-indigo-500 text-lg lg:text-2xl">
        <a href="/taiteilijat/{handleize(stamp.taiteilija)}" title="Taiteilijan {stamp.taiteilija} koostesivu">{stamp.taiteilija}</a>
      </h2>
      <h3 class="mb-6 flex flex-row items-center text-gray-500 text-md">
        {stamp.currentVariant.ilmestyspaiva} - {stamp.currentVariant.kayton_paattyminen}
      </h3>
      {#if stamp.variants.length > 1}
        <h5 class="mt-10 font-medium text-lg flex flex-row items-center">Merkin väri <span class="text-xs text-gray-500"><span class="mx-2">&mdash;</span>{stamp.currentVariant.merkin_vari}</span></h5>
        <div class="flex flex-wrap mt-4">
          {#each stamp.variants as variant}
            <a class="{generateHandle(variant) == generateHandle(stamp.currentVariant) ? 'scale-110 ring-indigo-300' : 'scale-100 ring-indigo-50 hover:shadow-lg'} overflow-hidden relative transition duration-300 ease-linear shadow-none border-white border-2 transform hover:scale-110 ring-2 ring-offset-0 cursor-pointer ring-offset-gray-50 w-10 h-10 rounded-full mr-2 mb-2 lg:mr-4 lg:mb-4 bg-indigo-50"
                on:click|preventDefault={() => viewVariant(generateHandle(variant))} href="{page.path}?versio={generateHandle(variant)}" title="Näytä väri {variant.merkin_vari}">
              <div class="variant-swatch--img w-full h-full bg-center bg-no-repeat" style="background-image:url('{variant.kuvan_url}');"></div>
            </a>
          {/each}
        </div>
      {/if}
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
    filter: blur(15px) contrast(1.8) brightness(0.9);
    background-size: 800%;
  }
</style>