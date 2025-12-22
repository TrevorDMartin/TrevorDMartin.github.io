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
    padding: 2rem 1rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
  h1 {
    font-size: clamp(1.5rem, 8vw, 3rem);
    color: #fff;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    word-break: break-word;
  }
  .tagline {
    color: #f0e6ff;
    font-style: italic;
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    header {
      padding: 4rem 1rem;
    }
    h1 {
      letter-spacing: 0.1em;
    }
    .tagline {
      font-size: 1.1rem;
    }
  }
</style>
