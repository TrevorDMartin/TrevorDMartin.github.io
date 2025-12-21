<script lang="ts">
  import GalleryImage from './GalleryImage.svelte';
  import type { PictureMetadata } from '../types';

  // Import all images from your assets folder with the picture query
  const imageModules = import.meta.glob<PictureMetadata>('../assets/gallery/*.{jpg,jpeg,png}', {
    eager: true,
    query: 'as=picture&format=avif;webp;jpg',
  });

  // Convert the object into an array of paths
  const photos = Object.values(imageModules);
</script>

<section id="photos">
  <h2>Photos</h2>
  <div class="gallery-container">
    <div class="gallery-scroll">
      {#each photos as photo, i}
        <div class="gallery-item">
          <GalleryImage picture={photo} alt="Band onstage {i + 1}" />
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .gallery-scroll {
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    scrollbar-color: #8b7ba8 #1a1a1a;
  }

  /* Hide scrollbar for Chrome/Safari if you want a cleaner look */
  .gallery-scroll::-webkit-scrollbar {
    height: 6px;
  }
  .gallery-scroll::-webkit-scrollbar-thumb {
    background: #8b7ba8;
    border-radius: 10px;
  }
</style>
