"""
Pure Flask WSGI app for PythonAnywhere (no a2wsgi — that hangs on PA).
Local / Docker / JustRunMy keep using app.main (FastAPI).
"""
from flask import Flask, jsonify, request

from app.core.config import settings
from app.core.pa_auth import get_current_user_id_from_token, get_token_from_header
from app.core.security import create_access_token, verify_telegram_init_data
from app.db.client import execute
from app.services.order import OrderService
from app.services.product import ProductService
from app.services.user import UserService
from app.telegram.handlers import handle_update

app = Flask(__name__)

@app.after_request
def cors(resp):
    origin = request.headers.get("Origin")
    if origin:
        base = settings.frontend_url.rstrip("/")
        if origin.rstrip("/") == base or origin == "https://web.telegram.org":
            resp.headers["Access-Control-Allow-Origin"] = origin
    resp.headers["Access-Control-Allow-Credentials"] = "true"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return resp


@app.route("/", methods=["GET"])
def root():
    return jsonify({"status": "ok", "app": settings.app_name, "health": "/health", "api": "/api/v1"})


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "app": settings.app_name})


@app.route("/api/v1/auth/telegram", methods=["POST", "OPTIONS"])
def telegram_login():
    if request.method == "OPTIONS":
        return "", 204
    body = request.get_json(force=True, silent=True) or {}
    tg_user = verify_telegram_init_data(body.get("init_data", ""))
    if not tg_user:
        return jsonify({"detail": "Invalid Telegram initData"}), 401
    user = UserService().upsert_from_telegram(
        telegram_id=tg_user["id"],
        username=tg_user.get("username"),
        first_name=tg_user.get("first_name"),
        last_name=tg_user.get("last_name"),
    )
    token = create_access_token(user.telegram_id)
    return jsonify({"access_token": token, "user": user.model_dump()})


@app.route("/api/v1/products", methods=["GET"])
def list_products():
    try:
        category = request.args.get("category")
        products = ProductService().list_active(category=category or None)
        return jsonify([p.model_dump(mode="json") for p in products])
    except Exception as exc:
        return jsonify({"detail": str(exc)}), 500


@app.route("/api/v1/products/categories", methods=["GET"])
def list_categories():
    return jsonify(ProductService().categories())


@app.route("/api/v1/products/<int:product_id>", methods=["GET"])
def get_product(product_id: int):
    product = ProductService().get(product_id)
    if not product:
        return jsonify({"detail": "Product not found"}), 404
    return jsonify(product.model_dump())


@app.route("/api/v1/orders", methods=["GET", "POST", "OPTIONS"])
def orders():
    if request.method == "OPTIONS":
        return "", 204
    tid, err = get_current_user_id_from_token(get_token_from_header())
    if err:
        return err
    svc = OrderService()
    if request.method == "POST":
        body = request.get_json(force=True, silent=True) or {}
        order = svc.create(tid, body.get("product_id"))
        if not order:
            return jsonify({"detail": "Insufficient wallet balance or product not found"}), 402
        return jsonify(order.model_dump()), 201
    return jsonify([o.model_dump() for o in svc.list_for_user(tid)])


@app.route("/api/v1/orders/<int:order_id>", methods=["GET"])
def get_order(order_id: int):
    tid, err = get_current_user_id_from_token(get_token_from_header())
    if err:
        return err
    order = OrderService().get(order_id, tid)
    if not order:
        return jsonify({"detail": "Order not found"}), 404
    return jsonify(order.model_dump())


@app.route("/api/v1/users/me", methods=["GET"])
def get_profile():
    tid, err = get_current_user_id_from_token(get_token_from_header())
    if err:
        return err
    user = UserService().get_by_telegram_id(tid)
    if not user:
        return jsonify({"detail": "User not found"}), 404
    return jsonify(user.model_dump())


@app.route("/api/v1/users/me/wallet", methods=["GET"])
def get_wallet():
    tid, err = get_current_user_id_from_token(get_token_from_header())
    if err:
        return err
    return jsonify({"balance": UserService().get_wallet(tid)})


@app.route("/api/v1/users/me/topup", methods=["POST", "OPTIONS"])
def request_topup():
    if request.method == "OPTIONS":
        return "", 204
    tid, err = get_current_user_id_from_token(get_token_from_header())
    if err:
        return err
    body = request.get_json(force=True, silent=True) or {}
    user_rs = execute("SELECT id FROM users WHERE telegram_id=?", [tid])
    user_id = user_rs.rows[0].values[0]
    rs = execute(
        """
        INSERT INTO topups (user_id, amount, method, status)
        VALUES (?, ?, ?, 'pending')
        RETURNING id, amount, method, status, created_at
        """,
        [user_id, body.get("amount"), body.get("method", "card")],
    )
    row = rs.rows[0]
    cols = ["id", "amount", "method", "status", "created_at"]
    return jsonify(dict(zip(cols, row.values))), 201


if settings.enable_webhook:

    @app.route("/webhook", methods=["POST"])
    def telegram_webhook():
        handle_update(request.get_json(force=True, silent=True) or {})
        return jsonify({"ok": True})


# PythonAnywhere entry point
application = app
