<script lang="ts">
  import type { PictureMetadata } from '../../types';

  interface Props {
    picture: PictureMetadata;
    onclose: () => void;
  }

  let { picture, onclose }: Props = $props();

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onclose();
  };

  $effect(() => {
    // Prevent scrolling the background page while lightbox is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  });

  function handleBackdropKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onclose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="lightbox-backdrop"
  role="button"
  tabindex="0"
  aria-label="Close lightbox"
  onclick={onclose}
  onkeydown={handleBackdropKeydown}
>
  <div
    class="lightbox-content"
    role="dialog"
    aria-modal="true"
    onclick={(e) => e.stopPropagation()}
    onkeydown={(e) => e.key === 'Enter' && e.stopPropagation()}
  >
    <button class="close-btn" onclick={onclose} aria-label="Close">&times;</button>

    <picture>
      <source srcset={picture.sources.avif} type="image/avif" />
      <source srcset={picture.sources.webp} type="image/webp" />
      <img src={picture.img.src} alt="Full size view" loading="eager" />
    </picture>
  </div>
</div>

<style>
  .lightbox-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(8px);
    border: none;
    padding: 0;
    cursor: zoom-out; /* Visual cue that clicking exits */
    animation: fadeIn 0.2s ease-out;
  }

  .lightbox-content {
    max-width: 90%;
    max-height: 90%;
    position: relative;
    cursor: default;
  }

  img {
    max-width: 100%;
    max-height: 85vh;
    display: block;
    border-radius: 4px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    /* object-fit: contain; */
  }

  .close-btn {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 2.5rem;
    cursor: pointer;
    line-height: 1;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
