# ─────────────────────────────────────────────────────────────────────────────
# PythonAnywhere WSGI configuration
#
# 1. Go to Web tab → Add a new web app → Manual configuration → Python 3.12
# 2. Set "Source code" to: /home/YOUR_USERNAME/subix/backend
# 3. Set "Working directory" to: /home/YOUR_USERNAME/subix/backend
# 4. Replace this file contents with what's below (adjust YOUR_USERNAME)
# 5. Set virtualenv path to: /home/YOUR_USERNAME/.virtualenvs/subix
# ─────────────────────────────────────────────────────────────────────────────

import sys
import os
from pathlib import Path

# ── Project root on disk ──────────────────────────────────────────────────────
PROJECT = Path("/home/YOUR_USERNAME/subix/backend")
sys.path.insert(0, str(PROJECT))

# ── Load .env before importing app ────────────────────────────────────────────
from dotenv import load_dotenv
load_dotenv(PROJECT / ".env")

# ── ASGI → WSGI bridge via asgiref ────────────────────────────────────────────
# PythonAnywhere free tier only supports WSGI.
# asgiref wraps our FastAPI (ASGI) app for WSGI servers.
from asgiref.wsgi import WsgiToAsgi  # noqa: wrong direction — use below

# FastAPI is ASGI; PythonAnywhere needs WSGI.
# Use a2wsgi which is lighter than asgiref for this direction.
from a2wsgi import ASGIMiddleware
from app.main import app as fastapi_app

application = ASGIMiddleware(fastapi_app)
