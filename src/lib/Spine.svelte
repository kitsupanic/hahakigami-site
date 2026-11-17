<script lang="ts">
  import { onMount } from 'svelte';

  const links = [
    ['steps', 'Steps'],
    ['inside', 'Inside'],
    ['bench', 'Benchmarks'],
    ['cli', 'CLI & MCP'],
    ['privacy', 'Privacy']
  ];

  // The first viewport (hero) counts as Steps, so one tab is always current.
  let active = $state<string>('steps');

  onMount(() => {
    // A thin band across the middle of the viewport decides the current section; the hero maps to Steps.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) active = e.target.id === 'top' ? 'steps' : e.target.id;
      },
      { rootMargin: '-45% 0px -54% 0px' }
    );
    for (const id of ['top', ...links.map(([id]) => id)]) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  });
</script>

<aside class="spine carton">
  <img class="mark" src="/favicon.png" alt="" width="56" height="56" />
  <nav aria-label="Sections">
    {#each links as [id, label] (id)}
      <a href="#{id}" aria-current={active === id ? 'true' : undefined}>{label}</a>
    {/each}
  </nav>
  <span class="name">Hahakigami</span>
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
    width: clamp(40px, 6vh, 56px);
    height: auto;
    border-radius: 12px;
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
    padding: clamp(6px, 1.1vh, 10px) 6px;
    font-weight: 800;
    font-size: clamp(11px, 1.5vh, 13px);
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
    font-size: clamp(16px, 2.4vh, 26px);
    font-stretch: 125%;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* Very short windows: the name is already on the red band, so drop it from the spine. */
  @media (max-height: 720px) and (min-width: 861px) {
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
