<script lang="ts">
  import type { PictureMetadataTrackLoading } from '../types';

  interface Props {
    picture: PictureMetadataTrackLoading | null;
    onClose: () => void;
  }

  let { picture, onClose }: Props = $props();

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') onClose();
  }

  $effect(() => {
    if (picture) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if picture}
  <button class="modal-backdrop" onclick={onClose}>
    <div class="close-button" aria-label="Close modal"> &times; </div>
    <div class="modal-content">
      <!-- src={picture.default.img.src + "?w=1280;640;400"} -->
      <enhanced:img
        src={picture.default}
        sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
        alt="Enlarged gallery photo: {picture.default.img.src}"
        class="full-image"
      />
    </div>
  </button>
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
    align-items: center;
    z-index: 1000;
    padding: 1rem;
    cursor: pointer;
  }

  .modal-content {
    position: relative;
    max-width: min(95vw, 1200px);
    max-height: 85vh;
    border-radius: 8px;
    box-sizing: border-box;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .full-image {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .close-button {
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 2.5rem;
    line-height: 1;
    padding: 5px 15px;
    border-radius: 50%;
    z-index: 1001;
    transition: background 0.2s;
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Desktop adjustments */
  @media (min-width: 1024px) {
    .modal-content {
      max-width: min(80vw, 1200px);
    }

    .close-button {
      top: 20px;
      right: 20px;
      font-size: 3rem;
    }
  }
</style>
