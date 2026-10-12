# Price synchronization

The public catalog uses `frontend/data/price-overrides.json` as a generated
price-only overlay. The sync tool never copies source HTML, source URLs,
source branding, descriptions, or article content into the frontend.

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
