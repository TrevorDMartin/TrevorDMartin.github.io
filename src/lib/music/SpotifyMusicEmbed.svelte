<div class="music-container">
  <iframe
    title="Spotify Music Player"
    data-testid="embed-iframe"
    src="https://open.spotify.com/embed/artist/31h1gRPCASV8ng1fhL7cYM?utm_source=generator&theme=0"
    frameBorder="0"
    allowfullscreen={true}
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  ></iframe>
</div>

<style>
  /* Mobile First Design */
  .music-container {
    width: 100%;
    height: auto;
  }

  .music-container iframe {
    width: 100%;
    height: 165px;
    border: 2px solid var(--light-purple);
    border-radius: 12px;
  }

  @media (min-width: 768px) {
    .music-container iframe {
      height: 450px;
    }
  }
</style>
