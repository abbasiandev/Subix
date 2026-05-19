// pages/dashboard.tsx
import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/context/AuthContext";
import { getOrders, Order } from "@/lib/api";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending:    { label: "در انتظار", color: "bg-yellow-100 text-yellow-700" },
  processing: { label: "در حال پردازش", color: "bg-blue-100 text-blue-700" },
  completed:  { label: "تکمیل شده", color: "bg-primary-light text-primary" },
  failed:     { label: "ناموفق", color: "bg-red-100 text-red-600" },
};

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR") + " تومان";
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString("fa-IR", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "pending">("all");

  useEffect(() => {
    if (!user) return;
    getOrders()
      .then(setOrders)
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [user]);

  const filtered = orders.filter((o) => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return o.status === "completed";
    return o.status === "pending" || o.status === "processing";
  });

  const stats = {
    total: orders.length,
    completed: orders.filter((o) => o.status === "completed").length,
    pending: orders.filter((o) => o.status === "pending" || o.status === "processing").length,
    spent: orders
      .filter((o) => o.status === "completed")
      .reduce((s, o) => s + o.price_paid, 0),
  };

  return (
    <div className="min-h-dvh bg-surface flex flex-col">

      {/* ── Header ── */}
      <div className="bg-white px-4 pt-5 pb-4 border-b border-gray-100">
        <p className="text-right font-bold text-gray-900 text-base">داشبورد</p>
        <p className="text-right text-xs text-muted">مدیریت سفارشات</p>
      </div>

      <div className="flex-1 px-4 py-4 pb-28 space-y-4">

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="کل سفارشات" value={String(stats.total)} />
          <StatCard label="تکمیل شده" value={String(stats.completed)} accent />
          <StatCard label="در انتظار" value={String(stats.pending)} />
        </div>

        {/* ── Total spent ── */}
        <div className="bg-primary rounded-2xl p-4 text-white text-right">
          <p className="text-xs opacity-80 mb-1">مجموع هزینه‌ها</p>
          <p className="text-xl font-bold">{formatPrice(stats.spent)}</p>
        </div>

        {/* ── Tab filter ── */}
        <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
          {(["all", "completed", "pending"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-xs font-medium py-2 rounded-lg transition-all
                ${activeTab === tab ? "bg-white text-primary shadow-sm" : "text-muted"}`}
            >
              {{ all: "همه", completed: "تکمیل شده", pending: "در انتظار" }[tab]}
            </button>
          ))}
        </div>

        {/* ── Orders list ── */}
        {authLoading || fetching ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-2xl animate-pulse" />
          ))
        ) : !user ? (
          <div className="text-center py-16 text-muted text-sm">
            برای مشاهده سفارشات وارد شوید
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted text-sm">سفارشی یافت نشد</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        )}

      </div>

      <BottomNav />
    </div>
  );
}

function StatCard({ label, value, accent }: {
  label: string; value: string; accent?: boolean
}) {
  return (
    <div className={`rounded-2xl p-3 text-center border
      ${accent ? "bg-primary-light border-primary/20" : "bg-white border-gray-100"}`}>
      <p className={`font-bold text-lg ${accent ? "text-primary" : "text-gray-900"}`}>
        {value}
      </p>
      <p className="text-xs text-muted mt-0.5">{label}</p>
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  const st = STATUS_MAP[order.status] ?? STATUS_MAP.pending;
  return (
    <div className="card flex items-center justify-between gap-3">
      <div className="text-left">
        <span className={`badge ${st.color}`}>{st.label}</span>
        <p className="text-xs text-muted mt-1">{formatDate(order.created_at)}</p>
      </div>
      <div className="text-right flex-1">
        <p className="text-sm font-semibold text-gray-900">سفارش #{order.id}</p>
        <p className="text-xs text-muted">{formatPrice(order.price_paid)}</p>
        {order.account_email && (
          <p className="text-xs text-primary mt-0.5">{order.account_email}</p>
        )}
      </div>
    </div>
  );
}
