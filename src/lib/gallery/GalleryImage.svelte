<script lang="ts">
  import type { PictureMetadata } from '../../types';

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

<style>
  .gallery-item {
    width: 100%;
    aspect-ratio: 4 / 3; /* Use aspect-ratio to reserve space before the image loads */
    height: auto; /* Allow aspect-ratio to dictate height */
    background: #1a1a1a;
    border-radius: 8px;
    overflow: hidden;
    /* display: flex; */
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
