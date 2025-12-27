<script>
  import YoutubeEmbed from "./YoutubeEmbed.svelte";
</script>

<div class="video-grid">
  <div class="aspect-ratio-box">
    <div class="content">
      <YoutubeEmbed videoId="ENi5SFBelGM" title="The Milestone" />
    </div>
  </div>
</div>

<style>
  .video-grid {
    display: grid;
    grid-template-columns: 1fr; /* Mobile: 1 column */
    gap: 1rem;
  }

  .aspect-ratio-box {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
    background: var(--card-bg);
    border: 2px solid var(--primary-purple);
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .video-grid {
      gap: 2rem;
    }
  }
</style>
