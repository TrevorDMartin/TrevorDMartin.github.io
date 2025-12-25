<header>
  <video
  autoplay
  muted
  loop
  playsinline
  preload="metadata"
  poster="/video/moving-robot-header.jpg"
  class="header-video"
>

  <!-- ===== MOBILE (≤ 768px) ===== -->
  <source
    src="/video/moving-robot-header.720.av1.mp4"
    type="video/mp4; codecs=av01"
    media="(max-width: 768px)"
  >
  <source
    src="/video/moving-robot-header.720.webm"
    type="video/webm"
    media="(max-width: 768px)"
  >
  <source
    src="/video/moving-robot-header.720.mp4"
    type="video/mp4"
    media="(max-width: 768px)"
  >

  <!-- ===== DESKTOP (≥ 769px) ===== -->
  <source
    src="/video/moving-robot-header.1280.av1.mp4"
    type="video/mp4; codecs=av01"
    media="(min-width: 769px)"
  >
  <source
    src="/video/moving-robot-header.1280.webm"
    type="video/webm"
    media="(min-width: 769px)"
  >
  <source
    src="/video/moving-robot-header.1280.mp4"
    type="video/mp4"
    media="(min-width: 769px)"
  >

  Your browser does not support the video tag.
</video>
</header>

<style>

  .header-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  @media (min-width: 768px) {
    header {
      padding: 4rem 1rem;
    }
  }

  @media (min-width: 1024px) {
    .header-video {
      max-height: 80vh;
    }
  }
</style>
