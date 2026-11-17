<script lang="ts">
  import { onMount } from 'svelte';

  const AXIS_MAX = 25; // seconds, shared by every bar
  const groups = [
    { name: 'GitHub project folder', rows: [{ tool: 'Hahakigami', s: 3.14 }, { tool: 'OpenDisk', s: 4.572 }] },
    { name: 'Home folder', rows: [{ tool: 'Hahakigami', s: 13.126 }, { tool: 'OpenDisk', s: 18.793 }] },
    { name: 'Whole startup disk', rows: [{ tool: 'Hahakigami', s: 18.583 }, { tool: 'OpenDisk', s: 18.14 }] }
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
  <h3>Time to first result</h3>
  {#each groups as g, gi (g.name)}
    <h4>{g.name}</h4>
    <ul>
      {#each g.rows as r, ri (r.tool)}
        {@const own = r.tool === 'Hahakigami'}
        <li>
          <span class="lab">{r.tool}</span>
          <span class="track" aria-hidden="true">
            <i class:other={!own} style="--w:{(r.s / AXIS_MAX) * 100}%; --d:{(gi * 2 + ri) * 70}ms"></i>
          </span>
          <span class="v">{r.s.toFixed(1)} s</span>
        </li>
      {/each}
    </ul>
  {/each}
  <div class="axis" aria-hidden="true">
    <span></span>
    <div><span>0</span><span>5</span><span>10</span><span>15</span><span>20</span><span>25 s</span></div>
    <span></span>
  </div>
  <p class="legend">
    <span><i class="sw" aria-hidden="true"></i>Hahakigami</span><span><i class="sw other" aria-hidden="true"></i>OpenDisk</span>
  </p>
  <p class="caveat">
    About 30% faster on folders and Home. On a full startup-disk scan OpenDisk is still slightly ahead. Peak memory
    on a project folder: 146 MiB vs 225 MiB.
  </p>
</div>

<style>
  .panel {
    border: 4px solid var(--rule);
    padding: 18px 22px;
    background: var(--panel);
  }
  h3 {
    font-size: 30px;
    font-weight: 900;
    font-stretch: 120%;
    padding-bottom: 6px;
    border-bottom: 10px solid var(--rule);
  }
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
  .armed .track i {
    width: 0;
    border-width: 0;
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
    .panel {
      padding-inline: 14px;
    }
  }
</style>
