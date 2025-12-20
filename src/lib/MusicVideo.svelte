<section id="videos">
    <h2>Videos</h2>
    <div class="video-grid">
        <div class="video-placeholder">Music Video<br>Embedded Player</div>
        <div class="video-placeholder">Live Performance<br>Embedded Player</div>
    </div>
</section>

<style>
    .video-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
        gap: 1.5rem;
    }
    .video-placeholder {
        background: #1a1a1a;
        border: 2px dashed #8b7ba8;
        border-radius: 8px;
        min-height: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #9988bb;
    }
</style>