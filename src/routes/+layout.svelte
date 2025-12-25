<script lang="ts">
  import favicon from '$lib/assets/dark-logo.jpg';
  import '../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
