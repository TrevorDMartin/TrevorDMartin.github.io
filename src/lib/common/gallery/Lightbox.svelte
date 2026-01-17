<script lang="ts">
  import HandleSwipe from '$lib/common/HandleSwipe.svelte';
  import type { PictureMetadataTrackLoading } from '../../types';
  import NavArrow from './NavArrow.svelte';

  interface Props {
    picture: PictureMetadataTrackLoading | null;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
  }

  let { picture, onClose, onPrev, onNext }: Props = $props();

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') onClose();
    if (event.key === 'ArrowLeft') onPrev();
    if (event.key === 'ArrowRight') onNext();
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
  <HandleSwipe threshold={75} onSwipeLeft={onPrev} onSwipeRight={onNext}>
    <div class="modal-backdrop">
      <button class="close-button" onclick={onClose} aria-label="Close modal"> &times; </button>

      <NavArrow
        direction="PREV"
        onclick={onPrev}
        ariaLabel="Previous photo"
        class="lightbox-nav-arrow lightbox-nav-prev"
      />

      <button class="modal-content" aria-label="Photo" onclick={onClose}>
        <enhanced:img
          src={picture.default}
          sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
          class="full-image"
          alt={picture.default.img.src}
        />
      </button>

      <NavArrow
        direction="NEXT"
        onclick={onNext}
        ariaLabel="Next photo"
        class="lightbox-nav-arrow lightbox-nav-next"
      />
    </div>
  </HandleSwipe>
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
    box-sizing: border-box;
  }

  .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 95vw;
    max-width: 1200px;
    max-height: 90vh;
    border-radius: 8px;
    box-sizing: border-box;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0;
    cursor: pointer;
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
    background: transparent;
    color: white;
    font-size: 2.5rem;
    line-height: 1;
    padding: 5px 15px;
    border-radius: 50%;
    z-index: 1001;
    transition: background 0.2s;
    border: none;
    cursor: pointer;
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .close-button:active {
    background: rgba(0, 0, 0, 0.5);
  }

  :global(.lightbox-nav-arrow) {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1001;
    background: rgba(0, 0, 0, 0.6);
    color: white;
  }

  .modal-backdrop:hover :global(.nav-arrow) {
    opacity: 1;
  }

  :global(.lightbox-nav-arrow:hover) {
    background: rgba(255, 255, 255, 0.2);
  }

  :global(.lightbox-nav-prev) {
    left: 1rem;
  }

  :global(.lightbox-nav-next) {
    right: 1rem;
  }

  @media (min-width: 768px) {
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
