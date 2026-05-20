from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.telegram.handlers import handle_update

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    docs_url="/docs" if settings.debug else None,
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


if settings.enable_webhook:

    @app.post("/webhook")
    def telegram_webhook(update: dict):
        handle_update(update)
        return {"ok": True}


@app.get("/")
def root():
    return {"status": "ok", "app": settings.app_name, "health": "/health", "api": "/api/v1"}


@app.get("/health")
def health():
    return {"status": "ok", "app": settings.app_name}
