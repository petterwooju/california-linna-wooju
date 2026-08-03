# California, Linna & Wooju

An interactive California road-trip field journal with a day-by-day itinerary,
driving times, hotel details, photography, and a cross-border-friendly Leaflet
map.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Verify

```bash
npm test
npm run lint
```

## Cloudflare deployment

The production site runs as a Cloudflare Worker with static assets. GitHub is
the source repository; Cloudflare Workers Builds installs dependencies, builds,
and deploys the site after changes are pushed to `main`.

Recommended Workers Builds settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Production branch: `main`

For an authenticated one-off deployment from a local checkout:

```bash
npm run deploy
```

The Worker configuration binds the production custom domain
`usa.mindtypetest.com`.
