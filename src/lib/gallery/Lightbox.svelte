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

  // Handle scroll lock and keyboard events via effect
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
  <div
    class="modal-backdrop"
    role="button"
    tabindex="-1"
    onkeydown={(e) => e.key === 'Enter' && onClose()}
  >
    <div class="modal-content" role="presentation">
      <button class="close-button" onclick={onClose} aria-label="Close modal"> &times; </button>
      <button class="full-image" onclick={onClose}>
      <img
        src={photo.default.img.src}
        alt="Enlarged gallery photo: {photo.default.img.src}"
      />
      </button>
    </div>
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
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal-content {
    position: relative;
    max-width: 95vw;
    max-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .full-image {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  .close-button {
    position: absolute;
    top: -50px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 3rem;
    cursor: pointer;
    line-height: 1;
    padding: 10px;
  }

  /* Desktop adjustments */
  @media (min-width: 1024px) {
    .close-button {
      top: -20px;
      right: -60px;
    }
    .modal-content {
      max-width: 85vw;
    }
  }
</style>
