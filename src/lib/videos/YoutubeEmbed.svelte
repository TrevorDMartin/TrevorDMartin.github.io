<script lang="ts">
  interface Props {
    videoId: string;
    title: string;
  }

  const { videoId, title }: Props = $props();
</script>

<div class="video-container">
  <iframe
    src="https://www.youtube.com/embed/{videoId}"
    {title}
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

<style>
  /* Mobile First Design */
  .video-container {
    position: relative;
    width: 100%;
    /* Maintain 16:9 Aspect Ratio */
    padding-bottom: 56.25%; 
    height: 0;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid var(--light-purple); /* Consistent with your navbar theme */
    background: #000;
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* Tablet/Desktop scaling similar to your Home.svelte layout */
  @media (min-width: 768px) {
    .video-container {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
  }
</style>