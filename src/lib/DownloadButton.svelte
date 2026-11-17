<script lang="ts">
  import { DOWNLOAD_URL } from './config';
</script>

<a class="btn" href={DOWNLOAD_URL}>Download</a>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    padding: 16px 22px;
    background: var(--cord);
    color: var(--on-red);
    font: 800 17px/1 var(--font-sans);
    letter-spacing: 0.02em;
    text-decoration: none;
  }
</style>
