<script>
  export let value = '';
  export let isToggled = false;
  export let isDisabled = false;
  export let padding = 'p-3';
  export let margin = 'm-0';
</script>

<button type="button" on:click class="{$$props.class} {margin} {padding} {isDisabled ? 'text-gray-200 bg-gray-50 cursor-not-allowed' : 'text-gray-400 hover:text-indigo-500 bg-gray-50 hover:bg-indigo-50'} {isToggled ? 'text-indigo-500 bg-indigo-50' : ''} hover:text-indigo-500 hover:bg-indigo-50 transition duration-300 ease-linear focus:outline-none rounded-md flex flex-row items-center flex-1 flex-grow-0 "> 
  <slot name="icon"></slot>
  <slot></slot>
  {#if value}<span>{value}</span>{/if}
</button>