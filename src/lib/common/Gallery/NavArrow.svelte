<script lang="ts">
  type NavArrowDirection = 'PREV' | 'NEXT';
  const NAV_PATH_MAP: Record<NavArrowDirection, string> = {
    PREV: 'm15 18-6-6 6-6',
    NEXT: 'm9 18 6-6-6-6',
  };

  interface Props {
    direction: NavArrowDirection;
    onclick: (e: MouseEvent) => void;
    ariaLabel: string;
    class?: string; // Add class prop support
  }

  // Destructure with a default empty string for className [cite: 13]
  let { direction, onclick, ariaLabel, class: className = '' }: Props = $props();
</script>

<button
  class="nav-arrow nav-{direction} {className}"
  onclick={(e) => {
    e.stopPropagation();
    onclick(e);
  }}
  aria-label={ariaLabel}
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
    <path d={NAV_PATH_MAP[direction]} />
  </svg>
</button>

<style>
  .nav-arrow {
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
      opacity 0.2s,
      background 0.2s;
  }

  @media (max-width: 1023px) {
    .nav-arrow {
      display: none;
    }
  }
</style>
