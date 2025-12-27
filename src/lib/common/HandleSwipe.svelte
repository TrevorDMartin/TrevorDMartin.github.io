<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    threshold?: number;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    class?: string;
  }

  const {
    children,
    threshold = 100,
    onSwipeLeft,
    onSwipeRight,
    class: classValue,
  }: Props = $props();

  let touchStartX = 0;
  let touchEndX = 0;

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e: TouchEvent): void {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }

  function handleSwipe(): void {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }
  }
</script>

<div ontouchstart={handleTouchStart} ontouchend={handleTouchEnd} class={classValue}>
  {@render children()}
</div>
