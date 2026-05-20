import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.router import api_router
from app.core.config import settings
from app.db.client import close_db, run_migrations
from app.telegram.api import close_telegram, delete_webhook, set_webhook
from app.telegram.handlers import handle_update

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await run_migrations()
    except Exception as exc:
        logger.error("DB migration failed: %s", exc)
    try:
        if settings.enable_webhook and settings.webhook_url:
            await set_webhook(settings.webhook_url)
        else:
            logger.info("Telegram webhook disabled (enable_webhook=false)")
    except Exception as exc:
        logger.warning("Webhook registration failed: %s", exc)
    yield
    if settings.enable_webhook and settings.webhook_url:
        try:
            await delete_webhook()
        except Exception:
            pass
    await close_telegram()
    await close_db()


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


if settings.enable_webhook:

    @app.post("/webhook")
    async def telegram_webhook(request: Request):
        await handle_update(await request.json())
        return JSONResponse({"ok": True})


@app.get("/")
async def root():
    return {
        "status": "ok",
        "app": settings.app_name,
        "health": "/health",
        "api": "/api/v1",
    }


@app.get("/health")
async def health():
    return {"status": "ok", "app": settings.app_name}
