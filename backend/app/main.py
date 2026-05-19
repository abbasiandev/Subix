from contextlib import asynccontextmanager

from aiogram import Bot, Dispatcher
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.router import api_router
from app.bot.handlers.start import router as start_router
from app.bot.middlewares.throttle import ThrottleMiddleware
from app.core.config import settings
from app.db.client import run_migrations

# ── Bot setup ────────────────────────────────────────────────────────────────

bot = Bot(token=settings.bot_token)
dp = Dispatcher()
dp.message.middleware(ThrottleMiddleware())
dp.include_router(start_router)


# ── Lifespan ─────────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run DB migrations on startup
    await run_migrations()

    # Set webhook
    await bot.set_webhook(
        url=f"{settings.webhook_url}",
        drop_pending_updates=True,
    )
    yield
    await bot.delete_webhook()
    await bot.session.close()


# ── FastAPI app ───────────────────────────────────────────────────────────────

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    docs_url="/docs" if settings.debug else None,
    redoc_url=None,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "https://web.telegram.org"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


# ── Telegram webhook route ────────────────────────────────────────────────────

@app.post("/webhook")
async def telegram_webhook(request: Request):
    update = await request.json()
    from aiogram.types import Update
    tg_update = Update(**update)
    await dp.feed_update(bot, tg_update)
    return JSONResponse({"ok": True})


# ── Health check ──────────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    return {"status": "ok", "app": settings.app_name}
