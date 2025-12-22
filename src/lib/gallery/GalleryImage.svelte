<script lang="ts">
  import type { PictureMetadata } from '../types';

  interface $$Props {
    picture: PictureMetadata;
    alt: string;
    priority?: boolean;
    onLoad?: () => void;
  }

  let { picture, alt, priority = false, onLoad }: $$Props = $props();
</script>

<div class="gallery-item">
  <picture>
    <enhanced:img
      class="gallery-image"
      src={picture.default}
      {alt}
      onload={onLoad}
      loading="eager"
      fetchpriority={priority ? 'high' : 'low'}
    />
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

  .gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .gallery-image:hover {
    transform: scale(1.05);
  }
</style>
