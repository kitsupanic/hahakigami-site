<script lang="ts">
  import { onMount } from 'svelte';

  type App = {
    tool: string;
    first: number;
    rescan: number;
    memory: number;
    total: string;
    own?: boolean;
    // Small print under a figure, keyed by column.
    notes?: Partial<Record<'rescan' | 'total', string>>;
  };
  let { apps, machine }: { apps: App[]; machine: [string, string][] } = $props();

  // Each column's bars share one axis; lower is better in every measured column.
  const COLS = [
    { key: 'first', label: 'First scan', unit: 's', max: 75 },
    { key: 'rescan', label: 'Rescan', unit: 's', max: 75 },
    { key: 'memory', label: 'Peak memory', unit: 'GiB', max: 6 }
  ] as const;
  const lowest = (key: (typeof COLS)[number]['key']) => Math.min(...apps.map((a) => a[key]));

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
  <div class="tbl" role="table" aria-label="Scan time, peak memory and reported disk total per app">
    <div class="tr th" role="row">
      <span role="columnheader">App</span>
      {#each COLS as c (c.key)}<span role="columnheader">{c.label}</span>{/each}
      <span role="columnheader">Disk total</span>
    </div>
    {#each apps as a, ai (a.tool)}
      <div class="tr" class:carton={a.own} role="row">
        <span class="app" role="rowheader">{a.tool}</span>
        {#each COLS as c, ci (c.key)}
          <span class="cell" role="cell" data-label={c.label}>
            <b class:low={a[c.key] === lowest(c.key)}>{a[c.key]} {c.unit}</b>
            <i
              class="bar"
              class:other={!a.own}
              aria-hidden="true"
              style="--w:{(a[c.key] / c.max) * 100}%; --d:{(ai * COLS.length + ci) * 50}ms"
            ></i>
            {#if c.key === 'rescan' && a.notes?.rescan}<em>{a.notes.rescan}</em>{/if}
          </span>
        {/each}
        <span class="cell" role="cell" data-label="Disk total">
          <b>{a.total}</b>
          {#if a.notes?.total}<em>{a.notes.total}</em>{/if}
        </span>
      </div>
    {/each}
  </div>
  <p class="key">
    <span><i class="lowmark" aria-hidden="true"></i>Lowest in its column</span>
    <span><i class="sw" aria-hidden="true"></i>Hahakigami</span>
    <span><i class="sw other" aria-hidden="true"></i>Other apps</span>
    <span>Bars: 0–75 s and 0–6 GiB</span>
  </p>
  <p class="fine">
    {#each machine as [k, v], i (k)}{i ? ' · ' : ''}<b>{k}</b> {v}{/each}
  </p>
</div>

<style>
  .tbl {
    margin-top: 10px;
  }
  .tr {
    display: grid;
    grid-template-columns: 1.1fr repeat(3, 1fr) 1.2fr;
    gap: 20px;
    align-items: start;
    padding: 16px 14px;
    border-bottom: 1px solid color-mix(in srgb, var(--ink) 27%, transparent);
  }
  .th {
    align-items: end;
    padding-block: 10px;
    border-bottom: 3px solid var(--rule);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .app {
    font-size: 20px;
    font-weight: 900;
    font-stretch: 115%;
  }
  .cell {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .cell b {
    font: 600 16px var(--font-mono);
  }
  /* The lowest figure in a column is underlined, never coloured: red stays for actions. */
  .cell b.low {
    font-weight: 800;
    text-decoration: underline 3px;
    text-underline-offset: 5px;
  }
  .cell em {
    font: 500 12px/1.4 var(--font-mono);
    font-style: normal;
    color: var(--muted);
  }
  .carton .cell em {
    color: var(--straw-dim);
  }
  /* Solid is Hahakigami, dashed is another app (the site's solid/dashed code). */
  .bar {
    display: block;
    height: 8px;
    width: var(--w);
    background: currentColor;
  }
  .bar.other {
    background: none;
    border: 2px dashed currentColor;
  }
  .key {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 22px;
    margin-top: 14px;
    font-size: 13px;
  }
  .lowmark {
    display: inline-block;
    width: 22px;
    margin-right: 8px;
    border-bottom: 3px solid var(--ink);
    vertical-align: 3px;
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
  .fine {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 2px solid var(--rule);
    font: 500 12px/1.7 var(--font-mono);
  }
  .fine b {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* The one motion moment: bars grow with an exponential ease-out once the panel is on screen. */
  /* Screen only, so print and full-page captures never show empty bars. */
  @media screen {
    .armed .bar {
      width: 0;
      border-width: 0;
    }
  }
  .armed.shown .bar {
    width: var(--w);
    border-width: 2px;
    transition:
      width 700ms cubic-bezier(0.16, 1, 0.3, 1) var(--d),
      border-width 700ms cubic-bezier(0.16, 1, 0.3, 1) var(--d);
  }
  .armed.shown .bar:not(.other) {
    border-width: 0;
  }

  /* Phones: each app becomes a block of labelled figures, two per line. */
  @media (max-width: 860px) {
    .panel {
      padding-inline: 14px;
    }
    .tr {
      grid-template-columns: 1fr 1fr;
      gap: 14px 12px;
    }
    .th {
      display: none;
    }
    .app {
      grid-column: 1 / -1;
    }
    .cell::before {
      content: attr(data-label);
      font: 800 10px var(--font-sans);
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }
  }
</style>
