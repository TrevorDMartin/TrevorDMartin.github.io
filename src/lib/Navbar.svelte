<script lang="ts">
  import ProgressBar from './ProgressBar.svelte';
  import type { NavLink } from '../types';

  const links: NavLink[] = [
    { label: 'Photos', href: '#photos' },
    { label: 'Videos', href: '#videos' },
    { label: 'Music', href: '#music' },
    { label: 'Shows', href: '#shows' },
    { label: 'Press', href: '#press' },
  ];
</script>

<ProgressBar />
<nav>
  <div class="nav-inner">
    <ul>
      {#each links as link}
        <li><a href={link.href}>{link.label}</a></li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  nav {
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0; /* Sits immediately under the fixed progress bar */
    z-index: 1000;
    border-bottom: 1px solid #8b7ba8;
  }

  .nav-inner {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0.8rem 1rem;
    gap: 1.5rem;
  }

  a {
    color: #c4b5e0;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  @media (min-width: 768px) {
    ul {
      justify-content: center;
      padding: 1rem;
    }
    a {
      font-size: 1rem;
    }
  }
</style>
