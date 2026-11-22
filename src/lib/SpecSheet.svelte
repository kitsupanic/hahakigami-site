<script lang="ts">
  import { onMount } from 'svelte';

  // Shipped apps scanning the whole startup disk, 22 Nov 2026, one run each (docs/BENCHMARKS.md in the app repo).
  const AXIS_MAX = 75; // seconds, shared by every bar
  // Five equal steps; the track's gridlines (every 20%) line up with these labels.
  const TICKS = [0, 1, 2, 3, 4, 5].map((i) => (AXIS_MAX / 5) * i);
  const groups = [
    {
      name: 'First scan',
      rows: [{ tool: 'Hahakigami', s: 41.2 }, { tool: 'OpenDisk', s: 31.3 }, { tool: 'Radix', s: 63 }]
    },
    {
      name: 'Rescan',
      rows: [{ tool: 'Hahakigami', s: 40.9 }, { tool: 'OpenDisk', s: 4.4 }, { tool: 'Radix', s: 66 }]
    }
  ];
  // Peak resident memory of each app's main process during its scans.
  const memory = [
    { tool: 'Hahakigami', v: '1.42 GiB' },
    { tool: 'OpenDisk', v: '4.2 GiB' },
    { tool: 'Radix', v: '5.7 GiB' }
  ];

  let panel: HTMLElement;
  // Bars are fully visible until JS confirms it can animate: armed collapses them, shown grows them.
  let armed = $state(false);
  let shown = $state(false);

  onMount(() => {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    armed = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          shown = true;
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(panel);
    return () => io.disconnect();
  });
</script>

<div class="panel" class:armed class:shown bind:this={panel}>
  <h3>Whole startup disk</h3>
  {#each groups as g, gi (g.name)}
    <h4>{g.name}</h4>
    <ul>
      {#each g.rows as r, ri (r.tool)}
        {@const own = r.tool === 'Hahakigami'}
        <li>
          <span class="lab">{r.tool}</span>
          <span class="track" aria-hidden="true">
            <i class:other={!own} style="--w:{(r.s / AXIS_MAX) * 100}%; --d:{(gi * 3 + ri) * 70}ms"></i>
          </span>
          <span class="v">{r.s} s</span>
        </li>
      {/each}
    </ul>
  {/each}
  <div class="axis" aria-hidden="true">
    <span></span>
    <div>{#each TICKS as t, i (t)}<span>{t}{i === TICKS.length - 1 ? ' s' : ''}</span>{/each}</div>
    <span></span>
  </div>
  <p class="legend">
    <span><i class="sw" aria-hidden="true"></i>Hahakigami</span><span><i class="sw other" aria-hidden="true"></i>Other apps</span>
  </p>
  <h4>Peak memory</h4>
  <ul>
    {#each memory as m (m.tool)}
      <li class="mem"><span class="lab">{m.tool}</span><span class="v">{m.v}</span></li>
    {/each}
  </ul>
  <p class="caveat">
    OpenDisk scans fastest and rescans from its cache; Hahakigami always rescans the startup disk in full. OpenDisk
    reports 916.7 GB, more than the disk holds (801.9 GB in use), because it counts APFS clone copies at full size.
    Hahakigami and Radix agree to within 0.1 GB. One run per app on an M4 Pro.
  </p>
</div>

<style>
  h4 {
    margin: 22px 0 2px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  ul {
    list-style: none;
  }
  li,
  .axis {
    display: grid;
    grid-template-columns: 110px 1fr 64px;
    gap: 12px;
    align-items: center;
  }
  li {
    padding: 9px 0;
    border-bottom: 1px solid color-mix(in srgb, var(--ink) 27%, transparent);
    font-size: 14px;
  }
  .lab {
    font-weight: 700;
  }
  li.mem {
    grid-template-columns: 110px 1fr;
  }
  .track {
    position: relative;
    height: 18px;
    background: repeating-linear-gradient(
      90deg,
      transparent 0 calc(20% - 1px),
      color-mix(in srgb, var(--ink) 20%, transparent) calc(20% - 1px) 20%
    );
  }
  .track i {
    position: absolute;
    left: 0;
    top: 3px;
    height: 12px;
    width: var(--w);
    background: var(--ink);
  }
  .track i.other {
    background: transparent;
    border: 2px dashed var(--ink);
  }
  .v {
    font: 600 13px var(--font-mono);
    text-align: right;
  }
  .axis {
    margin-top: 6px;
    font: 500 11px var(--font-mono);
    color: var(--muted);
  }
  .axis div {
    display: flex;
    justify-content: space-between;
  }
  .legend {
    display: flex;
    gap: 18px;
    margin-top: 14px;
    font-size: 13px;
  }
  .sw {
    display: inline-block;
    width: 22px;
    height: 10px;
    margin-right: 6px;
    background: var(--ink);
  }
  .sw.other {
    background: none;
    border: 2px dashed var(--ink);
  }
  .caveat {
    max-width: 65ch;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 2px solid var(--rule);
    font-size: 14px;
    line-height: 1.5;
  }

  /* The one motion moment: bars grow with an exponential ease-out once the panel is on screen. */
  /* Screen only, so print and full-page captures never show empty bars. */
  @media screen {
    .armed .track i {
      width: 0;
      border-width: 0;
    }
  }
  .armed.shown .track i {
    width: var(--w);
    border-width: 2px;
    transition:
      width 700ms cubic-bezier(0.16, 1, 0.3, 1) var(--d),
      border-width 700ms cubic-bezier(0.16, 1, 0.3, 1) var(--d);
  }
  .armed.shown .track i:not(.other) {
    border-width: 0;
  }

  @media (max-width: 860px) {
    li,
    .axis {
      grid-template-columns: 86px 1fr 52px;
    }
    li.mem {
      grid-template-columns: 86px 1fr;
    }
    .panel {
      padding-inline: 14px;
    }
  }
</style>
