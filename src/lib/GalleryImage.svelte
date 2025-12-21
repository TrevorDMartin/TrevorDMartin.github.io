<script lang="ts">
  import type { PictureMetadata } from '../types';

  interface $$Props {
    picture: PictureMetadata;
    alt: string;
  }
  let { picture, alt }: $$Props = $props();
</script>

<div class="gallery-item">
  <picture>
    <source srcset={picture.sources.avif} type="image/avif" />
    <source srcset={picture.sources.webp} type="image/webp" />
    <img src={picture.img.src} width={picture.img.w} height={picture.img.h} {alt} loading="lazy" />
  </picture>
</div>

<!-- <style>
  .gallery-item img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
</style> -->
<style>
  .gallery-item {
    flex: 0 0 400px;
    scroll-snap-align: start;
    background: #1a1a1a;
    border-radius: 8px;
    overflow: hidden;
    height: 300px; /* Fixed height for consistency */
    display: flex;
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .gallery-item img:hover {
    transform: scale(1.05);
  }
</style>
