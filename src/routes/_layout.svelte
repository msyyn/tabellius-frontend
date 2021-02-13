<script>
  import Sidebar from '../components/Sidebar.svelte';
  export let sidebarReady;
  export let segment;
</script>

<div class="flex flex-row">
  <Sidebar bind:sidebarReady {segment}/>
  {#if sidebarReady}
    <main class="flex flex-1 flex-col items-stretch h-screen overflow-hidden overflow-y-auto p-6 text-gray-700 ">
      <slot></slot>
    </main>
  {/if}
</div>