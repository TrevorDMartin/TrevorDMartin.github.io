<script lang="ts">
  import type { PictureMetadata } from '../types';

  interface Props {
    picture: PictureMetadata;
    alt: string;
    priority?: boolean;
    onLoad?: () => void;
    onError?: () => void;
  }

  let { picture, alt, priority = false, onLoad, onError }: Props = $props();
</script>

<div class="gallery-item">
  <enhanced:img
    src={picture.default}
    sizes="(min-width: 1024px) 400px, (min-width: 640px) 512px, 640px"
    class="gallery-image"
    {alt}
    onload={onLoad}
    onerror={onError}
    loading="eager"
    fetchpriority={priority ? 'high' : 'low'}
  />
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
