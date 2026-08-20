import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import LoadingScreen from "@/components/LoadingScreen";
import { getOrders, Order } from "@/lib/api";
import GlassContainer from "@/components/GlassContainer";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending:    { label: "در انتظار", color: "bg-yellow-100 text-yellow-700" },
  processing: { label: "در حال پردازش", color: "bg-blue-100 text-blue-700" },
  completed:  { label: "تکمیل شده", color: "bg-emerald-100 text-emerald-700" },
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
  const { user } = useAuth();
  const { loading: authCheckLoading } = useRequireAuth();
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

  if (authCheckLoading) return <LoadingScreen />;
  if (!user) return null;

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
    <div className="min-h-screen" dir="rtl">
      <div className="relative container mx-auto px-4 py-8 pb-32 max-w-5xl">
        
        {/* Header */}
        <header className="mb-8 animate-fade-up">
          <h1 className="text-4xl font-black text-white mb-2">داشبورد</h1>
          <p className="text-white/80 text-lg">مدیریت سفارشات و اشتراک‌های شما</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassContainer elevation="light" className="rounded-2xl p-5 text-center animate-fade-up stagger-1">
            <p className="text-white/70 text-sm mb-2">کل سفارشات</p>
            <p className="text-4xl font-black text-white">{stats.total.toLocaleString('fa-IR')}</p>
          </GlassContainer>

          <GlassContainer elevation="light" className="rounded-2xl p-5 text-center animate-fade-up stagger-2">
            <p className="text-white/70 text-sm mb-2">تکمیل شده</p>
            <p className="text-4xl font-black text-emerald-300">{stats.completed.toLocaleString('fa-IR')}</p>
          </GlassContainer>

          <GlassContainer elevation="light" className="rounded-2xl p-5 text-center animate-fade-up stagger-3">
            <p className="text-white/70 text-sm mb-2">در انتظار</p>
            <p className="text-4xl font-black text-yellow-300">{stats.pending.toLocaleString('fa-IR')}</p>
          </GlassContainer>

          <GlassContainer elevation="light" className="rounded-2xl p-5 text-center animate-fade-up stagger-4">
            <p className="text-white/70 text-sm mb-2">مجموع هزینه</p>
            <p className="text-2xl font-black text-white">{formatPrice(stats.spent)}</p>
          </GlassContainer>
        </div>

        {/* Tab Filter */}
        <GlassContainer elevation="subtle" className="rounded-2xl p-2 mb-6 animate-fade-up stagger-5">
          <div className="flex gap-2">
            {(["all", "completed", "pending"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  flex-1 text-sm font-bold py-3 rounded-xl transition-all duration-300
                  ${activeTab === tab 
                    ? "glass-medium text-white shadow-lg" 
                    : "text-white/70 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {{ all: "همه سفارشات", completed: "تکمیل شده", pending: "در انتظار" }[tab]}
              </button>
            ))}
          </div>
        </GlassContainer>

        {/* Orders List */}
        <div className="space-y-4">
          {fetching ? (
            Array.from({ length: 3 }).map((_, i) => (
              <GlassContainer key={i} elevation="light" className="rounded-2xl p-6 animate-fade-up">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-white/20 rounded-lg animate-pulse w-1/3" />
                    <div className="h-4 bg-white/15 rounded animate-pulse w-2/3" />
                  </div>
                  <div className="w-24 h-8 bg-white/20 rounded-full animate-pulse" />
                </div>
              </GlassContainer>
            ))
          ) : filtered.length === 0 ? (
            <GlassContainer elevation="light" className="rounded-2xl p-12 text-center animate-fade-up">
              <svg className="w-20 h-20 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-white/70 text-lg">
                {activeTab === "all" ? "هنوز سفارشی ثبت نکرده‌اید" : "سفارشی یافت نشد"}
              </p>
            </GlassContainer>
          ) : (
            filtered.map((order, index) => (
              <OrderCard key={order.id} order={order} delay={index + 1} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order, delay }: { order: Order; delay: number }) {
  const st = STATUS_MAP[order.status] ?? STATUS_MAP.pending;
  
  return (
    <GlassContainer 
      elevation="light" 
      hover
      className={`rounded-2xl p-6 animate-fade-up stagger-${Math.min(delay, 8)}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Right Side - Order Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-lg">سفارش #{order.id.toLocaleString('fa-IR')}</p>
              <p className="text-white/60 text-sm">{formatDate(order.created_at)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-white/60">قیمت: </span>
              <span className="text-white font-bold">{formatPrice(order.price_paid)}</span>
            </div>
            {order.account_email && (
              <div className="col-span-2">
                <span className="text-white/60">ایمیل: </span>
                <span className="text-emerald-300 font-mono text-xs">{order.account_email}</span>
              </div>
            )}
            {order.note && (
              <div className="col-span-2">
                <span className="text-white/60">یادداشت: </span>
                <span className="text-white/80 text-xs">{order.note}</span>
              </div>
            )}
          </div>
        </div>

        {/* Left Side - Status Badge */}
        <div className="flex items-center justify-end">
          <span className={`
            px-4 py-2 rounded-xl font-bold text-sm
            ${st.color}
          `}>
            {st.label}
          </span>
        </div>
      </div>
    </GlassContainer>
  );
}
