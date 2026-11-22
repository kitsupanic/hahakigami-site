<script lang="ts">
  import DownloadButton from '#lib/DownloadButton.svelte';
  import Features from '#lib/Features.svelte';
  import Spine from '#lib/Spine.svelte';
  import SpecSheet from '#lib/SpecSheet.svelte';
  import { GITHUB_URL, SITE_URL, VERSION } from '#lib/config.ts';

  const title = 'Hahakigami — disk space analyzer for macOS';
  const description =
    'Hahakigami is a local disk-space analyzer for macOS. It scans a disk or folder, shows storage as a size-sorted tree, treemap or sunburst, lets you inspect files and moves a reviewed selection to the macOS Trash.';
  // JPG, not WebP: some link previews (LinkedIn) only accept JPG, PNG or GIF.
  const image = `${SITE_URL}/og.jpg`;
  // Add a roadmap point here; each kind gets its own column. Flip `available` when it ships.
  const ROADMAP = [
    { name: 'macOS', kind: 'Platform', status: 'Available · macOS 14+', available: true },
    { name: 'Windows', kind: 'Platform', status: 'Planned', available: false },
    { name: 'Linux', kind: 'Platform', status: 'Planned', available: false },
    { name: 'Scan saving', kind: 'Feature', status: 'Planned', available: false },
    { name: 'Scans comparison', kind: 'Feature', status: 'Planned', available: false },
    { name: 'Network disk support', kind: 'Feature', status: 'Planned', available: false }
  ];
  const shipping = ROADMAP.filter((r) => r.available).length;
  const kinds = [...new Set(ROADMAP.map((r) => r.kind))];
  // Shipped apps scanning the whole startup disk, 22 Nov 2026, one run each (docs/BENCHMARKS.md in the app repo).
  // Memory is the peak resident size of each app's main process during those scans.
  const APPS = [
    { tool: 'Hahakigami', first: 41.2, rescan: 40.9, memory: 1.42, total: '746.4 GB', own: true },
    {
      tool: 'OpenDisk',
      first: 31.3,
      rescan: 4.4,
      memory: 4.2,
      total: '916.7 GB',
      notes: { rescan: 'from its cache', total: 'more than the 801.9 GB in use' }
    },
    { tool: 'Radix', first: 63, rescan: 66, memory: 5.7, total: '746.3 GB' }
  ];
  // Where those numbers were measured (docs/BENCHMARKS.md; disk capacity from diskutil on the same Mac).
  const TEST_ENV: [string, string][] = [
    ['Chip', 'Apple M4 Pro'],
    ['Memory', '24 GiB'],
    ['System', 'macOS 26.5'],
    ['Startup disk', '994.7 GB SSD, 801.9 GB in use'],
    ['Contents', '6.75 million items in 1.00 million folders'],
    ['Runs', 'One per app, warm caches']
  ];
  const barcode = [3, 1, 4, 2, 1, 3, 1, 5, 2, 1, 3, 2, 4, 1, 2];
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:image:width" content="1440" />
  <meta property="og:image:height" content="1440" />
  <meta property="og:image:alt" content="The Hahakigami Guardian, a broom spirit with straw bristles and a red knotted cord." />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>
<div class="box">
  <Spine />
  <div class="faces">
    <main id="main">
      <header id="top" class="front carton">
        <div class="stage">
          <div class="pitch">
            <h1><span>Your Mac is full.</span> <span>See what’s filling it.</span></h1>
            <p>
              A fast, local disk-space analyzer. Explore a size-sorted tree, treemap or sunburst, then move a
              reviewed selection to the Trash. Nothing leaves your Mac.
            </p>
          </div>
          <img
            class="art"
            src="/guardian-720.webp"
            srcset="/guardian-720.webp 720w, /guardian-1440.webp 1440w"
            sizes="(max-width: 860px) min(72vw, 420px), min(54vw, max(720px, 75vh))"
            width="720"
            height="720"
            fetchpriority="high"
            alt="The Guardian, a broom spirit with a dark face, straw-coloured bristles and a red knotted cord."
          />
        </div>
        <div class="band">
          <svg width="0" height="0" aria-hidden="true" style="position:absolute">
            <filter id="ink-edge" x="-5%" y="-30%" width="110%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035 0.6" numOctaves="3" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="26" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
          <div class="band-in" aria-hidden="true">
            <span class="wordmark">{#each [...'HAHAKIGAMI'] as ch, i (i)}<span style:--i={i}>{ch}</span>{/each}</span><span class="jp" lang="ja">箒神</span>
          </div>
        </div>
        <div class="foot">
          <ul class="req">
            <li>macOS 14+</li>
            <li>Open source</li>
            <li>MIT license</li>
          </ul>
          <div class="cta">
            <DownloadButton />
            <a class="btn gh" href={GITHUB_URL}>View on GitHub</a>
          </div>
        </div>
        <div class="top"><span>Disk space analyzer · macOS</span><span class="ver">{VERSION}</span></div>
      </header>

      <div class="back">
        <section id="steps">
          <div class="flap"><h2>How it works</h2><span>4 steps · no setup</span></div>
          <ol class="steps">
            <li>
              <span class="num" aria-hidden="true">1</span>
              <h3>Pick a location</h3>
              <p>Your startup disk, Home, an external volume or any folder.</p>
            </li>
            <li>
              <span class="num" aria-hidden="true">2</span>
              <h3>Scan</h3>
              <p>Results are explorable while shared clone sizes are still being verified.</p>
            </li>
            <li>
              <span class="num" aria-hidden="true">3</span>
              <h3>Explore</h3>
              <p>Tree, treemap or sunburst. Search every name.</p>
            </li>
            <li>
              <span class="num" aria-hidden="true">4</span>
              <h3>Sweep</h3>
              <p>Review the exact paths, then move them to the Trash. Nothing is deleted outright.</p>
            </li>
          </ol>
        </section>

        <section id="inside">
          <div class="flap"><h2>What’s inside</h2><span>Features</span></div>
          <Features />
        </section>

        <section id="bench">
          <div class="flap"><h2>Spec sheet</h2><span>Measured 22 Nov 2026 · shipped apps</span></div>
          <SpecSheet apps={APPS} machine={TEST_ENV} />
        </section>

        <section id="cli">
          <div class="flap"><h2>Also in the box: CLI &amp; MCP</h2><span>For scripts and agents</span></div>
          <div class="cli">
            <div>
              <p>
                The same app runs headless scans from the terminal and writes JSON. Point an MCP client at it and an
                agent can scan, search and summarize your disk locally.
              </p>
              <p>It only reads metadata. It never opens files, moves anything or listens on the network. The executable lives inside the app bundle.</p>
            </div>
            <!-- Focusable so keyboard users can scroll the code sideways. -->
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <pre class="carton" tabindex="0" role="region" aria-label="Terminal commands and MCP configuration"><span class="c"># scan a folder, then list the biggest items</span>
app=/Applications/Hahakigami.app/Contents/MacOS/hahakigami
"$app" scan ~/Developer
"$app" children SCAN_ID ROOT_ID --limit 20

<span class="c"># local MCP server for your agent</span>
"hahakigami": &#123;
  "command": "/Applications/Hahakigami.app/Contents/MacOS/hahakigami",
  "args": ["mcp"]
&#125;</pre>
          </div>
        </section>

        <section id="privacy">
          <div class="flap"><h2>Private by construction</h2><span>What it won’t do</span></div>
          <div class="priv">
            <div>
              <h3>Stays local</h3>
              <p>No accounts, analytics, remote content or uploads.</p>
            </div>
            <div>
              <h3>Never deletes outright</h3>
              <p>You review exact paths, then they go to the Trash, where you can still restore them.</p>
            </div>
            <div>
              <h3>Respects macOS</h3>
              <p>It only checks whether Full Disk Access is on. You decide in System Settings.</p>
            </div>
          </div>
        </section>

        <section id="roadmap">
          <div class="flap"><h2>Roadmap</h2><span>{shipping} shipping · {ROADMAP.length - shipping} planned</span></div>
          <div class="tracks">
            {#each kinds as kind (kind)}
              <div class="track">
                <h3>{kind}s</h3>
                <ul>
                  {#each ROADMAP.filter((r) => r.kind === kind) as r (r.name)}
                    <li class:carton={r.available} class:soon={!r.available}>
                      <span class="tn">{r.name}</span>
                      <span class="ts">{r.status}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
          <p class="road-note">Solid is in the box today; dashed is not yet available. Follow progress on <a href={GITHUB_URL}>GitHub</a>.</p>
        </section>
      </div>
    </main>

    <footer class="endflap carton">
      <div>
        <p class="fname">Hahakigami</p>
        <p class="fine">© 2026 Hahakigami contributors · MIT · {VERSION} performance prototype</p>
        <p class="fine"><a href={GITHUB_URL}>GitHub</a></p>
      </div>
      <div class="barcode" aria-hidden="true">
        {#each barcode as w}<i style="width:{w}px"></i>{/each}
      </div>
      <DownloadButton />
    </footer>
  </div>
</div>

<style>
  .box {
    --spine: 96px;
    display: grid;
    grid-template-columns: var(--spine) minmax(0, 1fr);
  }

  /* Front panel */
  .front {
    --pad: 56px;
    /* Grows past 720px only on tall, wide screens, where the hero would otherwise sit half empty. */
    --art: min(54vw, max(720px, 75vh));
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr auto auto;
    grid-template-areas: 'top' 'stage' 'band' 'foot';
  }
  .top,
  .pitch,
  .band,
  .foot {
    position: relative;
    z-index: 1;
  }
  .top {
    grid-area: top;
    display: flex;
    justify-content: space-between;
    padding: 32px var(--pad);
    border-bottom: 2px solid var(--straw-dim);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .ver {
    border: 2px solid var(--straw);
    padding: 6px 10px;
  }
  .stage {
    grid-area: stage;
    align-self: center;
    padding: 64px var(--pad);
  }
  /* The text column stops where the Guardian's artwork starts (art left edge + ~5% of its width, minus a gap). */
  .pitch {
    max-width: calc(100vw - var(--spine) + 30px - 0.95 * var(--art));
  }
  h1 {
    font-size: clamp(34px, 4vw, 88px);
    line-height: 1;
    font-weight: 900;
    font-stretch: 112%;
    letter-spacing: -0.01em;
    color: var(--on-red);
    text-wrap: balance;
  }
  h1 span {
    display: block;
  }
  h1 span + span {
    margin-top: 0.12em;
    color: var(--straw);
  }
  .pitch p {
    margin-top: 28px;
    max-width: 44ch;
    font-size: 19px;
    line-height: 1.5;
  }
  /* The art is on the box itself: out of flow, bleeding off the right edge, its lower edge running under the band. */
  .art {
    position: absolute;
    z-index: 0;
    right: -110px;
    top: 40px;
    width: var(--art);
    height: auto;
    aspect-ratio: 1;
  }

  /* The spot-colour band: sized from its own width so the wordmark can never overflow. */
  .band {
    grid-area: band;
    container-type: inline-size;
    overflow: hidden;
    background: var(--cord);
    color: var(--on-red);
  }
  .band-in {
    position: relative;
    --w: calc(100cqw - 2 * var(--pad));
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px var(--pad);
    white-space: nowrap;
  }
  .wordmark {
    font-size: calc(var(--w) * 0.1);
    font-weight: 900;
    font-stretch: 125%;
    line-height: 0.95;
    letter-spacing: -0.01em;
  }
  .jp {
    font-family: var(--font-jp);
    font-weight: 900;
    font-size: calc(var(--w) * 0.05);
  }

  /* Press run, once on load: a roller lays the spot red left to right with a ragged ink edge,
     then the knocked-out wordmark comes into register. Without motion the band is simply printed. */
  @media (prefers-reduced-motion: no-preference) {
    .band {
      background: transparent;
    }
    /* Taller than the band so the displaced top and bottom edges stay clipped; only the leading edge shows. */
    .band::before {
      content: '';
      position: absolute;
      inset: -16px 0;
      /* The paint is a background that grows, so the filter roughens its moving edge (a clip would cut it straight). */
      background: linear-gradient(var(--cord), var(--cord)) no-repeat 0 0 / 0% 100%;
      filter: url(#ink-edge);
      animation: roll 1050ms cubic-bezier(0.65, 0, 0.2, 1) 250ms both;
    }
    /* Each letter is stamped as the roller clears it, then drifts from a misprint into register. */
    .wordmark > span,
    .jp {
      display: inline-block;
      animation: register 1100ms cubic-bezier(0.16, 1, 0.3, 1) calc(700ms + var(--i) * 70ms) both;
    }
    .jp {
      --i: 11;
    }
  }
  @keyframes roll {
    99% {
      filter: url(#ink-edge);
    }
    to {
      background-size: 110% 100%;
      filter: none;
    }
  }
  @keyframes register {
    from {
      opacity: 0;
      translate: 0.08em -0.05em;
      text-shadow: -0.07em 0.04em 0 var(--carton);
    }
    30% {
      opacity: 1;
    }
    to {
      translate: 0 0;
      text-shadow: 0 0 0 transparent;
    }
  }

  .foot {
    grid-area: foot;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    padding: 28px var(--pad) 40px;
  }
  .req {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    border: 2px solid var(--straw);
    font-size: 14px;
    font-weight: 700;
  }
  .req li {
    padding: 10px 14px;
  }
  .req li + li {
    border-left: 2px solid var(--straw);
  }
  .cta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .gh {
    border: 2px solid var(--straw);
  }
  .gh:hover {
    background: var(--straw);
    color: var(--carton);
  }

  /* Back panel */
  .back {
    display: flow-root;
    background: var(--paper);
    padding: 72px 56px 0;
  }
  section {
    margin-bottom: 96px;
    scroll-margin-top: 24px;
  }
  .flap {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 40px;
    padding-bottom: 14px;
    border-bottom: 4px solid var(--rule);
  }
  .flap h2 {
    font-size: clamp(30px, 3.4vw, 46px);
    font-weight: 900;
    font-stretch: 118%;
    line-height: 1;
  }
  .flap span {
    font: 600 13px var(--font-mono);
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .steps {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 3px solid var(--rule);
  }
  .steps li {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 190px;
    padding: 22px;
  }
  .steps li + li {
    border-left: 3px solid var(--rule);
  }
  .num {
    font-size: 64px;
    font-weight: 900;
    font-stretch: 125%;
    line-height: 1;
  }
  .steps h3 {
    margin-top: 6px;
    font-size: 20px;
    font-weight: 800;
  }
  .steps p {
    font-size: 15px;
    line-height: 1.45;
    color: var(--ink-soft);
  }


  .cli {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 40px;
    align-items: start;
  }
  .cli p {
    max-width: 60ch;
    margin-bottom: 14px;
    font-size: 17px;
    line-height: 1.55;
  }
  pre {
    padding: 22px;
    border-radius: 10px;
    overflow: auto;
    font: 500 13px/1.7 var(--font-mono);
  }
  pre .c {
    color: var(--straw-dim);
  }

  .priv {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 3px solid var(--rule);
  }
  .priv div {
    padding: 24px;
  }
  .priv div + div {
    border-left: 3px solid var(--rule);
  }
  .priv h3 {
    margin-bottom: 8px;
    font-size: 24px;
    font-weight: 900;
    font-stretch: 115%;
  }
  .priv p {
    font-size: 15px;
    line-height: 1.5;
    max-width: 50ch;
  }

  /* One column per kind, each growing downward; solid carton is shipping, a dashed outline is not yet available. */
  .tracks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 40px;
  }
  .track h3 {
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 3px solid var(--rule);
    font-size: 24px;
    font-weight: 900;
    font-stretch: 115%;
  }
  .track ul {
    list-style: none;
    display: grid;
    gap: 12px;
  }
  .track li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px 16px;
    padding: 18px 22px;
    border: 3px solid var(--carton);
  }
  .track .soon {
    border-style: dashed;
    border-color: var(--rule);
  }
  .tn {
    font-size: 26px;
    font-weight: 900;
    font-stretch: 120%;
    line-height: 1;
  }
  .track .carton .tn {
    color: var(--straw);
  }
  .ts {
    font: 600 13px var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .soon .ts {
    color: var(--muted);
  }
  .road-note {
    margin-top: 18px;
    font-size: 15px;
    line-height: 1.5;
    color: var(--ink-soft);
  }

  /* Bottom flap */
  .endflap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
    padding: 48px 56px;
  }
  .fname {
    font-size: 40px;
    font-weight: 900;
    font-stretch: 120%;
    line-height: 1.1;
  }
  .fine {
    margin-top: 8px;
    font: 500 12px/1.5 var(--font-mono);
  }
  .barcode {
    display: flex;
    gap: 2px;
    height: 56px;
    align-items: stretch;
  }
  .barcode i {
    background: var(--straw);
  }

  @media (max-width: 860px) {
    .box {
      grid-template-columns: minmax(0, 1fr);
    }
    .front {
      --pad: 16px;
      min-height: 0;
      grid-template-rows: none;
      grid-template-areas: 'stage' 'band' 'foot' 'top';
    }
    /* The strip would read as an eyebrow above the headline, so it moves to the bottom edge. */
    .top {
      padding-block: 20px;
      border-bottom: 0;
      border-top: 2px solid var(--straw-dim);
    }
    .stage {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 8px;
      padding-block: 24px 0;
    }
    .pitch {
      max-width: none;
    }
    h1 {
      font-size: clamp(36px, 8vw, 60px);
    }
    /* Art sits below the copy, never behind it. */
    .art {
      position: static;
      width: auto;
      max-width: min(72%, 420px);
      justify-self: center;
    }
    .back {
      padding: 56px 16px 0;
    }
    section {
      margin-bottom: 72px;
      scroll-margin-top: 56px;
    }
    .endflap {
      padding: 40px 16px;
    }
    .steps {
      grid-template-columns: 1fr 1fr;
    }
    .steps li:nth-child(3) {
      border-left: 0;
    }
    .steps li:nth-child(n + 3) {
      border-top: 3px solid var(--rule);
    }
    .priv {
      grid-template-columns: 1fr;
    }
    .priv div + div {
      border-left: 0;
      border-top: 3px solid var(--rule);
    }
    .cli {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 520px) {
    .steps {
      grid-template-columns: 1fr;
    }
    .steps li + li {
      border-left: 0;
      border-top: 3px solid var(--rule);
    }
    .steps li {
      min-height: 0;
    }
  }
</style>
