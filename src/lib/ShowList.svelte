<script lang="ts">
  import type { Show } from './types';
  export let upcoming: Show[];
  export let past: Show[];

  let showUpcoming: boolean = true;
</script>

<section id="shows">
  <h2>Shows</h2>
  <div class="toggle-group">
    <button class:active={showUpcoming} on:click={() => (showUpcoming = true)}> Upcoming </button>
    <button class:active={!showUpcoming} on:click={() => (showUpcoming = false)}> Past </button>
  </div>

  <div class="list">
    {#each showUpcoming ? upcoming : past as show (show.date)}
      <div class="show-card">
        <div class="info">
          <span class="date">{show.date}</span>
          <span class="venue">{show.venue}</span>
          <span class="loc">{show.location}</span>
        </div>
        {#if showUpcoming}
          <button class="tix">Tickets</button>
        {/if}
      </div>
    {/each}
  </div>
</section>

<style>
  .toggle-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  button {
    padding: 1rem; /* Large touch target */
    background: #1a1a1a;
    color: #c4b5e0;
    border: 1px solid #8b7ba8;
    border-radius: 4px;
    cursor: pointer;
  }

  button.active {
    background: #8b7ba8;
    color: white;
  }

  .show-card {
    padding: 1.5rem;
    background: #111;
    margin-bottom: 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .date {
    display: block;
    font-weight: bold;
    color: #b8a8d4;
  }
  .venue {
    display: block;
    font-size: 1.2rem;
  }

  .tix {
    background: transparent;
    border: 1px solid #b8a8d4;
    color: #b8a8d4;
    width: 100%;
  }

  @media (min-width: 768px) {
    .show-card {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .tix {
      width: auto;
      padding: 0.5rem 2rem;
    }
  }
</style>
