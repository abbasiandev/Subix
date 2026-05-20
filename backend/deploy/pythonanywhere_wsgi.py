import os
import sys
from pathlib import Path

PROJECT = Path("/home/subix/mybot/backend")
sys.path.insert(0, str(PROJECT))
os.chdir(PROJECT)

from dotenv import load_dotenv

load_dotenv(PROJECT / ".env")

# Flask WSGI — no a2wsgi (hangs on PythonAnywhere)
from app.pa_flask import application
