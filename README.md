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

- `DOWNLOAD_URL`: the latest GitHub release.
- `VERSION`: shown on the box top and in the footer; bump it with each app release.
- `SITE_URL`: `https://hahakigami.com`, so the Open Graph image URL is absolute.

## Deploy to Cloudflare Workers

Served at `https://hahakigami.com` as static assets; `wrangler.jsonc` holds the Worker name, the `build` folder and the custom domain.

- From Cloudflare (Workers Builds, connected to this repository): build command `pnpm build`, deploy command `pnpm exec wrangler deploy`.
- By hand: `pnpm build && pnpm exec wrangler deploy`.

`wrangler` is pinned in `devDependencies`, so every deploy uses the same version.

`hahakigami.app`, `www.hahakigami.app` and `www.hahakigami.com` redirect here through the small Worker in `redirect/`. It is deployed by hand from the repository root: `pnpm exec wrangler deploy --config redirect/wrangler.jsonc`.
