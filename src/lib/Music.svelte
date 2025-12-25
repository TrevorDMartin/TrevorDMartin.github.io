<script lang="ts">
  import BodySection from '$lib/BodySection.svelte';
</script>

<BodySection id="music">
  <h2>Music</h2>
  <div class="music-player">
    <p>Apple Music Embedded Player Placeholder</p>
  </div>
</BodySection>

<style>
  .music-player {
    background: #1a1a1a;
    border: 2px dashed #8b7ba8;
    padding: 2rem;
    text-align: center;
    color: #9988bb;
    font-style: italic;
  }

  @media (min-width: 768px) {
    .music-player {
      padding: 4rem;
    }
  }
</style>
