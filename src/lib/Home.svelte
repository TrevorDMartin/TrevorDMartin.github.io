<script lang="ts">
  import type { PressItem } from '$lib/types';

  import Header from '$lib/Header.svelte';
  import Navbar from '$lib/Navbar.svelte';
  import Gallery from '$lib/gallery/Gallery.svelte';
  import MusicVideo from '$lib/Video.svelte';
  import ShowList from '$lib/shows/ShowList.svelte';
  import About from '$lib/About.svelte';
  import Press from '$lib/Press.svelte';
  import Footer from '$lib/Footer.svelte';
  import Music from '$lib/Music.svelte';

  const pressQuotes: PressItem[] = [
    {
      outlet: 'Indie Music Magazine',
      quote: 'Cassettiquette delivers a fresh take on indie rock.',
    },
    { outlet: 'Sound & Vision Blog', quote: 'A band that understands the power of melody.' },
  ];
</script>

<Header />
<Navbar />

<main>
  <Gallery />
  <MusicVideo />
  <Music />
  <ShowList />
  <About />
  <Press quotes={pressQuotes} />
</main>

<Footer />

<style>
  main {
    max-width: 1200px;
    margin: 1rem auto;
    padding: 0 1rem;
  }

  @media (min-width: 768px) {
    main {
      margin: 3rem auto;
      padding: 0 2rem;
    }
  }
</style>
