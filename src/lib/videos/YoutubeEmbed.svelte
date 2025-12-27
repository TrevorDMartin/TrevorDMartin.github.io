<script lang="ts">
  interface Props {
    videoId: string;
    title: string;
  }

  const { videoId, title }: Props = $props();
</script>

<div class="video-container">
  <iframe
    title="Youtube Video Player"
    src="https://www.youtube.com/embed/{videoId}"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>

<style>
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid var(--light-purple);
    border-radius: 15px;
  }

  @media (min-width: 768px) {
    .video-container {
      width: 85%;
    }
  }

  @media (min-width: 1024px) {
    .video-container {
      width: 65%;
    }
  }
</style>
