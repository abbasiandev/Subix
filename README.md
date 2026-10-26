# Fluxo — AI Account Marketplace Telegram Mini App

## Launch online — free, no credit card

Use **PythonAnywhere** for the backend and expose it through `https://fluxo.ir`.

### A. Backend (PythonAnywhere)

```bash
# On PythonAnywhere Bash:
cd /home/subix/mybot
git pull origin main
source ~/.virtualenvs/subix/bin/activate
/home/subix/.virtualenvs/subix/bin/pip install -r backend/requirements.txt
```

**Web tab** settings:

| Setting | Value |
|---------|--------|
| Source / Working dir | `/home/subix/mybot/backend` |
| Python | **3.10** |
| Virtualenv | `/home/subix/.virtualenvs/subix` |

**`.env`** at `/home/subix/mybot/backend/.env`:

```env
BOT_TOKEN=...
SECRET_KEY=...
TURSO_URL=https://subixdb-lumaticgroup.aws-eu-west-1.turso.io
TURSO_AUTH_TOKEN=...
FRONTEND_URL=https://fluxo.ir
ENABLE_WEBHOOK=false
DEBUG=false
SMS_IR_API_KEY=...
SMS_IR_TEMPLATE_ID=123456
SMS_IR_PARAMETER_NAME=Code
```

`SMS_IR_TEMPLATE_ID` must be an approved SMS.ir verification template, and
`SMS_IR_PARAMETER_NAME` must exactly match its placeholder name (for example,
`Code` for `#Code#`). Keep the API key only in the backend environment; never
put it in `frontend/.env.local` or a client bundle. The phone login page is
available at `https://fluxo.ir/login-phone/`.

Define each `SMS_IR_*` variable only once in the backend `.env`. If a variable
is repeated, the last value wins; a later `SMS_IR_TEMPLATE_ID=0` disables OTP
delivery and produces the generic “ارسال پیامک موقتاً در دسترس نیست” error.

**WSGI** file `/var/www/subix_pythonanywhere_com_wsgi.py` — copy from `backend/deploy/pythonanywhere_wsgi.py`

Click **Reload** → test: `https://fluxo.ir/health`

Seed products once from your PC: `cd backend && python -m scripts.seed`

### B. Frontend (GitHub Pages)

1. Hosting environment → `API_URL` = `https://fluxo.ir`
2. **Actions** → **Deploy Frontend → GitHub Pages** → **Run workflow**
3. Site: `https://fluxo.ir/`

### C. Telegram

**BotFather (manual):**
- Menu Button → URL: `https://fluxo.ir/`
- Menu Button text: `فروشگاه فلوکسو`

**`/start` message and inline buttons** come from the backend (`backend/app/telegram/handlers.py`). They only work if the webhook is enabled.

On PythonAnywhere, in `/home/subix/mybot/backend/.env`:

```env
ENABLE_WEBHOOK=true
WEBHOOK_URL=https://fluxo.ir/webhook
```

Reload the web app, then register the webhook once:

```bash
cd /home/subix/mybot/backend
source ~/.virtualenvs/subix/bin/activate
python -m scripts.setup_webhook
```

If you get `httpx.ProxyError` on PythonAnywhere, set the webhook **from your Mac** (replace `TOKEN`):

```bash
curl -sS "https://api.telegram.org/botTOKEN/setWebhook" \
  -d "url=https://fluxo.ir/webhook" \
  -d "drop_pending_updates=true"
```

You should see `"ok":true`. Then send `/start` in Telegram.

---

## Stack
| Layer | Tool | Host |
|---|---|---|
| Frontend | Next.js 14 (static export) | GitHub Pages |
| Backend | FastAPI + httpx | PythonAnywhere (free) |
| Database | Turso (libSQL) | Turso Cloud |

## Architecture
```
Telegram User
    │
    ▼
aiogram v3 (bot webhook)
    │
    ▼
FastAPI (REST API)
    │
    ├── /api/v1/auth       ← Telegram login widget / initData
    ├── /api/v1/products   ← list, detail
    ├── /api/v1/orders     ← create, list, detail
    ├── /api/v1/wallet     ← balance, topup
    └── /api/v1/users      ← profile
    │
    ▼
Turso (libSQL — SQLite edge DB)
```

## Auth Flow
1. User opens Mini App via bot button
2. `Telegram.WebApp.initData` sent to `/api/v1/auth/telegram`
3. Backend verifies HMAC signature (no password, no OTP)
4. User auto-created on first login using `telegram_id` + `phone_number`
5. JWT returned → stored in memory (no localStorage)

## Getting Started

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in your values
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000` while developing. The frontend is a Next.js static export served from the root of `https://fluxo.ir/`.

### WebGL hero

The homepage hero is split into three layers:

1. A semantic text layer that renders immediately and remains usable without JavaScript or WebGL.
2. A CSS grid and gradient fallback that supplies the visual atmosphere on unsupported or low-power devices.
3. A lazily initialized Three.js scene with a fresnel/noise shader shell, orbital geometry, and a pointer-reactive particle field.

The scene caps device pixel ratio at 2, pauses when the tab is hidden or the hero is off screen, follows scroll and pointer position, and disposes its geometries and materials on teardown. Reduced-motion preferences slow the scene and remove CSS motion effects.

To intentionally use the static fallback during local development:

```bash
cd frontend
NEXT_PUBLIC_DISABLE_WEBGL=1 npm run dev
```

The same flag can be supplied to the production build when a deployment should omit the WebGL renderer:

```bash
NEXT_PUBLIC_DISABLE_WEBGL=1 npm run build
```

## Folder Structure
```
subix/
├── backend/
│   ├── app/
│   │   ├── main.py              ← FastAPI app entry
│   │   ├── core/
│   │   │   ├── config.py        ← settings (pydantic-settings)
│   │   │   ├── security.py      ← JWT + Telegram HMAC verify
│   │   │   └── deps.py          ← FastAPI dependencies
│   │   ├── db/
│   │   │   ├── client.py        ← Turso libSQL client
│   │   │   └── migrations.py    ← table creation
│   │   ├── models/              ← SQLAlchemy-style dataclasses
│   │   ├── schemas/             ← Pydantic v2 schemas
│   │   ├── services/            ← business logic
│   │   ├── api/v1/
│   │   │   └── endpoints/       ← route handlers
│   │   └── bot/
│   │       ├── main.py          ← aiogram app
│   │       ├── handlers/        ← message/callback handlers
│   │       ├── keyboards/       ← inline + reply keyboards
│   │       └── middlewares/     ← auth, throttle
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── pages/
    │   ├── index.tsx            ← store (فروشگاه)
    │   ├── profile.tsx          ← profile (پروفایل)
    │   ├── dashboard.tsx        ← dashboard (داشبورد)
    │   └── contact.tsx          ← contact (تماس با ما)
    ├── components/
    ├── styles/
    ├── next.config.js
    └── package.json
```
