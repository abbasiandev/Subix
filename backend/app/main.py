from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.router import api_router
from app.core.config import settings
from app.telegram.handlers import handle_update

# No lifespan — PythonAnywhere WSGI hangs on async startup. Migrations run lazily on first DB call.

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    docs_url="/docs" if settings.debug else None,
    redoc_url=None,
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
