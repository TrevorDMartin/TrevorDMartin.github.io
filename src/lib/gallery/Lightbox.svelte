<script lang="ts">
  import type { PictureMetadataTrackLoading } from '../types';

  interface Props {
    photo: PictureMetadataTrackLoading | null;
    onClose: () => void;
  }

  let { photo, onClose }: Props = $props();

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') onClose();
  }

  $effect(() => {
    if (photo) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if photo}
  <div class="modal-backdrop">
    <button class="close-button" onclick={onClose} aria-label="Close modal"> &times; </button>

    <button class="modal-content" onclick={onClose}>
      <img
        src={photo.default.img.src}
        alt="Enlarged gallery photo: {photo.default.img.src}"
        class="full-image"
      />
    </button>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    z-index: 1000;
    padding: 60px 1rem 2rem 1rem;
    pointer-events: none;
  }

  .modal-content {
    position: relative;
    width: 100%;
    max-width: 1200px; /* Capping the maximum width of the image */
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  .full-image {
    width: 100%;
    height: auto;
    max-width: 1200px; /* Ensures consistent max size */
    display: block;
    border-radius: 4px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }

  .close-button {
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 2.5rem;
    cursor: pointer;
    line-height: 1;
    padding: 5px 15px;
    border-radius: 50%;
    z-index: 1001;
    transition: background 0.2s;
    cursor: pointer;
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Desktop adjustments */
  @media (min-width: 1024px) {
    .modal-backdrop {
      padding-top: 40px;
      align-items: center; /* Center vertically on desktop if image fits */
    }

    .close-button {
      top: 20px;
      right: 20px;
      font-size: 3rem;
    }
  }
</style>
