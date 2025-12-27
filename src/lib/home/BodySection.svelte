<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { NavLink } from '../types';

  interface Props extends NavLink {
    children: Snippet;
  }

  const { label: title, id, children }: Props = $props();
</script>

<section {id}>
  <h2>{title}</h2>
  {@render children()}
</section>

<style>
  section {
    padding: var(--padding-mobile);
    background: radial-gradient(#301934, #000000);
    box-shadow: 0px 0px 10px #301934;
    background: var(--surface);
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--card-bg);
  }

  h2 {
    font-size: 1.5rem;
    color: var(--light-purple);
    margin-top: 0;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    section {
      padding: 1rem var(--padding-desktop) var(--padding-desktop);
      margin: 0rem auto 4rem auto;
      max-width: 1100px;
      border-radius: 12px;
    }
    h2 {
      font-size: 2.2rem;
    }
  }
</style>
