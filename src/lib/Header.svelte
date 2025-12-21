<script lang="ts">
  export let title: string;
  export let tagline: string;
</script>

<header>
  <h1>{title}</h1>
  <p class="tagline">{tagline}</p>
</header>

<style>
  header {
    background: linear-gradient(135deg, #8b7ba8 0%, #b8a8d4 100%);
    padding: 4rem 1rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
  h1 {
    font-size: 3rem;
    color: #fff;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  .tagline {
    color: #f0e6ff;
    font-style: italic;
    font-size: 1.1rem;
  }
</style>
