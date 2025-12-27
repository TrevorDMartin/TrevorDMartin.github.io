<script lang="ts">
  import ProgressBar from './common/ProgressBar.svelte';
  import type { NavLink } from './types';

  interface Props {
    links: NavLink[];
  }

  const { links }: Props = $props();
</script>

<ProgressBar />
<nav>
  <div class="nav-inner">
    <ul>
      {#each links as link (link.label)}
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
        <li><a href={'#' + link.id}>{link.label}</a></li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  nav {
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid var(--light-purple);
  }

  .nav-inner {
    overflow-x: auto;
    display: flex;
    justify-content: center;
    scrollbar-width: none;
  }

  .nav-inner::-webkit-scrollbar {
    display: none;
  }

  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0.7rem 1rem;
    gap: 1rem;
  }

  a {
    color: var(--light-purple);
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.75rem;
    white-space: nowrap;
    letter-spacing: 0.02rem;
    font-weight: 500;
  }

  /* Tablet and Desktop scaling */
  @media (min-width: 512px) {
    ul {
      gap: 2rem;
      padding: 1rem;
    }
    a {
      font-size: 1rem;
      letter-spacing: 0.05rem;
    }
  }

  @media (min-width: 768px) {
    ul {
      gap: 4rem;
      padding: 1.5rem 1.5rem;
    }
    a {
      font-size: 1.5rem;
      letter-spacing: 0.1rem;
    }
  }
</style>
