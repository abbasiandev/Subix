# Subix — AI Account Marketplace Telegram Mini App

## Stack
| Layer | Tool | Host |
|---|---|---|
| Frontend | Next.js 14 (static export) | GitHub Pages |
| CI/CD | GitHub Actions | GitHub |
| Backend | FastAPI + aiogram v3 | PythonAnywhere |
| Database | Turso (libSQL) | Turso Cloud |
| SSL/DNS | Cloudflare | Cloudflare |
| Analytics | Google Analytics + Microsoft Clarity | CDN |
| Push | OneSignal | CDN |
| Email | Yandex Mail | Yandex |

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
