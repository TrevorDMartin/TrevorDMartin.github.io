<script lang="ts">
    const photoCount: number = 6;
</script>

<section id="photos">
    <h2>Photos</h2>
    <div class="gallery-container">
        <div class="gallery-scroll">
            {#each Array(photoCount) as _, i}
                <div class="gallery-item">High-res Band Photo {i + 1}</div>
            {/each}
        </div>
    </div>
</section>

<style>
    .gallery-scroll {
        display: flex;
        gap: 1.5rem;
        overflow-x: auto;
        padding-bottom: 1rem;
    }
    .gallery-item {
        flex: 0 0 400px;
        background: #1a1a1a;
        border: 2px dashed #8b7ba8;
        border-radius: 8px;
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #9988bb;
        font-style: italic;
    }
</style>