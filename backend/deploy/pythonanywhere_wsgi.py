# ─────────────────────────────────────────────────────────────────────────────
# PythonAnywhere WSGI — paste into:
# /var/www/subix_pythonanywhere_com_wsgi.py
# ─────────────────────────────────────────────────────────────────────────────

import os
import sys
from pathlib import Path

PROJECT = Path("/home/subix/mybot/backend")
sys.path.insert(0, str(PROJECT))
os.chdir(PROJECT)

from dotenv import load_dotenv

load_dotenv(PROJECT / ".env")

from a2wsgi import ASGIMiddleware
from app.main import app as fastapi_app

application = ASGIMiddleware(fastapi_app)
