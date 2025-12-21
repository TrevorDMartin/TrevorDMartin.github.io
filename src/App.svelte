<script lang="ts">
  import './app.css';
  import type { Show, PressItem } from './types';

  import Header from './lib/Header.svelte';
  import Navbar from './lib/Navbar.svelte';
  import Gallery from './lib/gallery/Gallery.svelte';
  import MusicVideo from './lib/MusicVideo.svelte';
  import ShowList from './lib/ShowList.svelte';
  import About from './lib/About.svelte';
  import Press from './lib/Press.svelte';
  import Footer from './lib/Footer.svelte';

  const upcomingShows: Show[] = [
    { date: 'March 15, 2025', venue: 'The Velvet Underground', location: 'Brooklyn, NY' },
    { date: 'March 22, 2025', venue: 'Metro Music Hall', location: 'Chicago, IL' },
    { date: 'April 5, 2025', venue: 'The Echo', location: 'Los Angeles, CA' },
  ];

  const pastShows: Show[] = [
    { date: 'Dec 10, 2024', venue: 'The Bowery Ballroom', location: 'New York, NY' },
    { date: 'Nov 18, 2024', venue: 'Music Hall of Williamsburg', location: 'Brooklyn, NY' },
  ];

  const pressQuotes: PressItem[] = [
    {
      outlet: 'Indie Music Magazine',
      quote: 'Cassettiquette delivers a fresh take on indie rock.',
    },
    { outlet: 'Sound & Vision Blog', quote: 'A band that understands the power of melody.' },
  ];
</script>

<Header title="Cassettiquette" tagline="Indie Rock Press Kit" />
<Navbar />

<main>
  <Gallery />
  <MusicVideo />

  <section id="music">
    <h2>Music</h2>
    <div class="music-player">
      <p>Apple Music Embedded Player Placeholder</p>
    </div>
  </section>

  <ShowList upcoming={upcomingShows} past={pastShows} />
  <About />
  <Press quotes={pressQuotes} />
</main>

<Footer />

<style>
  main {
    max-width: 1200px;
    margin: 3rem auto;
    padding: 0 2rem;
  }
  .music-player {
    background: #1a1a1a;
    border: 2px dashed #8b7ba8;
    padding: 4rem;
    text-align: center;
    color: #9988bb;
    font-style: italic;
  }
</style>
