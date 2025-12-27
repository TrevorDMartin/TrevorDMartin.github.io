<script lang="ts">
  import type { PressItem } from './types';

  const quotes: PressItem[] = [
    {
      outlet: 'Indie Music Magazine',
      quote: 'Cassettiquette delivers a fresh take on indie rock.',
    },
    { outlet: 'Sound & Vision Blog', quote: 'A band that understands the power of melody.' },
  ];
</script>

{#each quotes as item (item.outlet)}
  <div class="press-item">
    <div class="press-outlet">{item.outlet}</div>
    <div class="press-quote">"{item.quote}"</div>
  </div>
{/each}

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
