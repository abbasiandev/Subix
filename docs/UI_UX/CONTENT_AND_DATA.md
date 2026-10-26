# Fluxo content and data rules

## 1. Positioning

Canonical positioning:

> Fluxo helps visitors compare and choose AI accounts faster.

The Fluxo name means flow and is used as the product metaphor for a clear path
from a visitor's need, through comparison, to a suitable account. Public copy
should make this meaning understandable through the actual journey:
`نیاز → مقایسه → انتخاب`. Avoid presenting Fluxo as an unrelated generic
license catalogue or explaining the name only as an abstract slogan.

The catalog supports all kinds of AI accounts: text/research, image, video, audio, coding, development, and related creative AI tools. Existing non-AI inventory may be exposed, but it is secondary and must appear under `سایر سرویس‌های دیجیتال`.

The blog exists to improve purchase decisions, not to act as an unrelated news feed.

## 2. Product source

Canonical local source: `frontend/data/products.ts`.

The product interface currently contains:

```ts
interface Product {
  id: number;
  name: string;
  nameEn: string;
  slug: string;
  brandLogoPath: string;
  category: 'ai' | 'music' | 'devTools' | 'design' | 'media' | 'productivity';
  price: number;
  originalPrice?: number | null;
  hasDiscount: boolean;
  duration: string;
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  popular?: boolean;
}
```

When a backend product is introduced, normalize it before passing it to canonical components. Do not create a second card-specific product shape.

## 3. AI scope

The current explicit classification is the `AI_PRODUCT_IDS` set and `isAiProduct()` in `frontend/data/products.ts`.

Rules:

- New AI account: add its id to the set after verifying the product’s actual purpose.
- New non-AI digital service: leave it outside the set and make sure it appears under the secondary scope.
- Do not infer AI membership from a marketing adjective in a product name.
- If classification needs to grow beyond a manual set, replace it with a typed field and update this document.

## 4. Category labels

Current product category keys and display labels:

| Key | Current label |
|---|---|
| `ai` | `هوش مصنوعی` |
| `design` | `طراحی` |
| `devTools` | `برنامه‌نویسی` |
| `music` | `موسیقی` |
| `media` | `فیلم و سریال` |
| `productivity` | `بهره‌وری` |

If the taxonomy is expanded, keep internal keys stable and add a single mapping layer. Never print raw backend category keys to visitors.

## 5. Product copy contract

Every new product needs:

| Field | Rule |
|---|---|
| Persian name | Clear, factual, readable title |
| English name | Verified provider/product name, rendered LTR |
| Slug | Stable URL-safe identifier; changing it needs a redirect plan |
| Logo path | Local or approved remote asset; pass through `asset()` |
| Category | One known internal key and display label |
| Price | Numeric value in Toman; use locale formatting at render time |
| Original price | Only when verified and paired with a real discount |
| Discount | Derived from price fields, never typed manually |
| Duration | Current display duration; keep product and detail descriptions consistent |
| Description | Short factual explanation of primary use |
| Features | Three to six verified capabilities |
| Specifications | Access type, duration, platform, support, or other known facts |
| Popular flag | Only if backed by a real business definition; do not imply popularity from position |

## 6. Claims policy

Do not invent or repeat unsupported claims such as:

- original/legal/authentic
- instant activation
- 24/7 support
- guaranteed refund
- unlimited usage
- dedicated account
- private account
- specific token or model limits
- customer count
- ratings
- discount percentage
- payment security

If the source does not verify a claim, use neutral copy such as:

- `جزئیات فعال‌سازی را بررسی کنید`
- `شرایط دسترسی در صفحه محصول آمده است`
- `برای اطلاعات تکمیلی در تلگرام سؤال کنید`
- `این مسیر در نسخه فعلی نمایشی است`

## 7. Pricing presentation

The UI should display one normalized pricing block:

```text
قیمت فعلی
[numeric price] تومان
مدت: [duration]
تمدید: [known / unknown]
```

Original price and discount appear only when both the source and business state are valid. Editorial content must never contain a stale hard-coded offer.

## 8. Guide content contract

Every commercial guide should answer:

1. What does the tool do?
2. Who should consider it?
3. What job or output is it best suited for?
4. Which product/account does Fluxo list?
5. What should the visitor compare before choosing?
6. What limitations or unknowns matter?
7. What is the current product link?
8. What is the last-reviewed date?

Price, duration, availability, activation, and discount belong to the product source. A guide can explain how to interpret those fields but should not duplicate volatile values.

## 9. Blog datasets

The repository currently contains `frontend/data/articles.ts` and `frontend/data/blog-posts.ts`. The blog index merges them, removes duplicate slugs, and excludes unrelated non-AI posts from the decision-guide listing.

Until the datasets are formally merged:

- preserve slug uniqueness
- use the unified `BlogPost` shape at the route boundary
- map `guide` to `guides`, `comparison` to `comparison`, and other article categories to the intended editorial group
- do not create a third blog dataset

## 10. Persian and Latin formatting

- Persian UI copy uses Persian digits where already established by the page.
- Product names, model names, usernames, URLs, and phone numbers use `dir="ltr"` or a `.dir-ltr` utility.
- Add spacing around Latin names in Persian sentences.
- Do not translate official product names into unstable invented spellings.
- Use `Intl.DateTimeFormat('fa-IR')` for dates shown to Persian users.
