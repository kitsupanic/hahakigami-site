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

## Deploy to Cloudflare Workers

Served at `https://hahakigami.com` as static assets; `wrangler.jsonc` holds the Worker name, the `build` folder and the custom domain.

- From Cloudflare (Workers Builds, connected to this repository): build command `pnpm build`, deploy command `npx wrangler deploy`.
- By hand: `pnpm build && pnpm dlx wrangler deploy`.

`hahakigami.app` redirects here through the small Worker in `redirect/`. It is deployed by hand: `cd redirect && pnpm dlx wrangler deploy`.
