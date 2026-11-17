<script lang="ts">
  import { FOLDERS, labelPx, tracks, type Basis } from './treemap';

  let basis = $state<Basis>('disk');

  const sizes = $derived(FOLDERS.map((f) => f[basis]));
  const grid = $derived(tracks(sizes));
  const description = $derived(
    `Example treemap, ${basis === 'disk' ? 'on disk' : 'logical'} sizes: ` +
      FOLDERS.map(
        (f) => `${f.name} ${f[basis]} GB${basis === 'logical' && f.logicalNote ? ` (${f.logicalNote})` : ''}`
      ).join(', ')
  );
</script>

<div class="win carton">
  <div class="bar">
    <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <div class="seg" role="group" aria-label="Size basis">
      <button type="button" aria-pressed={basis === 'disk'} onclick={() => (basis = 'disk')}>
        <span class="sw solid" aria-hidden="true"></span>On disk
      </button>
      <button type="button" aria-pressed={basis === 'logical'} onclick={() => (basis = 'logical')}>
        <span class="sw dashed" aria-hidden="true"></span>Logical
      </button>
    </div>
  </div>
  <div
    class="tm"
    class:logical={basis === 'logical'}
    role="img"
    aria-label={description}
    style:grid-template-columns={grid.columns}
    style:grid-template-rows={grid.rows}
  >
    {#each FOLDERS as f, i (f.id)}
      <div class="blk b{i}" class:row={i >= 3} style:font-size="{labelPx(f[basis])}px">
        {f.name}<small>{f[basis]} GB</small>
      </div>
    {/each}
  </div>
</div>
<p class="note">Example data. Real screenshots go here.</p>
<p class="note">Logical size counts every APFS clone copy in full; on disk counts shared blocks once.</p>

<style>
  .win {
    border-radius: 12px;
    padding: 12px;
  }
  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 0 0 12px 6px;
  }
  .dots {
    display: flex;
    gap: 7px;
  }
  .dots i {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #3a383d;
  }
  .seg {
    display: flex;
    border: 2px solid var(--straw);
  }
  .seg button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    font: 700 13px/1 var(--font-sans);
    letter-spacing: 0.02em;
    background: transparent;
    color: var(--straw);
    border: 0;
    cursor: pointer;
  }
  .seg button + button {
    border-left: 2px solid var(--straw);
  }
  .seg button[aria-pressed='true'] {
    background: var(--straw);
    color: var(--carton);
  }
  .seg button:focus-visible {
    outline-offset: 2px;
  }
  /* Same rule as the blocks: solid = on disk, dashed = logical. */
  .sw {
    width: 12px;
    height: 12px;
    border: 2px solid currentColor;
  }
  .sw.dashed {
    border-style: dashed;
  }

  .tm {
    display: grid;
    gap: 3px;
    height: 420px;
  }
  .blk {
    grid-column: 2;
    padding: 10px;
    overflow: hidden;
    line-height: 1.05;
    font-weight: 800;
    color: var(--carton);
    outline: 2px solid var(--carton);
    outline-offset: -4px;
  }
  .logical .blk {
    outline-style: dashed;
  }
  .b0 {
    grid-column: 1;
    grid-row: 1 / -1;
    background: #e9d9b4;
  }
  .b1 {
    background: #cdb98f;
  }
  .b2 {
    background: #b7a57f;
  }
  .b3 {
    background: #a39370;
  }
  .b4 {
    background: #918567;
  }
  /* Small blocks: name and size on one line. */
  .row {
    display: flex;
    align-items: baseline;
    gap: 0.6em;
    padding-block: 4px;
  }
  small {
    display: block;
    margin-top: 6px;
    font: 600 12px var(--font-mono);
  }
  .row small {
    margin-top: 0;
  }

  @media (prefers-reduced-motion: no-preference) {
    .tm {
      transition:
        grid-template-columns 500ms cubic-bezier(0.16, 1, 0.3, 1),
        grid-template-rows 500ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .blk {
      transition: font-size 500ms cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  .note {
    max-width: 65ch;
    margin-top: 10px;
    font: 500 12px/1.5 var(--font-mono);
    color: var(--muted);
  }

  @media (max-width: 860px) {
    .tm {
      height: 400px;
    }
    .blk {
      padding: 8px;
    }
    .row {
      padding-inline: 8px;
    }
  }
</style>
