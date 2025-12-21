<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import GalleryImage from './GalleryImage.svelte';
  import type { PictureMetadata } from '../../types';

  const imageModules = import.meta.glob<PictureMetadata>('../../assets/gallery/*.{jpg,jpeg,png}', {
    eager: true,
    query: 'as=picture&format=avif;webp;jpg',
  });

  const photos: PictureMetadata[] = Object.values(imageModules);

  let currentIndex = $state(0);
  let itemsToShow = $state(3);
  let intervalId: number;

  function nextSlide(): void {
    // Loop back to start smoothly
    currentIndex = (currentIndex + 1) % photos.length;
  }

  function updateItemsToShow(): void {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width < 640) itemsToShow = 1;
    else if (width < 1024) itemsToShow = 2;
    else itemsToShow = 3;
  }

  onMount(() => {
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    intervalId = window.setInterval(nextSlide, 4000);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateItemsToShow);
      clearInterval(intervalId);
    }
  });

  // Calculate the percentage to shift the track
  const offset = $derived(currentIndex * (100 / itemsToShow));
</script>

<section id="photos">
  <h2>Photos</h2>
  <div class="gallery-viewport">
    <div class="gallery-track" style:transform="translateX(-{offset}%)">
      {#each photos as photo, i}
        <div class="gallery-slide" style:flex="0 0 {100 / itemsToShow}%">
          <GalleryImage picture={photo} alt="Band onstage {i + 1}" />
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .gallery-viewport {
    width: 100%;
    overflow: hidden; /* Hide the photos outside the view */
    position: relative;
  }

  .gallery-track {
    display: flex;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); /* Smooth hardware-accelerated movement */
    gap: 0; /* Gap is easier to manage inside the slide padding */
  }

  .gallery-slide {
    padding: 0 10px; /* This creates the visual gap */
    box-sizing: border-box;
  }
</style>
