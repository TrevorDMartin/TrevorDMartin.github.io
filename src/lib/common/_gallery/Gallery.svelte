<script lang="ts">
  import type { PictureMetadata, PictureMetadataTrackLoading } from '$lib/types';
  import GalleryImage from './Picture.svelte';
  import Lightbox from './Lightbox.svelte';
  import NavArrow from './NavArrow.svelte';
  import HandleSwipe from '$lib/common/HandleSwipe.svelte';

  interface Props {
    imageModules: Record<string, PictureMetadata>;
  }

  let { imageModules }: Props = $props();

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

  const offset = $derived(currentIndex * (100 / itemsToShow));

  function getNextIndex(index: number, step: number): number {
    const next = index + step;

    if (index !== 0 && index >= photos.length - step) {
      return 0;
    }

    return next;
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

<HandleSwipe
  threshold={75}
  onSwipeLeft={manualPrev}
  onSwipeRight={manualNext}
  class="gallery-viewport"
>
  <NavArrow
    direction="PREV"
    onclick={manualPrev}
    ariaLabel="Previous photos"
    class="gallery-nav-arrow gallery-nav-prev"
  />
  <NavArrow
    direction="NEXT"
    onclick={manualNext}
    ariaLabel="Next photos"
    class="gallery-nav-arrow gallery-nav-next"
  />

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
</HandleSwipe>

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
  :global(.gallery-viewport) {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  :global(.gallery-viewport:hover) :global(.gallery-nav-arrow) {
    opacity: 1;
  }

  :global(.gallery-nav-arrow) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(0, 0, 0, 0.6);
    color: white;
  }

  :global(.gallery-nav-arrow:hover) {
    background: rgba(0, 0, 0, 0.8);
  }

  :global(.gallery-nav-prev) {
    left: 1rem;
  }

  :global(.gallery-nav-next) {
    right: 1rem;
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
