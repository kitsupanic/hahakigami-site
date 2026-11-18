<script lang="ts">
  // One screenshot per feature; the feature cells below are the carousel's tabs.
  // shortcut: slides 2–4 are copies of slide 1 until real captures land at the same paths.
  const ALT =
    'Hahakigami in its Guardian theme: a saved scan shown as a treemap of folders and file types, with a file-types table beside it.';
  const SLIDES = [
    { title: 'Honest sizes', text: 'Clones of the same APFS blocks are counted once.', src: '/app-1.webp', alt: ALT },
    {
      title: 'Three views',
      text: 'Size-sorted tree, treemap and sunburst, with breadcrumbs and back/forward.',
      src: '/app-2.webp',
      alt: ALT
    },
    { title: 'Saved scans', text: 'Keep a scan and browse it later without rescanning.', src: '/app-3.webp', alt: ALT },
    { title: 'Quick Look & Finder', text: 'Inspect any file, copy its path, reveal it in Finder.', src: '/app-4.webp', alt: ALT }
  ];

  let track: HTMLDivElement;
  let current = $state(0);

  function show(i: number) {
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    current = i;
    track.scrollTo({ left: i * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
  }
  // The track is a native scroll-snap strip, so swipes and trackpads move it too; the tabs follow it once it settles.
  const sync = () => (current = Math.round(track.scrollLeft / track.clientWidth));
</script>

<div class="shot carton">
  <div class="track" bind:this={track} onscrollend={sync} role="group" aria-label="Screenshots">
    {#each SLIDES as s, i (s.src)}
      <img
        src={s.src}
        width="1280"
        height="820"
        loading={i ? 'lazy' : undefined}
        decoding="async"
        alt={s.alt}
        aria-hidden={i !== current}
      />
    {/each}
  </div>
</div>
<ul class="tabs">
  {#each SLIDES as s, i (s.src)}
    <li>
      <button type="button" aria-current={i === current ? 'true' : undefined} onclick={() => show(i)}>
        <span class="t">{s.title}</span>
        <span class="d">{s.text}</span>
      </button>
    </li>
  {/each}
</ul>

<style>
  /* The app window: a carton frame, rounded because it depicts a Mac screen. */
  .shot {
    border-radius: 12px;
    padding: 12px;
  }
  .track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    border-radius: 4px;
  }
  .track::-webkit-scrollbar {
    display: none;
  }
  .track img {
    flex: 0 0 100%;
    display: block;
    width: 100%;
    height: auto;
    scroll-snap-align: start;
  }

  /* Ruled cells, like the steps row; the current slide's cell carries the spot-red tab. */
  .tabs {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 24px;
    border: 3px solid var(--rule);
  }
  .tabs li + li {
    border-left: 3px solid var(--rule);
  }
  .tabs button {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 26px 22px 22px;
    text-align: left;
    font: inherit;
    color: inherit;
    background: transparent;
    border: 0;
    cursor: pointer;
  }
  .tabs button::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    height: 8px;
    background: var(--cord);
    transform: scaleX(0);
    transform-origin: left;
  }
  .tabs button[aria-current='true']::before {
    transform: scaleX(1);
  }
  .tabs button:hover {
    background: var(--panel);
  }
  .tabs button:focus-visible {
    outline-offset: -6px;
  }
  .t {
    display: block;
    font-size: 18px;
    font-weight: 800;
  }
  .d {
    display: block;
    margin-top: 6px;
    font-size: 16px;
    line-height: 1.45;
    color: var(--ink-soft);
  }

  @media (prefers-reduced-motion: no-preference) {
    .tabs button::before {
      transition: transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  @media (max-width: 860px) {
    .tabs {
      grid-template-columns: 1fr 1fr;
    }
    .tabs li:nth-child(3) {
      border-left: 0;
    }
    .tabs li:nth-child(n + 3) {
      border-top: 3px solid var(--rule);
    }
  }
  @media (max-width: 520px) {
    .tabs button {
      padding: 20px 14px 16px;
    }
    .t {
      font-size: 16px;
    }
    .d {
      font-size: 14px;
    }
  }
</style>
