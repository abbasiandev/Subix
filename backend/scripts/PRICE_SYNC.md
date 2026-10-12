# Price synchronization

The public catalog uses `frontend/data/price-overrides.json` as a generated
price-only overlay. The sync tool never copies source HTML, source URLs,
source branding, descriptions, or article content into the frontend.

For production one-click updates, set `PRICE_SOURCE_URL` and
`PRICE_SOURCE_PATHS` in the backend environment and use the protected
`/admin` page. The button calls the backend, fetches the private catalog at
runtime, matches products, updates the purchase database, and stores only
numeric price overrides. No frontend build or repository change is required
for later updates.

## One-time setup

Copy `backend/.env.price-sync.example` to `backend/.env.price-sync` and set
`PRICE_SOURCE_URL` to the private reference catalog. The file is ignored by
git. Keep the value out of frontend environment variables and committed files.

Install the scraper dependencies once:

```bash
cd backend
pip install -r requirements-scraper.txt
```

## Review and apply

Run a dry-run first:

```bash
cd backend
python -m scripts.sync_prices
```

After reviewing the proposed matches, write the frontend overlay:

```bash
python -m scripts.sync_prices --apply
```

The resulting diff contains only product slugs and numeric prices. Commit and
deploy that generated file through the normal frontend deployment workflow.

To inspect a saved JSON export instead of making a network request:

```bash
python -m scripts.sync_prices --input path/to/products.json
```

If the backend database is also used for catalog/API purchases, update both
surfaces in one reviewed run:

```bash
python -m scripts.sync_prices --target both --apply
```

The backend target requires the normal backend environment (`TURSO_URL` and
`TURSO_AUTH_TOKEN`). It is never enabled by the frontend build.

## Production phone workflow

Configure these values in the backend hosting environment, not in the
repository or frontend build:

```env
PRICE_SOURCE_URL=https://your-private-reference-host.example
PRICE_SOURCE_PATHS=/,/category/ai,/category/edit-and-design,/category/video,/category/audio,/category/learning,/category/cloud-storage,/category/useful,/category/seo
PRICE_SYNC_MIN_SCORE=0.62
PRICE_SYNC_MIN_MATCHES=1
ADMIN_SECRET=use-a-long-random-secret
```

After deploying the backend and frontend, open the public admin route on a
phone:

```text
https://your-frontend.example/Subix/admin
```

Enter the admin secret once in that browser session, then tap
`به‌روزرسانی قیمت‌ها`. The server fetches the configured private source and
updates the purchase database. The browser receives only the result count and
the product rows; it never receives the source URL or source HTML.

The normal user catalog reads the updated database prices. The homepage and
static product details also request the numeric slug/price overlay at runtime,
so a new frontend build is not needed for later price refreshes.
