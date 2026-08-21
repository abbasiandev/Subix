const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
const DEFAULT_API = "https://subix.pythonanywhere.com";
const APP_BASE = "/Subix";

function isLocalDev(): boolean {
    return (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1")
    );
}

function resolveUrl(path: string): string {
    if (BASE) return `${BASE}${path}`;
    if (process.env.NODE_ENV === "development" && isLocalDev()) {
        return `${APP_BASE}/api${path.replace(/^\/api/, "")}`;
    }
    return `${DEFAULT_API}${path}`;
}

let _token: string | null = null;

export function setToken(t: string) {
    _token = t;
}

export function getToken() {
    return _token;
}

let _adminKey: string | null = null;

export function setAdminKey(key: string) {
    _adminKey = key;
}

export function getAdminKey() {
    return _adminKey;
}

async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };
    if (_token) headers["Authorization"] = `Bearer ${_token}`;

    // Ensure credentials are included for session cookie support
    const fetchOptions: RequestInit = {
        ...options,
        headers,
        credentials: options.credentials || "include",
    };

    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    try {
        const res = await fetch(resolveUrl(path), {
            ...fetchOptions,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            const err = await res.json().catch(() => ({detail: res.statusText}));
            throw new Error(err.detail ?? "خطا در ارتباط با سرور");
        }
        return res.json();
    } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('زمان اتصال به سرور به پایان رسید');
        }
        throw error;
    }
}

async function adminRequest<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    if (!_adminKey) throw new Error("کلید ادمین وارد نشده");
    return request<T>(path, {
        ...options,
        headers: {
            ...(options.headers as Record<string, string>),
            "X-Admin-Key": _adminKey,
        },
    });
}

export async function loginWithTelegram(initData: string) {
    return request<{ access_token: string; user: User }>(
        "/api/v1/auth/telegram",
        {method: "POST", body: JSON.stringify({init_data: initData})}
    );
}

export async function loginWithTelegramWidget(telegramUser: {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}) {
    return request<{ access_token: string; user: User }>(
        "/api/v1/auth/telegram-widget",
        {
            method: "POST",
            body: JSON.stringify(telegramUser),
            credentials: "include", // Important: send/receive cookies
        }
    );
}

export async function logout() {
    return request("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
    });
}

export async function getProducts(category?: string) {
    const qs = category ? `?category=${encodeURIComponent(category)}` : "";
    return request<Product[]>(`/api/v1/products${qs}`);
}

export async function getCategories() {
    return request<string[]>("/api/v1/products/categories");
}

export async function getProduct(id: number) {
    return request<Product>(`/api/v1/products/${id}`);
}

export async function getAdminProducts() {
    return adminRequest<Product[]>("/api/v1/admin/products");
}

export async function updateProductPrice(id: number, price: number) {
    return adminRequest<Product>(`/api/v1/admin/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify({price}),
    });
}

export async function createOrder(product_id: number) {
    return request<Order>("/api/v1/orders", {
        method: "POST",
        body: JSON.stringify({product_id}),
    });
}

export async function getOrders() {
    return request<Order[]>("/api/v1/orders");
}

export async function getMe() {
    return request<User>("/api/v1/users/me");
}

export async function getWallet() {
    return request<{ balance: number }>("/api/v1/users/me/wallet");
}

export async function requestTopup(amount: number, method = "card") {
    return request<Topup>("/api/v1/users/me/topup", {
        method: "POST",
        body: JSON.stringify({amount, method}),
    });
}

export interface User {
    id: number;
    telegram_id: number;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    phone_number: string | null;
    wallet: number;
    is_active: boolean;
    created_at: string;
}

export interface Product {
    id: number;
    name: string;
    description: string | null;
    category: string;
    price: number;
    duration_days: number;
    activation_minutes: number;
    activation_type: string;
    is_active: boolean;
}

export interface Order {
    id: number;
    product_id: number;
    status: "pending" | "processing" | "completed" | "failed";
    price_paid: number;
    account_email: string | null;
    note: string | null;
    created_at: string;
    activated_at: string | null;
}

export interface Topup {
    id: number;
    amount: number;
    method: string;
    status: string;
    created_at: string;
}
