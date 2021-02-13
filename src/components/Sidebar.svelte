<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { fade, fly } from 'svelte/transition';
  import { clickOutside } from '../utils/clickOutside.js';

  import { SidebarOpen } from './SidebarToggle.js';
  import SidebarLink from './SidebarLink.svelte';

  let mobileUser = false;
  export let sidebarReady;

  onMount(() => {
    const userDevice = window.matchMedia("(max-width: 1024px)");
    const checkDeviceMedia = (media) => {
      if (media.matches) {
        mobileUser = true;
        $SidebarOpen = false;
      } else {
        mobileUser = false;
        $SidebarOpen = true;
      };
      sidebarReady = true;
    }
    checkDeviceMedia(userDevice);
    userDevice.addListener(checkDeviceMedia);
  });
  
  export let segment;

  function clickedOutside() {
    if (!mobileUser) return;
    $SidebarOpen = false;
  };
</script>

{#if sidebarReady && $SidebarOpen}
  <aside in:fly={{x: -40, duration: 360 }} out:fly={{x: -200, duration: 360}} use:clickOutside on:clickedOutside={clickedOutside} class="fixed lg:relative bg-white lg:flex h-screen overflow-hidden p-6 pr-12{ $SidebarOpen ? ' z-10' : ' hidden' }">

    <nav class="flex flex-col min-h-full">

      <h1 class="tracking-tight text-2xl select-none text-gray-700 font-bold text-upcase mr-0 mb-6">Tabellius</h1>

      <h6 class="block tracking-widest text-xs select-none text-gray-300 uppercase font-bold text-upcase mb-6">Postimerkit</h6>

      <SidebarLink title="Postimerkit" href="." segment={segment}>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </SidebarLink>
      <SidebarLink title="Taiteilijat" href="taiteilijat" segment={segment}>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </SidebarLink>
      <SidebarLink title="Painopaikat" href="painopaikat" segment={segment}>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </SidebarLink>

      <!--
      <h6 class="block tracking-widest text-xs select-none text-gray-300 uppercase font-bold text-upcase mb-6 mt-12">Postitoimipaikat</h6>

      <SidebarLink title="Karttanäkymä" href="kartta" segment={segment}>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      </SidebarLink>
      -->
      <div class="mt-auto">
        <span class="flex flex-row items-center text-gray-500 text-xs">
          Built with
          <span>
            <svg class="w-3 h-3 mx-1 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
            </svg>
          </span>
          by <a href="https://github.com/msyyn" class="ml-0.5 transition duration-300 ease-linear text-indigo-300 hover:text-indigo-500" title="View Mika Syynimaa on GitHub">Mika Syynimaa</a>
        </span>
        <span class="text-gray-500 text-xs">
          Like what you see?
          <a class="transition duration-300 ease-linear text-indigo-300 hover:text-indigo-500" target="blank" href="https://buymeacoffee.com/msyyn">Buy me a coffee</a>
        </span>
      </div>
    </nav>
  </aside>


  <div in:fade={{duration:360}} out:fade={{delay: 200, duration: 200}} class="lg:hidden w-screen h-screen absolute bg-indigo-900 bg-opacity-10"></div>
{/if}