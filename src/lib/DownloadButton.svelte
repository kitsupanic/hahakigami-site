<script lang="ts">
  import { DOWNLOAD_URL } from './config';
</script>

{#if DOWNLOAD_URL}
  <a class="btn live" href={DOWNLOAD_URL}>Download</a>
{:else}
  <!-- Not available yet: focusable and announced as disabled, does nothing. -->
  <button type="button" class="btn soon" aria-disabled="true">Download <small>· coming soon</small></button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 22px;
    font: 800 17px/1 var(--font-sans);
    letter-spacing: 0.02em;
    text-decoration: none;
  }
  .live {
    background: var(--cord);
    color: var(--on-red);
  }
  .soon {
    background: transparent;
    color: var(--straw);
    border: 2px dashed var(--straw);
    cursor: not-allowed;
  }
  small {
    font-weight: 600;
    font-size: inherit;
  }
</style>
