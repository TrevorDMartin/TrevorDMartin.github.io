<section id="videos">
  <h2>Videos</h2>
  <div class="video-grid">
    <div class="aspect-ratio-box">
      <div class="content">Music Video</div>
    </div>
    <div class="aspect-ratio-box">
      <div class="content">Live at The Bowery</div>
    </div>
  </div>
</section>

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
    background: #1a1a1a;
    border: 2px dashed #8b7ba8;
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
      grid-template-columns: 1fr 1fr; /* Desktop: 2 columns */
      gap: 2rem;
    }
  }
</style>
