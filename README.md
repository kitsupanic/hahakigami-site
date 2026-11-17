# Hahakigami website

Static SvelteKit site (Svelte 5, `adapter-static`, fully prerendered). The app lives in [kitsupanic/Hahakigami](https://github.com/kitsupanic/Hahakigami).

```sh
pnpm install
pnpm dev        # http://localhost:4620
pnpm check      # svelte-check
pnpm build      # writes build
pnpm preview
```

## Configuration

`src/lib/config.ts`:

- `DOWNLOAD_URL`: the latest GitHub release; `null` renders the dashed "coming soon" Download button instead.
- `SITE_URL`: `https://hahakigami.com`, so the Open Graph image URL is absolute.

## Deploy to Cloudflare Pages

Served at `https://hahakigami.com`; `hahakigami.app` redirects there.

- Root directory: repository root
- Build command: `pnpm build`
- Build output directory: `build`
