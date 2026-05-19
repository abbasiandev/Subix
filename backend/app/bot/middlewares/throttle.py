from typing import Any, Awaitable, Callable

from aiogram import BaseMiddleware
from aiogram.types import Message

# Simple in-memory rate limiter — replace with Redis on scale
_last_seen: dict[int, float] = {}
RATE_LIMIT_SECONDS = 1.5


class ThrottleMiddleware(BaseMiddleware):
    async def __call__(
        self,
        handler: Callable[[Message, dict[str, Any]], Awaitable[Any]],
        event: Message,
        data: dict[str, Any],
    ) -> Any:
        import time

        uid = event.from_user.id if event.from_user else None
        if uid:
            now = time.monotonic()
            last = _last_seen.get(uid, 0)
            if now - last < RATE_LIMIT_SECONDS:
                return  # silently drop
            _last_seen[uid] = now

        return await handler(event, data)
