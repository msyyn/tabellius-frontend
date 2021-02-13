<script>
  export let src
  export let alt

  import IntersectionObserver from './lazyload/IntersectionObserver.svelte'
  import LazyImage from './lazyload/LazyImage.svelte'
</script>

<IntersectionObserver once={true} let:intersecting={intersecting}>
  {#if intersecting}
    <LazyImage {$$props} />
  {/if}
</IntersectionObserver>