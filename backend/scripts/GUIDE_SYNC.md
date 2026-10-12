# Guide synchronization

The homepage `۰۴ / راهنمای انتخاب` section is the published guide feed in
`frontend/data/guides.json`. It uses original Subix editorial copy and local
SVG covers. The updater reads only link titles and product identity hints from
the private reference feed; it does not copy article prose, remote images,
source URLs, hostnames, or source branding.

## Recommended workflow: one private source file, one mergeable public file

### 1. Export all private guide data

With `GUIDE_SOURCE_URL` configured in `backend/.env.guide-sync`, run:

```bash
cd backend
python -m scripts.export_guides_source
```

This writes:

```text
backend/private/guide-source.json
```

The file contains private article text, dates, image URLs, article URLs, and
product-link hints so it can be given to an AI editor. It is gitignored and
must never be copied into `frontend/` or committed.

Give `backend/private/guide-source.json` to your AI editor and ask it to keep
the `source*` fields as research while filling the `editorial` object for each
guide. The AI should produce original Persian content, not a translation or
close rewrite. The expected shape is:

```json
"editorial": {
  "title": "عنوان کاملاً جدید",
  "excerpt": "خلاصه مستقل",
  "category": "guide",
  "tags": ["انتخاب", "بهره‌وری"],
  "content": "## تیتر اول\n\nمتن مستقل راهنما..."
}
```

### 2. Generate the single public file

After the AI has updated the private JSON, preview the result:

```bash
python -m scripts.sync_guides \
  --input private/guide-source.json \
  --ai \
  --single-file
```

Apply it:

```bash
python -m scripts.sync_guides \
  --input private/guide-source.json \
  --ai \
  --single-file \
  --apply
```

If every entry already has a filled `editorial` object, the command uses that
AI-edited content directly and does not call an AI API. If an entry has no
`editorial` content, `--ai` generates it through `OPENAI_API_KEY`.

`--single-file` embeds newly generated SVG covers as data URLs inside
`frontend/data/guides.json`. Therefore the only file that needs to be merged
to `main` for new guide content is:

```text
frontend/data/guides.json
```

No private source export, source image, or separate generated cover needs to
be merged.

## AI-generated update directly from a private feed

Copy `backend/.env.guide-sync.example` to `backend/.env.guide-sync`, set the
private host, and preview the discovered candidates:

```bash
cd backend
python -m scripts.sync_guides --ai
```

Apply after reviewing:

```bash
python -m scripts.sync_guides --ai --apply
```

The direct `--ai` mode fetches the private article into memory, asks the configured
AI provider to create a new Persian guide, validates that the output contains
no private-source markers, and discards the source text. Existing guides are
append-only and never overwritten. Each new cover is generated locally from
the new guide identity.

Required private settings in `backend/.env.guide-sync`:

```env
GUIDE_SOURCE_URL=https://your-private-reference-host.example
GUIDE_SOURCE_PATHS=/blog
OPENAI_API_KEY=...
AI_MODEL=gpt-4o-mini
```

You can use any OpenAI-compatible endpoint by setting `AI_API_URL`.

Use `--limit 1` while testing to generate only one guide:

```bash
python -m scripts.sync_guides --ai --limit 1
```

## Add a custom guide

Create a JSON array with original fields:

```json
[
  {
    "slug": "choose-audio-for-creators",
    "title": "برای سازندگان محتوای صوتی",
    "excerpt": "یک خلاصه مستقل برای کارت راهنما.",
    "category": "guide",
    "imagePath": "/selection-guides/choose-audio-for-creators.svg",
    "readTime": 3,
    "publishDate": "2026-10-11",
    "author": "تحریریه سابیکس",
    "tags": ["صدا", "تولید"],
    "productSlugs": ["suno-ai-pro", "epidemic-sound"],
    "content": "متن کاملاً مستقل راهنما با پاراگراف‌های جدا."
  }
]
```

Preview and append it with:

```bash
python -m scripts.sync_guides --input path/to/guides.json --apply
```

The generated SVG cover is local and source-independent. Commit only the
published JSON entry and its generated cover.
