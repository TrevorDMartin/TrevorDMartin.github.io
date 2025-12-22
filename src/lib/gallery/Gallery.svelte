<script lang="ts">
  import type { PictureMetadata, PictureMetadataTrackLoading } from '../types';
  import GalleryImage from './GalleryImage.svelte';
  import Lightbox from './Lightbox.svelte';

  const imageModules = import.meta.glob<PictureMetadata>('../assets/gallery/*.{jpg,jpeg,png}', {
    eager: true,
    query: {
      enhanced: true,
    },
  });

  const photos: PictureMetadataTrackLoading[] = Object.entries(imageModules)
    .sort(([picturePathA], [picturePathB]) => picturePathA.localeCompare(picturePathB))
    .map(([_, pictureMetadata]) => ({
      ...pictureMetadata,
      isLoading: true,
    }));

  let currentIndex = $state(0);
  let itemsToShow = $state(3);
  let intervalId: number | null = $state(null);
  let selectedPhoto = $state<PictureMetadataTrackLoading | null>(null);

  const offset = $derived(currentIndex * (100 / itemsToShow));

  function getNextIndex(index: number, step: number): number {
    return (index + step) % photos.length;
  }

  function checkWindowLoaded(index: number): boolean {
    const windowPhotos = photos.slice(index, index + itemsToShow);

    if (windowPhotos.length < itemsToShow) {
      const remainingCount = itemsToShow - windowPhotos.length;
      windowPhotos.push(...photos.slice(0, remainingCount));
    }

    return windowPhotos.every((photo) => !photo.isLoading);
  }

  function nextSlide(): void {
    const nextIndex = getNextIndex(currentIndex, itemsToShow);

    if (checkWindowLoaded(nextIndex)) {
      currentIndex = nextIndex;
    } else {
      console.log('Waiting for photos to load...');
    }
  }

  function manualPrev(): void {
    restartAutoCycleTimeout();
    currentIndex = getNextIndex(currentIndex, -itemsToShow);
  }

  function manualNext(): void {
    restartAutoCycleTimeout();
    currentIndex = getNextIndex(currentIndex, itemsToShow);
  }

  function stopAutoCycle(): void {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function startAutoCycle(): void {
    intervalId = window.setInterval(nextSlide, 4000);
  }

  function restartAutoCycleTimeout(): void {
    stopAutoCycle();
    startAutoCycle();
  }

  function updateItemsToShow(): void {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width < 640) itemsToShow = 1;
    else if (width < 1024) itemsToShow = 2;
    else itemsToShow = 3;
  }

  $effect(() => {
    updateItemsToShow();
    if (!selectedPhoto) startAutoCycle();
    return () => {
      stopAutoCycle();
    };
  });
</script>

<svelte:window onresize={updateItemsToShow} />

<section id="photos">
  <div class="header-row">
    <h2>Photos</h2>
    <div class="controls">
      <button onclick={manualPrev} aria-label="Previous photos" title="Previous"> &larr; </button>
      <button onclick={manualNext} aria-label="Next photos" title="Next"> &rarr; </button>
    </div>
  </div>

  <div class="gallery-viewport">
    <div class="gallery-track" style:transform="translateX(-{offset}%)">
      {#each photos as photo, i (photo.default.img.src)}
        <div class="gallery-slide" style:flex="0 0 {100 / itemsToShow}%">
          <button
            class="image-trigger"
            onclick={() => {
              stopAutoCycle();
              selectedPhoto = photo;
            }}
            aria-label="Enlarge photo {i + 1}"
          >
            <GalleryImage
              picture={photo}
              alt="Band onstage {i + 1}"
              priority={i < itemsToShow}
              onLoad={() => {
                photos[i].isLoading = false;
              }}
            />
          </button>
        </div>
      {/each}
    </div>
  </div>
</section>

<Lightbox
  photo={selectedPhoto}
  onClose={() => {
    selectedPhoto = null;
    startAutoCycle();
  }}
/>

<style>
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .controls {
    display: flex;
    gap: 0.5rem;
  }

  .controls button {
    background: #333;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
  }

  .gallery-viewport {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .gallery-track {
    display: flex;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .gallery-slide {
    padding: 0 10px;
    box-sizing: border-box;
  }

  .image-trigger {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 100%;
    display: block;
  }
</style>
