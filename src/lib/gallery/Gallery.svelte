<script lang="ts">
  import GalleryImage from './GalleryImage.svelte';
  import type { PictureMetadata, PictureMetadataTrackLoading } from '../../types';

  const imageModules = import.meta.glob<PictureMetadata>('../../assets/gallery/*.{jpg,jpeg,png}', {
    eager: true,
    query: 'as=picture&format=avif;webp;jpg&width=400;800',
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
    intervalId = window.setInterval(nextSlide, 6000);
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
    startAutoCycle();
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
      <button onclick={manualPrev} aria-label="Previous photos" title="Previous">
        &larr;
      </button>
      <button onclick={manualNext} aria-label="Next photos" title="Next">
        &rarr;
      </button>
    </div>
  </div>

  <div class="gallery-viewport">
    <div class="gallery-track" style:transform="translateX(-{offset}%)">
      {#each photos as photo, i}
        <div class="gallery-slide" style:flex="0 0 {100 / itemsToShow}%">
          <GalleryImage
            picture={photo}
            alt="Band onstage {i + 1}"
            priority={i < itemsToShow}
            onLoad={() => {
              photos[i].isLoading = false;
            }}
          />
        </div>
      {/each}
    </div>
  </div>
</section>

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
    transition: background 0.2s;
  }

  .controls button:hover {
    background: #555;
  }

  .gallery-viewport {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .gallery-track {
    display: flex;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    gap: 0;
  }

  .gallery-slide {
    padding: 0 10px;
    box-sizing: border-box;
  }
</style>