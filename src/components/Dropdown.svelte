<script>
  import { fade } from 'svelte/transition';
  import { clickOutside } from '../utils/clickOutside.js';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let placeholder = '---';
  export let options;
  export let label;
  export let value;
  let dropdownOpen = false;

  /*
    preferred icon slot class 
    flex-shrink-0 h-6 w-6 rounded-full ml-3
  */

  const changeSelect = (val) => {
    dispatch('select', {value: val});
    dropdownOpen = false;
  }

  const toggleDropdown = () => { dropdownOpen = !dropdownOpen };
</script>
<div>
  {#if label}<span class="text-gray-300 text-xs uppercase tracking-wide block mb-2">{label}</span>{/if}

  <div class="relative lg:w-48">
    <button on:click|stopPropagation={toggleDropdown} use:clickOutside on:clickedOutside={() => dropdownOpen = false} type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" class="transition duration-300 ease-linear relative w-full bg-white border border-indigo-50 hover:border-indigo-100 rounded-md pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-50 focus:border-indigo-500 sm:text-sm">
      <span class="flex items-center">
        <slot name="icon"></slot>
        <span class="block truncate">{placeholder}</span>
      </span>
      <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    {#if dropdownOpen}
      <div in:fade={{duration: 150}} out:fade={{duration: 150}} class="absolute mt-1 w-full rounded-md bg-white shadow z-10">
        <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item" class="max-h-56 rounded-md py-1 text-base border-indigo-50 overflow-auto focus:outline-none sm:text-sm">
          {#each options as option,i}
            <li on:click={changeSelect(option)} id="{label}-listbox-item--{i}" role="option" class="text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 transition duration-300 ease-linear cursor-pointer select-none relative py-2 pl-3 pr-9">
              <div class="flex items-center">
                <span class="block font-normal truncate">
                  {option}
                </span>
              </div>
              {#if value == option}
                <span class="absolute inset-y-0 right-0 flex items-center pr-4">
                  <!-- Heroicon name: solid/check -->
                  <svg class="w-4 h-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/if}

  </div>
</div>