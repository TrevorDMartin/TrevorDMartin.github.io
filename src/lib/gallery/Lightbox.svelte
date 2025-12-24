<script lang="ts">
  import type { PictureMetadataTrackLoading } from '../types';

  interface Props {
    picture: PictureMetadataTrackLoading | null;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
  }

  let { picture, onClose, onPrev, onNext }: Props = $props();

  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 50;

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
        onNext();
      } else {
        onPrev();
      }
    }
  }

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
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-backdrop" ontouchstart={handleTouchStart} ontouchend={handleTouchEnd}>
    <button class="close-button" onclick={onClose} aria-label="Close modal"> &times; </button>

    <button
      class="nav-arrow nav-prev"
      onclick={(e) => {
        e.stopPropagation();
        onPrev();
      }}
      aria-label="Previous photo"
    >
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

    <button class="modal-content" aria-label="Photo" onclick={onClose}>
      <enhanced:img
        src={picture.default}
        sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
        class="full-image"
        alt={picture.default.img.src}
      />
    </button>

    <button
      class="nav-arrow nav-next"
      onclick={(e) => {
        e.stopPropagation();
        onNext();
      }}
      aria-label="Next photo"
    >
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

  .nav-arrow {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1001;
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

  .modal-backdrop:hover .nav-arrow {
    opacity: 1;
  }

  .nav-arrow:hover {
    background: rgba(255, 255, 255, 0.2);
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
