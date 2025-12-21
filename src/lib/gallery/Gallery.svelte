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
  let intervalId: number;

  function nextSlide(): void {
    //   currentIndex = (currentIndex + 1) % photos.length;

    // 1. Identify the photos that will be shown in the next window
    const nextWindowPhotos = photos.slice(currentIndex, currentIndex + itemsToShow);

    // 1b. If the window wraps around the end of the array, get the remaining items from the start
    if (nextWindowPhotos.length < itemsToShow) {
      const remainingCount = itemsToShow - nextWindowPhotos.length;
      nextWindowPhotos.push(...photos.slice(0, remainingCount));
    }

    // 2. Check if all photos in that window are loaded
    const allLoaded = nextWindowPhotos.every((photo) => !photo.isLoading);

    // 3. Only update the index if the condition is met
    if (allLoaded) {
      currentIndex = (currentIndex + itemsToShow) % photos.length;
    } else {
      console.log('Waiting for photos to load...');
    }
  }

  // Calculate the percentage to shift the track
  const offset = $derived(currentIndex * (100 / itemsToShow));

  function updateItemsToShow(): void {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width < 640) itemsToShow = 1;
    else if (width < 1024) itemsToShow = 2;
    else itemsToShow = 3;
  }

  $effect(() => {
    updateItemsToShow();
    intervalId = window.setInterval(nextSlide, 6000);
    return () => {
      clearInterval(intervalId);
    };
  });
</script>

<svelte:window onresize={updateItemsToShow} />
<section id="photos">
  <h2>Photos</h2>
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
