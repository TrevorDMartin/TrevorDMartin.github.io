<script lang="ts">
  import type { PictureMetadata } from '$lib/types';
  import Gallery from './common/gallery/Gallery.svelte';

  const imageModules = import.meta.glob<PictureMetadata>('./assets/gallery/*.{jpg,jpeg,png}', {
    eager: true,
    query: {
      w: '400:512;640;1280',
      enhanced: true,
    },
  });
</script>

<Gallery {imageModules} />
