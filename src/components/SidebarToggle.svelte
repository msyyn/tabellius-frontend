<script>
  import SidebarOpen from './SidebarToggle.js';

  function toggleSidebar() {
    SidebarOpen.set(!$SidebarOpen)
  }
</script>

<button class="lg:hidden transition duration-300 ease-linear p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 {$SidebarOpen ? 'text-white bg-indigo-500 shadow-inner' : 'text-indigo-500 bg-indigo-50'}" on:click={toggleSidebar}>
  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>