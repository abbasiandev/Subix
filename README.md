# Subix — AI Account Marketplace Telegram Mini App

## Launch online — free, no credit card

Use **PythonAnywhere** (you already have `subix.pythonanywhere.com`).

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
FRONTEND_URL=https://abbasiandev.github.io/Subix
ENABLE_WEBHOOK=false
DEBUG=false
```

**WSGI** file `/var/www/subix_pythonanywhere_com_wsgi.py` — copy from `backend/deploy/pythonanywhere_wsgi.py`

Click **Reload** → test: `https://subix.pythonanywhere.com/health`

Seed products once from your PC: `cd backend && python -m scripts.seed`

### B. Frontend (GitHub Pages)

1. GitHub **Secrets** → `API_URL` = `https://subix.pythonanywhere.com`
2. **Actions** → **Deploy Frontend → GitHub Pages** → **Run workflow**
3. Site: `https://abbasiandev.github.io/Subix/`

### C. Telegram

**BotFather (manual):**
- Menu Button → URL: `https://abbasiandev.github.io/Subix/`
- Menu Button text: `🛒 فروشگاه سابیکس`

**`/start` message and inline buttons** come from the backend (`backend/app/telegram/handlers.py`). They only work if the webhook is enabled.

On PythonAnywhere, in `/home/subix/mybot/backend/.env`:

```env
ENABLE_WEBHOOK=true
WEBHOOK_URL=https://subix.pythonanywhere.com/webhook
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
  -d "url=https://subix.pythonanywhere.com/webhook" \
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
