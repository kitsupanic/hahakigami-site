<script lang="ts">
  import { onMount } from 'svelte';
  import { replaceState } from '$app/navigation';

  const links = [
    ['steps', 'Steps'],
    ['inside', 'Inside'],
    ['bench', 'Benchmarks'],
    ['cli', 'CLI & MCP'],
    ['privacy', 'Privacy'],
    ['roadmap', 'Roadmap']
  ];

  // The first viewport (hero) counts as Steps, so one tab is always current.
  let active = $state<string>('steps');

  // Glide to the target ourselves: the router's hash navigation jumps, and some browsers
  // (Vivaldi on macOS) ignore behavior: 'smooth', so the page animates the scroll itself.
  let glide = 0;
  let stopGlide = () => {};
  function go(e: MouseEvent, id: string) {
    const el = document.getElementById(id);
    if (!el || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    const to = id === 'top' ? 0 : Math.min(max, Math.max(0, el.getBoundingClientRect().top + scrollY - margin));
    replaceState(id === 'top' ? location.pathname : `#${id}`, {});
    stopGlide();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return scrollTo({ top: to, behavior: 'instant' });
    const from = scrollY;
    const ms = Math.min(900, 350 + Math.abs(to - from) / 8);
    const start = performance.now();
    // The reader's own wheel, touch or key input wins over the glide.
    const input = new AbortController();
    stopGlide = () => (cancelAnimationFrame(glide), input.abort());
    for (const t of ['wheel', 'touchstart', 'keydown']) addEventListener(t, stopGlide, { passive: true, signal: input.signal });
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      scrollTo({ top: t < 1 ? from + (to - from) * (1 - Math.pow(2, -10 * t)) : to, behavior: 'instant' });
      if (t < 1) glide = requestAnimationFrame(step);
      else input.abort();
    };
    glide = requestAnimationFrame(step);
  }

  // On phones the tabs are a sideways-scrolling strip; keep the current one in view.
  let nav: HTMLElement;
  $effect(() => {
    const a = nav.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!a || nav.scrollWidth <= nav.clientWidth) return;
    const n = nav.getBoundingClientRect(), r = a.getBoundingClientRect();
    nav.scrollBy({ left: r.left - n.left - (n.width - r.width) / 2 });
  });

  onMount(() => {
    // A thin band across the middle of the viewport decides the current section; the hero maps to Steps.
    // The last section never reaches that band, so the bottom of the page selects it instead.
    let mid = 'steps';
    const last = links[links.length - 1][0];
    const update = () => {
      const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      active = atEnd ? last : mid;
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) mid = e.target.id === 'top' ? 'steps' : e.target.id;
        update();
      },
      { rootMargin: '-45% 0px -54% 0px' }
    );
    for (const id of ['top', ...links.map(([id]) => id)]) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    addEventListener('scroll', update, { passive: true });
    return () => {
      io.disconnect();
      removeEventListener('scroll', update);
    };
  });
</script>

<aside class="spine carton">
  <a class="mark" href="#top" onclick={(e) => go(e, 'top')} aria-label="Hahakigami, back to top"
    ><img src="/favicon.png" alt="" width="56" height="56" /></a
  >
  <nav aria-label="Sections" bind:this={nav}>
    {#each links as [id, label] (id)}
      <a href="#{id}" onclick={(e) => go(e, id)} aria-current={active === id ? 'true' : undefined}>{label}</a>
    {/each}
  </nav>
  <a class="name" href="#top" onclick={(e) => go(e, 'top')} aria-label="Hahakigami, back to top">Hahakigami</a>
</aside>

<style>
  .spine {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: clamp(12px, 2vh, 24px);
    padding: clamp(16px, 3vh, 28px) 0;
    border-right: 4px solid var(--cord);
  }
  .mark {
    display: block;
    border-radius: 12px;
  }
  .mark img {
    display: block;
    width: clamp(40px, 6vh, 56px);
    height: auto;
  }
  .mark:hover img {
    transform: rotate(-8deg);
  }
  @media (prefers-reduced-motion: no-preference) {
    .mark img {
      transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
    }
  }
  /* Vertical text, rotated so it reads bottom-to-top; the row direction then stacks items along the spine. */
  nav {
    display: flex;
    flex-direction: row;
    gap: 6px;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
  nav a {
    white-space: nowrap;
    padding: clamp(4px, 0.8vh, 10px) 6px;
    font-weight: 800;
    font-size: clamp(10px, 1.2vh, 13px);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    text-decoration: none;
  }
  nav a:hover {
    background: var(--straw);
    color: var(--carton);
  }
  nav a[aria-current='true'] {
    background: var(--cord);
    color: var(--on-red);
  }
  .name {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-weight: 900;
    /* Scales with screen height so the spine fits on laptop screens. */
    font-size: clamp(14px, 2vh, 26px);
    font-stretch: 125%;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
  }
  .name:hover {
    text-decoration: underline 3px var(--cord);
    text-underline-offset: 6px;
  }

  /* Very short windows: the name is already on the red band, so drop it from the spine. */
  @media (max-height: 760px) and (min-width: 861px) {
    .name {
      display: none;
    }
  }

  @media (max-width: 860px) {
    .spine {
      height: auto;
      z-index: 5;
      flex-direction: row;
      padding: 8px 16px;
      border-right: 0;
      border-bottom: 4px solid var(--cord);
    }
    .mark,
    .name {
      display: none;
    }
    nav {
      writing-mode: horizontal-tb;
      transform: none;
      width: 100%;
      justify-content: space-between;
      overflow-x: auto;
    }
    nav a {
      padding: 10px 4px;
      font-size: 11px;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }
  }
  @media (max-width: 400px) {
    nav a {
      padding: 10px 2px;
      letter-spacing: 0;
    }
  }
</style>
