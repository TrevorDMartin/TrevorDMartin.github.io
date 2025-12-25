<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    id: string;
    children: Snippet;
  }

  const { id, children }: Props = $props();
</script>

<section {id}>
  {@render children()}
</section>

<style>
  section {
    background: radial-gradient(#301934, #000000);
    box-shadow: 0px 0px 10px #301934;
  }
</style>
