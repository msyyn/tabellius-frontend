<script>
  import { goto } from '@sapper/app';
  export let segment;
  export let title;
  export let href;
  export let ping;
</script>

<a on:click|preventDefault={() => goto(href)} class="transition duration-300 ease-linear {segment === href || (segment === undefined && href == '.') ? 'bg-indigo-50 hover:bg-indigo-50 text-indigo-500' : 'bg-transparent hover:bg-gray-50 text-indigo-300'} focus:outline-none focus:ring-2 focus:ring-indigo-100 p-2 pr-6 rounded-md flex items-center mb-2 relative" rel=prefetch aria-current="{segment === href ? 'page' : undefined}" href={href}>
  {#if ping && segment !== href}
    <span class="-right-0.5 top-0.5 flex h-3 w-3 r-0 absolute">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
    </span>
  {/if}
  <div class="w-10 h-10 p-2 rounded-lg {segment === href || (segment === undefined && href == '.') ? 'text-white bg-indigo-500 shadow-sm' : 'text-indigo-300 bg-indigo-50'}">
    <slot name="icon"></slot>
  </div>
  <span class="ml-4 font-medium tracking-wide text-sm">{title}</span>
</a>