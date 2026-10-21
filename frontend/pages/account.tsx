import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { NavigationBar, Footer } from '@/components/Layout';
import { ScrollReveal } from '@/components/Animations/ScrollReveal';
import { PhoneAuth } from '@/components/Auth/PhoneAuth';
import { asset } from '@/lib/assets';
import { designSystem } from '@/styles/apple-design-system';
import { useAuth } from '@/context/AuthContext';

type TabType = 'subscriptions' | 'tickets';

interface Subscription {
  id: string;
  productName: string;
  productIcon: string;
  status: 'active' | 'expired' | 'pending';
  expiryDate: string;
  purchaseDate: string;
  price: number;
  credentials?: {
    email?: string;
    password?: string;
    accountLink?: string;
  };
}

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'answered' | 'closed';
  priority: 'low' | 'medium' | 'high';
  lastUpdate: string;
  messageCount: number;
}

/**
 * Account Page - Protected User Dashboard
 * Requires login to view active subscriptions, licenses and support tickets.
 */
export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('subscriptions');

  // Real user subscriptions (empty by default for new accounts)
  const subscriptions: Subscription[] = [];

  // Real user tickets (empty by default for new accounts)
  const tickets: Ticket[] = [];

  const getStatusLabel = (status: Subscription['status']) => {
    const labels = {
      active: 'فعال',
      expired: 'منقضی شده',
      pending: 'در انتظار فعال‌سازی',
    };
    return labels[status];
  };

  const getStatusColor = (status: Subscription['status']) => {
    const colors = {
      active: designSystem.colors.primary.DEFAULT,
      expired: '#ef4444',
      pending: '#f59e0b',
    };
    return colors[status];
  };

  const getTicketStatusLabel = (status: Ticket['status']) => {
    const labels = {
      open: 'در حال بررسی',
      answered: 'پاسخ داده شده',
      closed: 'بسته شده',
    };
    return labels[status];
  };

  const getPriorityLabel = (priority: Ticket['priority']) => {
    const labels = {
      low: 'عادی',
      medium: 'متوسط',
      high: 'فوری',
    };
    return labels[priority];
  };

  // 1. Loading State
  if (loading) {
    return (
      <>
        <Head>
           <title>حساب کاربری | فلوکسو</title>
        </Head>
        <NavigationBar />
        <main className="min-h-screen bg-black flex items-center justify-center pt-24" dir="rtl">
          <div className="text-center p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
            <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-sm">در حال بارگذاری حساب کاربری...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // 2. Unauthenticated State (Login Required Gate)
  if (!user) {
    return (
      <>
        <Head>
           <title>ورود به حساب کاربری | فلوکسو</title>
          <meta name="description" content="ورود به حساب کاربری جهت مشاهده اشتراک‌ها، اطلاعات لایسنس و ارسال تیکت" />
        </Head>

        <NavigationBar />

        <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black pt-32 pb-20 px-4 flex items-center justify-center" dir="rtl">
          <div className="w-full max-w-lg">
            <ScrollReveal direction="up">
              <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-10 shadow-2xl">
                {/* Header Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-3">
                  ورود به حساب کاربری
                </h1>
                <p className="text-gray-400 text-center text-sm md:text-base mb-8 leading-relaxed">
                  برای مشاهده و مدیریت اشتراک‌های فعال، دریافت مشخصات لایسنس و پیگیری تیکت‌ها، شماره موبایل خود را وارد کنید.
                </p>

                {/* Embedded Phone & OTP Form */}
                <div className="mb-6">
                  <PhoneAuth onSuccess={() => {}} />
                </div>

                {/* Notice */}
                <div className="mt-8 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-gray-300 leading-relaxed">
                   <strong>نکته:</strong> خرید و فعال‌سازی سرویس‌ها بدون نیاز به ثبت‌نام قبلی امکان‌پذیر است؛ ورود به این صفحه صرفاً برای دسترسی به پنل مدیریت لایسنس‌ها و ثبت تیکت پشتیبانی است.
                </div>
              </div>
            </ScrollReveal>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // 3. Authenticated Dashboard
   const displayName = user.first_name || user.username || (user.phone_number ? `کاربر ${user.phone_number.slice(-4)}` : 'کاربر فلوکسو');
  const displayPhone = user.phone_number || (user.username ? `@${user.username}` : 'ثبت‌نشده');

  return (
    <>
      <Head>
         <title>حساب کاربری - {displayName} | فلوکسو</title>
        <meta name="description" content="مدیریت اشتراک‌ها، لایسنس‌ها و تیکت‌های پشتیبانی" />
      </Head>

      <NavigationBar />

      <main className="account-page">
        <div className="account-container">
          {/* Header */}
          <ScrollReveal direction="up">
            <div className="account-header">
              <div className="user-info">
                <div className="user-avatar">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="15" r="8" fill="currentColor" />
                    <path
                      d="M8 35C8 28 13 24 20 24C27 24 32 28 32 35"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="user-name">{displayName}</h1>
                  <p className="user-phone dir-ltr">{displayPhone}</p>
                </div>
              </div>

              <div className="account-actions-top">
                <button
                  onClick={() => logout()}
                  className="logout-btn"
                  title="خروج از حساب"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>خروج</span>
                </button>
                <Link href="/" className="home-link">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M3 10L10 3L17 10M4 9V17H7V12H13V17H16V9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  صفحه اصلی
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal direction="up" delay={100}>
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'subscriptions' ? 'active' : ''}`}
                onClick={() => setActiveTab('subscriptions')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="7" cy="12" r="1" fill="currentColor" />
                </svg>
                اشتراک‌های من
                <span className="tab-badge">{subscriptions.length}</span>
              </button>

              <button
                className={`tab ${activeTab === 'tickets' ? 'active' : ''}`}
                onClick={() => setActiveTab('tickets')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 6C3 4.89543 3.89543 4 5 4H15C16.1046 4 17 4.89543 17 6V14C17 15.1046 16.1046 16 15 16H5C3.89543 16 3 15.1046 3 14V6Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M3 8h14M7 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                تیکت‌های پشتیبانی
                <span className="tab-badge">{tickets.filter(t => t.status !== 'closed').length}</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Content */}
          <div className="tab-content">
            {activeTab === 'subscriptions' && (
              <div className="subscriptions-section">
                {subscriptions.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    </div>
                    <h3>هنوز اشتراک فعالی ندارید</h3>
                    <p>
                        هنوز سفارشی در حساب شما ثبت نشده است. سفارش‌های ثبت‌شده در این بخش نمایش داده می‌شوند.
                    </p>
                     <Link href="/products" className="browse-button">
                       مشاهده کاتالوگ اکانت‌ها
                    </Link>
                  </div>
                ) : (
                  <div className="subscriptions-grid">
                    {subscriptions.map((sub) => (
                      <div key={sub.id} className="subscription-card">
                        <div className="card-header">
                          <div className="product-info">
                            <Image
                              src={sub.productIcon}
                              alt={sub.productName}
                              width={48}
                              height={48}
                              className="product-icon"
                            />
                            <div>
                              <h3 className="product-title">{sub.productName}</h3>
                              <p className="purchase-date">خرید: {sub.purchaseDate}</p>
                            </div>
                          </div>
                          <span
                            className="status-badge"
                            style={{ backgroundColor: `${getStatusColor(sub.status)}20`, color: getStatusColor(sub.status) }}
                          >
                            {getStatusLabel(sub.status)}
                          </span>
                        </div>

                        {sub.credentials && (
                          <div className="credentials-box">
                            <h4 className="credentials-title">اطلاعات دسترسی به اکانت:</h4>
                            {sub.credentials.email && (
                              <div className="credential-item">
                                <span className="label">ایمیل:</span>
                                <span className="value">{sub.credentials.email}</span>
                              </div>
                            )}
                            {sub.credentials.password && (
                              <div className="credential-item">
                                <span className="label">رمز عبور:</span>
                                <span className="value">{sub.credentials.password}</span>
                              </div>
                            )}
                            {sub.credentials.accountLink && (
                              <a
                                href={sub.credentials.accountLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="account-link-btn"
                              >
                                ورود به سرویس
                              </a>
                            )}
                          </div>
                        )}

                        <div className="card-footer">
                          <div className="expiry-info">
                            <span className="label">تاریخ انقضا:</span>
                            <span className="value">{sub.expiryDate}</span>
                          </div>
                           <Link href="/products" className="renew-button">
                            تمدید اشتراک
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tickets' && (
              <div className="tickets-section">
                <div className="section-header">
                  <h2 className="section-title">تیکت‌های پشتیبانی</h2>
                  <Link href="/tickets" className="new-ticket-button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 4V16M4 10H16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    ثبت تیکت جدید
                  </Link>
                </div>

                {tickets.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <h3>هیچ تیکت پشتیبانی ثبت نشده است</h3>
                     <p>برای پرسش درباره انتخاب یا دریافت، از مسیر پشتیبانی تلگرام با ما در تماس باشید.</p>
                    <Link href="/tickets" className="browse-button">
                      ارسال تیکت پشتیبانی
                    </Link>
                  </div>
                ) : (
                  <div className="tickets-list">
                    {tickets.map((ticket) => (
                      <Link key={ticket.id} href={`/tickets?id=${ticket.id}`} className="ticket-card">
                        <div className="ticket-header">
                          <span className="ticket-id">{ticket.id}</span>
                          <span className={`priority-badge ${ticket.priority}`}>
                            {getPriorityLabel(ticket.priority)}
                          </span>
                        </div>
                        <h3 className="ticket-subject">{ticket.subject}</h3>
                        <div className="ticket-footer">
                          <span className="ticket-status">{getTicketStatusLabel(ticket.status)}</span>
                          <span className="last-update">آخرین بروزرسانی: {ticket.lastUpdate}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .account-page {
          min-height: 100vh;
          background: #000000;
          padding: 120px 24px 80px;
          direction: rtl;
        }

        .account-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .account-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 32px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-avatar {
          width: 56px;
          height: 56px;
          border-radius: 18px;
          background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .user-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 4px;
        }

        .user-phone {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          font-family: monospace;
        }

        .account-actions-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 12px;
          color: #f87171;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .home-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: white;
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .home-link:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 16px;
        }

        .tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 14px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .tab.active {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .tab-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.15);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .empty-state {
          text-align: center;
          padding: 64px 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px dashed rgba(255, 255, 255, 0.15);
          border-radius: 24px;
        }

        .empty-state-icon {
          width: 80px;
          height: 80px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: rgba(255, 255, 255, 0.4);
        }

        .empty-state h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }

        .empty-state p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
          max-width: 480px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }

        .browse-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
          border-radius: 14px;
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .browse-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.4);
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
        }

        .new-ticket-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(14, 165, 233, 0.15);
          border: 1px solid rgba(14, 165, 233, 0.3);
          border-radius: 12px;
          color: #38bdf8;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .new-ticket-button:hover {
          background: rgba(14, 165, 233, 0.25);
        }

        .subscriptions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .subscription-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 20px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .product-info {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .product-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          margin-bottom: 2px;
        }

        .purchase-date {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .status-badge {
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 8px;
          font-weight: 600;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 16px;
          margin-top: 16px;
        }

        .expiry-info .label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
          margin-left: 6px;
        }

        .expiry-info .value {
          font-size: 0.85rem;
          color: white;
          font-family: monospace;
        }

        .renew-button {
          font-size: 0.8rem;
          color: #38bdf8;
          text-decoration: none;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}
