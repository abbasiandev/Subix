#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Run this once inside PythonAnywhere Bash console to set up the backend.
# bash deploy/setup_pythonanywhere.sh
# ─────────────────────────────────────────────────────────────────────────────
set -e

echo "→ Creating virtualenv..."
python3.12 -m venv ~/.virtualenvs/subix

echo "→ Activating..."
source ~/.virtualenvs/subix/bin/activate

echo "→ Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "→ Copying .env..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "  ⚠️  Edit .env and fill in your BOT_TOKEN, TURSO_URL, etc."
fi

echo ""
echo "✅ Done. Next steps:"
echo "   1. Edit .env with your real secrets"
echo "   2. Go to Web tab → set WSGI file to deploy/pythonanywhere_wsgi.py"
echo "   3. Set virtualenv path to: ~/.virtualenvs/subix"
echo "   4. Reload web app"
