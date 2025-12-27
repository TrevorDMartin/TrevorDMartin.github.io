<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Navbar from '$lib/Navbar.svelte';
  import Photos from '$lib/photos/PhotoGallery.svelte';
  import MusicVideo from '$lib/videos/Video.svelte';
  import ShowList from '$lib/shows/ShowList.svelte';
  import About from '$lib/About.svelte';
  import Press from '$lib/Press.svelte';
  import Footer from '$lib/Footer.svelte';
  import Music from '$lib/Music.svelte';
  import BodySection from '$lib/home/BodySection.svelte';
  import type { Component } from 'svelte';
  import type { NavLink } from '../types';
  import BackToTop from './home/BackToTop.svelte';

  interface BodyComponent extends NavLink {
    component: Component;
  }

  const components: BodyComponent[] = [
    { label: 'Photos', id: 'photos', component: Photos },
    { label: 'Videos', id: 'videos', component: MusicVideo },
    { label: 'Music', id: 'music', component: Music },
    { label: 'Shows', id: 'shows', component: ShowList },
    { label: 'About', id: 'about', component: About },
    { label: 'Press', id: 'press', component: Press },
  ];
</script>

<Header />
<Navbar links={components} />
<main>
  {#each components as component (component.label)}
    <BodySection {...component}>
      <svelte:component this={component.component} />
    </BodySection>
  {/each}
</main>

<Footer />
<BackToTop />

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
