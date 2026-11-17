<script lang="ts">
  import DownloadButton from '#lib/DownloadButton.svelte';
  import Spine from '#lib/Spine.svelte';
  import SpecSheet from '#lib/SpecSheet.svelte';
  import Treemap from '#lib/Treemap.svelte';
  import { GITHUB_URL, SITE_URL } from '#lib/config.ts';

  const title = 'Hahakigami — disk space analyzer for macOS';
  const description =
    'Hahakigami is a local disk-space analyzer for macOS. It scans a disk or folder, shows storage as a size-sorted tree, treemap or sunburst, lets you inspect files and moves a reviewed selection to the macOS Trash.';
  const image = `${SITE_URL}/guardian-1440.webp`;
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
            sizes="(max-width: 860px) 100vw, 600px"
            width="720"
            height="720"
            fetchpriority="high"
            alt="The Guardian, a broom spirit with a dark face, straw-coloured bristles and a red knotted cord."
          />
        </div>
        <div class="band">
          <div class="band-in" aria-hidden="true">
            <span class="wordmark">HAHAKIGAMI</span><span class="jp" lang="ja">箒神</span>
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
            <a class="gh" href={GITHUB_URL}>View on GitHub</a>
          </div>
        </div>
        <div class="top"><span>Disk space analyzer · macOS</span><span class="ver">v0.1</span></div>
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
              <p>Tree, treemap or sunburst. On disk or logical size. Search every name.</p>
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
          <div class="screen">
            <div><Treemap /></div>
            <ul class="feat">
              <li>
                <h3>Honest sizes</h3>
                <p>Clones of the same APFS blocks are counted once. On disk and logical sizes stay separate.</p>
              </li>
              <li>
                <h3>Three views</h3>
                <p>Size-sorted tree, treemap and sunburst, with breadcrumbs and back/forward.</p>
              </li>
              <li>
                <h3>Saved scans</h3>
                <p>Keep a scan and browse it later without rescanning.</p>
              </li>
              <li>
                <h3>Quick Look &amp; Finder</h3>
                <p>Inspect any file, copy its path, reveal it in Finder.</p>
              </li>
            </ul>
          </div>
        </section>

        <section id="bench">
          <div class="flap"><h2>Spec sheet</h2><span>Measured 19 Oct 2026 · warm medians</span></div>
          <div class="spec">
            <SpecSheet />
            <div class="panel reqs">
              <h3>Requirements</h3>
              <dl>
                <dt>System</dt>
                <dd>macOS 14 Sonoma or later</dd>
                <dt>Access</dt>
                <dd>Full Disk Access recommended; you turn it on in System Settings</dd>
                <dt>Network</dt>
                <dd>None. No accounts, no analytics</dd>
                <dt>Built with</dt>
                <dd>Rust, Tauri 2 and Svelte 5</dd>
                <dt>License</dt>
                <dd>MIT, open source</dd>
              </dl>
            </div>
          </div>
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
      </div>
    </main>

    <footer class="endflap carton">
      <div>
        <p class="fname">Hahakigami</p>
        <p class="fine">© 2026 Hahakigami contributors · MIT · v0.1 performance prototype</p>
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
    max-width: 1320px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 96px minmax(0, 1fr);
  }

  /* Front panel */
  .front {
    --pad: 56px;
    --art: min(54vw, 720px);
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
    max-width: calc(min(100vw - 96px, 1224px) + 30px - 0.95 * var(--art));
  }
  h1 {
    font-size: clamp(34px, 4vw, 56px);
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
    background: var(--cord);
    color: var(--on-red);
  }
  .band-in {
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
    display: inline-flex;
    align-items: center;
    padding: 16px 22px;
    border: 2px solid var(--straw);
    font-weight: 800;
    font-size: 17px;
    line-height: 1;
    letter-spacing: 0.02em;
    text-decoration: none;
  }
  .gh:hover {
    background: var(--straw);
    color: var(--carton);
  }

  /* Back panel */
  .back {
    display: flow-root;
    background: var(--paper);
    padding: 72px var(--pad, 56px) 0;
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

  .screen {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 32px;
    align-items: start;
  }
  .feat {
    list-style: none;
    border-top: 3px solid var(--rule);
  }
  .feat li {
    position: relative;
    padding: 16px 0 16px 24px;
    border-bottom: 1px solid color-mix(in srgb, var(--ink) 33%, transparent);
  }
  .feat li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 23px;
    width: 10px;
    height: 10px;
    background: var(--ink);
  }
  .feat h3 {
    font-size: 18px;
    font-weight: 800;
  }
  .feat p {
    margin-top: 4px;
    font-size: 16px;
    line-height: 1.45;
    max-width: 60ch;
  }

  .spec {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 40px;
    align-items: start;
  }
  .reqs dl {
    display: grid;
    grid-template-columns: auto 1fr;
    margin-top: 8px;
    font-size: 15px;
  }
  .reqs dt,
  .reqs dd {
    padding: 10px 0;
    border-bottom: 1px solid color-mix(in srgb, var(--ink) 27%, transparent);
  }
  .reqs dt {
    padding-right: 18px;
    font-weight: 800;
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
    .screen,
    .spec,
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
