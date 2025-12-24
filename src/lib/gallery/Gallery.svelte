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

  const photos: PictureMetadataTrackLoading[] = $state<PictureMetadataTrackLoading[]>(
    Object.entries(imageModules)
      .sort(([picturePathA], [picturePathB]) => picturePathA.localeCompare(picturePathB))
      .map(([_, pictureMetadata]) => ({
        ...pictureMetadata,
        isLoading: true,
      }))
  );

  let currentIndex = $state(0);
  let itemsToShow = $state(3);
  let intervalId: NodeJS.Timeout | undefined = undefined;
  let selectedPhoto = $state<PictureMetadataTrackLoading | null>(null);

  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 75;

  function handleTouchStart(e: TouchEvent): void {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e: TouchEvent): void {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }

  function handleSwipe(): void {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        manualNext();
      } else {
        manualPrev();
      }
    }
  }

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
      intervalId = undefined;
    }
  }

  function startAutoCycle(): void {
    if (intervalId) {
      return;
    }
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 4000);
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
  <h2>Photos</h2>

  <div class="gallery-viewport" ontouchstart={handleTouchStart} ontouchend={handleTouchEnd}>
    <button class="nav-arrow nav-prev" onclick={manualPrev} aria-label="Previous photos">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>

    <button class="nav-arrow nav-next" onclick={manualNext} aria-label="Next photos">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
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
              onError={() => {
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
  picture={selectedPhoto}
  onClose={() => {
    selectedPhoto = null;
    startAutoCycle();
  }}
  onPrev={() => {
    const currentIdx = photos.findIndex(
      (p) => p.default.img.src === selectedPhoto?.default.img.src
    );
    const prevIdx = (currentIdx - 1 + photos.length) % photos.length;
    selectedPhoto = photos[prevIdx];
  }}
  onNext={() => {
    const currentIdx = photos.findIndex(
      (p) => p.default.img.src === selectedPhoto?.default.img.src
    );
    const nextIdx = (currentIdx + 1) % photos.length;
    selectedPhoto = photos[nextIdx];
  }}
/>

<style>
  .gallery-viewport {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .gallery-viewport:hover .nav-arrow {
    opacity: 1;
  }

  .nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition:
      opacity 0.3s,
      background 0.2s;
  }

  .nav-arrow:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .nav-prev {
    left: 1rem;
  }

  .nav-next {
    right: 1rem;
  }

  @media (max-width: 1023px) {
    .nav-arrow {
      display: none;
    }
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
