<script lang="ts">
  import { onMount } from 'svelte';

  let progress: number = 0;

  const updateProgress = (): void => {
    const winScroll: number = document.body.scrollTop || document.documentElement.scrollTop;
    const height: number =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (height === 0) {
      progress = 0;
    } else {
      progress = (winScroll / height) * 100;
    }
  };

  onMount(() => {
    window.addEventListener('scroll', updateProgress);
    // Initial check in case page is loaded mid-scroll
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  });
</script>

<div class="progress-container">
  <div class="progress-bar" style="width: {progress}%"></div>
</div>

<style>
  .progress-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px; /* Thin for mobile-first subtlety */
    background: transparent;
    z-index: 2000; /* Above the navbar */
    pointer-events: none;
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #8b7ba8, #d4a8d4);
    box-shadow: 0 0 8px rgba(139, 123, 168, 0.8);
    transition: width 0.1s ease-out;
  }

  @media (min-width: 768px) {
    .progress-container {
      height: 6px; /* Slightly thicker for desktop */
    }
  }
</style>
