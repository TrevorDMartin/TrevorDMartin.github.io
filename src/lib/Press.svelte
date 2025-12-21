<script lang="ts">
  import type { PressItem } from '../types';
  export let quotes: PressItem[];
</script>

<section id="press">
  <h2>Press & Reviews</h2>
  {#each quotes as item}
    <div class="press-item">
      <div class="press-outlet">{item.outlet}</div>
      <div class="press-quote">"{item.quote}"</div>
    </div>
  {/each}
</section>

<style>
  .press-item {
    background: #1a1a1a;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  .press-outlet {
    color: #b8a8d4;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
  .press-quote {
    color: #d0d0d0;
    font-style: italic;
  }
</style>
