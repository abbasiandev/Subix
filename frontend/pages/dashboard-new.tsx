import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import NavigationNew from '../components/NavigationNew';
import { getOrders, getMe, Order, User } from '../lib/api';

export default function DashboardNew() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'tickets' | 'profile'>('orders');

  useEffect(() => {
    Promise.all([getMe(), getOrders()])
      .then(([userData, ordersData]) => {
        setUser(userData);
        setOrders(ordersData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'processing': return 'text-yellow-400 bg-yellow-500/20';
      case 'pending': return 'text-blue-400 bg-blue-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'تکمیل شده';
      case 'processing': return 'در حال پردازش';
      case 'pending': return 'در انتظار';
      case 'failed': return 'ناموفق';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>پنل کاربری - سابیکس</title>
        <meta name="description" content="مدیریت سفارشات و تیکت‌های پشتیبانی" />
      </Head>

      <div className="min-h-screen bg-black text-white" dir="rtl">
        <NavigationNew />

        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                خوش آمدید، {user?.first_name || 'کاربر گرامی'}
              </h1>
              <p className="text-xl text-gray-400">مدیریت سفارشات و تیکت‌های خود</p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'موجودی کیف پول', value: `${user?.wallet.toLocaleString('fa-IR')} تومان`, icon: '💰', color: 'blue' },
                { label: 'کل سفارشات', value: orders.length.toString(), icon: '📦', color: 'green' },
                { label: 'سفارشات فعال', value: orders.filter(o => o.status === 'processing').length.toString(), icon: '⚡', color: 'yellow' },
                { label: 'تیکت‌های باز', value: '0', icon: '🎫', color: 'purple' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 overflow-x-auto">
              {[
                { id: 'orders', label: 'سفارشات من', icon: '📦' },
                { id: 'tickets', label: 'تیکت‌های پشتیبانی', icon: '🎫' },
                { id: 'profile', label: 'پروفایل', icon: '👤' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10">
                      <div className="text-6xl mb-4">📦</div>
                      <h3 className="text-2xl font-bold mb-2">هنوز سفارشی ندارید</h3>
                      <p className="text-gray-400 mb-6">از بخش محصولات خرید خود را شروع کنید</p>
                      <a
                        href="/products"
                        className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-all"
                      >
                        مشاهده محصولات
                      </a>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm text-gray-400">سفارش #{order.id.toString().padStart(6, '0')}</span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {getStatusLabel(order.status)}
                              </span>
                            </div>
                            <p className="text-lg font-semibold mb-1">محصول ID: {order.product_id}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                              <span>💰 {order.price_paid.toLocaleString('fa-IR')} تومان</span>
                              <span>📅 {new Date(order.created_at).toLocaleDateString('fa-IR')}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {order.status === 'completed' && order.account_email && (
                              <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all">
                                مشاهده اطلاعات
                              </button>
                            )}
                            {order.status === 'failed' && (
                              <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all">
                                گزارش مشکل
                              </button>
                            )}
                          </div>
                        </div>

                        {order.note && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-sm text-gray-400">یادداشت: {order.note}</p>
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'tickets' && (
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10">
                  <div className="text-6xl mb-4">🎫</div>
                  <h3 className="text-2xl font-bold mb-2">سیستم تیکت به زودی</h3>
                  <p className="text-gray-400 mb-6">در صورت نیاز به پشتیبانی، با ما تماس بگیرید</p>
                  <a
                    href="/contact"
                    className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-all"
                  >
                    تماس با پشتیبانی
                  </a>
                </div>
              )}

              {activeTab === 'profile' && user && (
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-6">اطلاعات کاربری</h2>
                  <div className="space-y-4">
                    {[
                      { label: 'نام', value: user.first_name || '-' },
                      { label: 'نام خانوادگی', value: user.last_name || '-' },
                      { label: 'شماره موبایل', value: user.phone_number || '-' },
                      { label: 'موجودی کیف پول', value: `${user.wallet.toLocaleString('fa-IR')} تومان` },
                      { label: 'تاریخ عضویت', value: new Date(user.created_at).toLocaleDateString('fa-IR') },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                        <span className="text-gray-400">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all">
                    ویرایش پروفایل
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
