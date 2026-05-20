#!/bin/bash
# Run once in PythonAnywhere Bash console:
#   cd /home/subix/mybot/backend && bash deploy/setup_pythonanywhere.sh
set -e

echo "→ Creating virtualenv..."
python3.10 -m venv ~/.virtualenvs/subix

echo "→ Activating..."
source ~/.virtualenvs/subix/bin/activate

echo "→ Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "→ .env..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "  ⚠️  Edit .env: BOT_TOKEN, TURSO_*, WEBHOOK_URL, FRONTEND_URL, SECRET_KEY"
fi

echo ""
echo "✅ Done. Next:"
echo "   1. Edit /home/subix/mybot/backend/.env"
echo "   2. Web tab → WSGI file → paste deploy/pythonanywhere_wsgi.py"
echo "   3. Virtualenv: /home/subix/.virtualenvs/subix"
echo "   4. Reload web app"
