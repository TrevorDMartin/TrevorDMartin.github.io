<script lang="ts">
  let visible = $state(false);

  function handleScroll() {
    // Show button after scrolling down 300px
    visible = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

</script>
<svelte:window onscroll={handleScroll} />

{#if visible}
  <button 
    onclick={scrollToTop} 
    aria-label="Back to top"
    class="back-to-top"
  >
    ↑
  </button>
{/if}

<style>
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 0.8rem 1.2rem;
    background: var(--light-purple, #6200ee); /* Uses your existing purple variable */
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1001; /* Higher than your Navbar's 1000 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    font-size: 1.5rem;
    transition: opacity 0.3s, transform 0.2s;
  }

  .back-to-top:hover {
    transform: translateY(-3px);
  }
</style>