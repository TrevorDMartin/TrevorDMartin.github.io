<script lang="ts">
    import type { Show } from '../types';
    
    export let upcoming: Show[];
    export let past: Show[];

    let showUpcoming: boolean = true;
</script>

<section id="shows">
    <h2>Shows</h2>
    <div class="controls">
        <button class:active={showUpcoming} on:click={() => showUpcoming = true}>Upcoming</button>
        <button class:active={!showUpcoming} on:click={() => showUpcoming = false}>Past Shows</button>
    </div>
    
    <div class="list">
        {#each (showUpcoming ? upcoming : past) as show}
            <div class="show-item">
                <div class="show-date">{show.date}</div>
                <div class="show-venue">{show.venue}</div>
                <div class="show-location">{show.location}</div>
            </div>
        {/each}
    </div>
</section>

<style>
    .controls { display: flex; gap: 1rem; margin-bottom: 2rem; }
    button {
        background: #1a1a1a;
        color: #c4b5e0;
        border: 2px solid #8b7ba8;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        text-transform: uppercase;
    }
    button.active {
        background: linear-gradient(135deg, #8b7ba8 0%, #b8a8d4 100%);
        color: #fff;
    }
    .show-item {
        background: #1a1a1a;
        padding: 2rem;
        border-radius: 8px;
        border-left: 4px solid #8b7ba8;
        margin-bottom: 1.5rem;
    }
    .show-date { color: #b8a8d4; font-weight: bold; font-size: 1.3rem; }
</style>