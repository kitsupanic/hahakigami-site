<script lang="ts">
  let { status }: { status: number } = $props();
</script>

<svelte:head>
  <title>Not found — Hahakigami</title>
  <!-- /404 itself is served with status 200, so keep it out of search results. -->
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="carton">
  <p class="code">{status}</p>
  <h1>Nothing on this shelf.</h1>
  <p><a class="btn red" href="/">Back to Hahakigami</a></p>
</main>

<style>
  main {
    min-height: 100vh;
    display: grid;
    place-content: center;
    justify-items: start;
    gap: 24px;
    padding: 56px 16px;
  }
  .code {
    font: 600 14px var(--font-mono);
    letter-spacing: 0.14em;
    color: var(--straw-dim);
  }
  h1 {
    font-size: clamp(34px, 6vw, 56px);
    font-weight: 900;
    font-stretch: 112%;
    line-height: 1;
  }
</style>
