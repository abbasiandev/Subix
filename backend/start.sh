#!/bin/sh
set -e

# JustRunMy.App injects PORT — it may NOT be 8000 (check URL suffix, e.g. ...-536.e.jrnm.app → 536)
PORT="${PORT:-8000}"

echo "JRNM PORT=${PORT}"
echo "Starting uvicorn on 0.0.0.0:${PORT}"

exec uvicorn app.main:app \
  --host 0.0.0.0 \
  --port "${PORT}" \
  --workers 1 \
  --loop asyncio \
  --http h11 \
  --no-access-log
