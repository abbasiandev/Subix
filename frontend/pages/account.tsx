import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { NavigationBar, Footer } from '@/components/Layout';
import { ScrollReveal } from '@/components/Animations/ScrollReveal';
import { designSystem } from '@/styles/apple-design-system';

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
 * Account Page - Minimal Dashboard
 * Shows only orders and support tickets
 */
const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('subscriptions');

  // Mock data - replace with API calls
  const subscriptions: Subscription[] = [
    {
      id: '1',
      productName: 'ChatGPT Plus',
      productIcon: '/brands/openai.svg',
      status: 'active',
      expiryDate: '2024-03-15',
      purchaseDate: '2024-02-15',
      price: 850000,
      credentials: {
        email: 'user@example.com',
        password: '••••••••',
        accountLink: 'https://chat.openai.com',
      },
    },
    {
      id: '2',
      productName: 'Spotify Premium',
      productIcon: '/brands/spotify.svg',
      status: 'active',
      expiryDate: '2024-02-28',
      purchaseDate: '2024-01-28',
      price: 350000,
    },
    {
      id: '3',
      productName: 'GitHub Copilot',
      productIcon: '/brands/github.svg',
      status: 'expired',
      expiryDate: '2024-01-20',
      purchaseDate: '2023-12-20',
      price: 450000,
    },
  ];

  const tickets: Ticket[] = [
    {
      id: 'T-1001',
      subject: 'مشکل در دسترسی به اشتراک ChatGPT',
      status: 'answered',
      priority: 'high',
      lastUpdate: '1403/11/25',
      messageCount: 3,
    },
    {
      id: 'T-1002',
      subject: 'درخواست تمدید اشتراک Spotify',
      status: 'open',
      priority: 'medium',
      lastUpdate: '1403/11/26',
      messageCount: 1,
    },
  ];

  const getStatusLabel = (status: Subscription['status']) => {
    const labels = {
      active: 'فعال',
      expired: 'منقضی شده',
      pending: 'در انتظار',
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
      open: 'باز',
      answered: 'پاسخ داده شده',
      closed: 'بسته شده',
    };
    return labels[status];
  };

  const getPriorityLabel = (priority: Ticket['priority']) => {
    const labels = {
      low: 'کم',
      medium: 'متوسط',
      high: 'فوری',
    };
    return labels[priority];
  };

  return (
    <>
      <Head>
        <title>حساب کاربری - سابیکس</title>
        <meta name="description" content="مدیریت اشتراک‌ها و تیکت‌های پشتیبانی" />
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
                  <h1 className="user-name">کاربر سابیکس</h1>
                  <p className="user-phone">۰۹۱۲۳۴۵۶۷۸۹</p>
                </div>
              </div>

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
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <circle cx="40" cy="40" r="38" fill={designSystem.colors.neutral[100]} />
                      <path
                        d="M30 40L35 45L50 30"
                        stroke={designSystem.colors.text.tertiary}
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <h3>هنوز اشتراکی خریداری نکرده‌اید</h3>
                    <Link href="/#products" className="browse-link">
                      مشاهده محصولات
                    </Link>
                  </div>
                ) : (
                  <div className="subscriptions-grid">
                    {subscriptions.map((sub, index) => (
                      <ScrollReveal key={sub.id} direction="up" delay={index * 50}>
                        <div className="subscription-card">
                          <div className="subscription-header">
                            <div className="subscription-info">
                              <Image
                                src={sub.productIcon}
                                alt={sub.productName}
                                width={48}
                                height={48}
                                className="subscription-icon"
                              />
                              <div>
                                <h3 className="subscription-name">{sub.productName}</h3>
                                <p className="subscription-date">
                                  خریداری شده در {new Date(sub.purchaseDate).toLocaleDateString('fa-IR')}
                                </p>
                              </div>
                            </div>

                            <span
                              className="status-badge"
                              style={{ background: `${getStatusColor(sub.status)}20`, color: getStatusColor(sub.status) }}
                            >
                              {getStatusLabel(sub.status)}
                            </span>
                          </div>

                          <div className="subscription-details">
                            <div className="detail-row">
                              <span className="detail-label">تاریخ انقضا:</span>
                              <span className="detail-value">
                                {new Date(sub.expiryDate).toLocaleDateString('fa-IR')}
                              </span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">مبلغ پرداختی:</span>
                              <span className="detail-value">
                                {sub.price.toLocaleString('fa-IR')} تومان
                              </span>
                            </div>
                          </div>

                          {sub.credentials && sub.status === 'active' && (
                            <div className="credentials-section">
                              <h4 className="credentials-title">اطلاعات دسترسی</h4>
                              {sub.credentials.email && (
                                <div className="credential-item">
                                  <span>ایمیل:</span>
                                  <code>{sub.credentials.email}</code>
                                </div>
                              )}
                              {sub.credentials.password && (
                                <div className="credential-item">
                                  <span>رمز عبور:</span>
                                  <code>{sub.credentials.password}</code>
                                </div>
                              )}
                              {sub.credentials.accountLink && (
                                <a
                                  href={sub.credentials.accountLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="access-link"
                                >
                                  ورود به حساب
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path
                                      d="M6 3H3V13H13V10M10 3H13M13 3V6M13 3L7 9"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                </a>
                              )}
                            </div>
                          )}

                          {sub.status === 'expired' && (
                            <Link href={`/products/${sub.productName.toLowerCase().replace(/\s+/g, '-')}`} className="renew-button">
                              تمدید اشتراک
                            </Link>
                          )}
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tickets' && (
              <div className="tickets-section">
                <div className="tickets-header">
                  <h2 className="section-title">تیکت‌های پشتیبانی</h2>
                  <button className="new-ticket-button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 4V16M4 10H16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    تیکت جدید
                  </button>
                </div>

                {tickets.length === 0 ? (
                  <div className="empty-state">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <circle cx="40" cy="40" r="38" fill={designSystem.colors.neutral[100]} />
                      <rect x="25" y="28" width="30" height="24" rx="2" stroke={designSystem.colors.text.tertiary} strokeWidth="2" />
                      <path d="M25 34h30" stroke={designSystem.colors.text.tertiary} strokeWidth="2" />
                    </svg>
                    <h3>تیکت پشتیبانی وجود ندارد</h3>
                    <p>در صورت نیاز به پشتیبانی، تیکت جدید ایجاد کنید</p>
                  </div>
                ) : (
                  <div className="tickets-list">
                    {tickets.map((ticket, index) => (
                      <ScrollReveal key={ticket.id} direction="up" delay={index * 50}>
                        <Link href={`/tickets/${ticket.id}`} className="ticket-card">
                          <div className="ticket-header-row">
                            <div className="ticket-id">#{ticket.id}</div>
                            <div className="ticket-badges">
                              <span className={`priority-badge priority-${ticket.priority}`}>
                                {getPriorityLabel(ticket.priority)}
                              </span>
                              <span className={`status-badge status-${ticket.status}`}>
                                {getTicketStatusLabel(ticket.status)}
                              </span>
                            </div>
                          </div>

                          <h3 className="ticket-subject">{ticket.subject}</h3>

                          <div className="ticket-meta">
                            <span className="ticket-date">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                              آخرین بروزرسانی: {ticket.lastUpdate}
                            </span>
                            <span className="ticket-messages">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                  d="M2 6C2 4.89543 2.89543 4 4 4H12C13.1046 4 14 4.89543 14 6V10C14 11.1046 13.1046 12 12 12H8L4 14V12H4C2.89543 12 2 11.1046 2 10V6Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                />
                              </svg>
                              {ticket.messageCount} پیام
                            </span>
                          </div>
                        </Link>
                      </ScrollReveal>
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
          padding-top: 80px;
          background: linear-gradient(
            180deg,
            ${designSystem.colors.neutral[50]} 0%,
            transparent 100%
          );
        }

        .account-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: ${designSystem.spacing['12']} ${designSystem.spacing['6']};
        }

        /* Header */
        .account-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: ${designSystem.spacing['10']};
          padding: ${designSystem.spacing['8']};
          background: white;
          border-radius: ${designSystem.borderRadius['2xl']};
          box-shadow: ${designSystem.shadows.md};
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: ${designSystem.spacing['4']};
        }

        .user-avatar {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, ${designSystem.colors.primary.DEFAULT}, ${designSystem.colors.primary.dark});
          color: white;
          border-radius: ${designSystem.borderRadius.full};
        }

        .user-name {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize['2xl']};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0 0 ${designSystem.spacing['1']};
        }

        .user-phone {
          font-family: ${designSystem.typography.fontFamily.english};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          margin: 0;
          direction: ltr;
          text-align: right;
        }

        .home-link {
          display: inline-flex;
          align-items: center;
          gap: ${designSystem.spacing['2']};
          padding: 10px 20px;
          background: ${designSystem.colors.neutral[100]};
          border-radius: ${designSystem.borderRadius.xl};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          text-decoration: none;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .home-link:hover {
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
        }

        /* Tabs */
        .tabs {
          display: flex;
          gap: ${designSystem.spacing['4']};
          margin-bottom: ${designSystem.spacing['8']};
          padding: ${designSystem.spacing['2']};
          background: white;
          border-radius: ${designSystem.borderRadius.xl};
          box-shadow: ${designSystem.shadows.sm};
        }

        .tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: ${designSystem.spacing['2']};
          padding: 14px 24px;
          background: transparent;
          border: none;
          border-radius: ${designSystem.borderRadius.lg};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          font-weight: ${designSystem.typography.fontWeight.medium};
          color: ${designSystem.colors.text.secondary};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          min-height: ${designSystem.accessibility.touchTargetSize};
        }

        .tab:hover {
          background: ${designSystem.colors.neutral[100]};
          color: ${designSystem.colors.text.primary};
        }

        .tab.active {
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          box-shadow: ${designSystem.shadows.md};
        }

        .tab-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 24px;
          padding: 0 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: ${designSystem.borderRadius.full};
          font-size: ${designSystem.typography.fontSize.xs};
          font-weight: ${designSystem.typography.fontWeight.bold};
        }

        .tab.active .tab-badge {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Content */
        .tab-content {
          min-height: 400px;
        }

        /* Subscriptions */
        .subscriptions-grid {
          display: grid;
          gap: ${designSystem.spacing['6']};
        }

        .subscription-card {
          background: white;
          padding: ${designSystem.spacing['6']};
          border-radius: ${designSystem.borderRadius['2xl']};
          box-shadow: ${designSystem.shadows.md};
          transition: all ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
        }

        .subscription-card:hover {
          box-shadow: ${designSystem.shadows.xl};
          transform: translateY(-4px);
        }

        .subscription-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: ${designSystem.spacing['6']};
          padding-bottom: ${designSystem.spacing['6']};
          border-bottom: 1px solid ${designSystem.colors.neutral[200]};
        }

        .subscription-info {
          display: flex;
          gap: ${designSystem.spacing['4']};
        }

        .subscription-icon {
          border-radius: ${designSystem.borderRadius.lg};
        }

        .subscription-name {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xl};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0 0 ${designSystem.spacing['2']};
        }

        .subscription-date {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          margin: 0;
        }

        .status-badge {
          padding: 6px 16px;
          border-radius: ${designSystem.borderRadius.full};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xs};
          font-weight: ${designSystem.typography.fontWeight.semibold};
        }

        .subscription-details {
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing['3']};
          margin-bottom: ${designSystem.spacing['6']};
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
        }

        .detail-label {
          color: ${designSystem.colors.text.secondary};
        }

        .detail-value {
          color: ${designSystem.colors.text.primary};
          font-weight: ${designSystem.typography.fontWeight.medium};
        }

        .credentials-section {
          padding: ${designSystem.spacing['4']};
          background: ${designSystem.colors.neutral[50]};
          border-radius: ${designSystem.borderRadius.xl};
          margin-bottom: ${designSystem.spacing['4']};
        }

        .credentials-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          color: ${designSystem.colors.text.primary};
          margin: 0 0 ${designSystem.spacing['3']};
        }

        .credential-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${designSystem.spacing['2']} 0;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
        }

        .credential-item code {
          font-family: ${designSystem.typography.fontFamily.english};
          padding: 4px 12px;
          background: white;
          border: 1px solid ${designSystem.colors.neutral[200]};
          border-radius: ${designSystem.borderRadius.md};
          color: ${designSystem.colors.text.primary};
          direction: ltr;
        }

        .access-link {
          display: inline-flex;
          align-items: center;
          gap: ${designSystem.spacing['2']};
          margin-top: ${designSystem.spacing['2']};
          padding: 8px 16px;
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          font-weight: ${designSystem.typography.fontWeight.medium};
          border-radius: ${designSystem.borderRadius.lg};
          text-decoration: none;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .access-link:hover {
          background: ${designSystem.colors.primary.dark};
        }

        .renew-button {
          display: block;
          width: 100%;
          padding: 12px;
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          text-align: center;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          border-radius: ${designSystem.borderRadius.xl};
          text-decoration: none;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .renew-button:hover {
          background: ${designSystem.colors.primary.dark};
          transform: translateY(-2px);
        }

        /* Tickets */
        .tickets-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: ${designSystem.spacing['6']};
        }

        .section-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize['2xl']};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0;
        }

        .new-ticket-button {
          display: inline-flex;
          align-items: center;
          gap: ${designSystem.spacing['2']};
          padding: 12px 24px;
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          border: none;
          border-radius: ${designSystem.borderRadius.xl};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          min-height: ${designSystem.accessibility.touchTargetSize};
        }

        .new-ticket-button:hover {
          background: ${designSystem.colors.primary.dark};
          transform: translateY(-2px);
          box-shadow: ${designSystem.shadows.lg};
        }

        .tickets-list {
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing['4']};
        }

        .ticket-card {
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing['3']};
          padding: ${designSystem.spacing['6']};
          background: white;
          border-radius: ${designSystem.borderRadius.xl};
          box-shadow: ${designSystem.shadows.sm};
          text-decoration: none;
          transition: all ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
        }

        .ticket-card:hover {
          box-shadow: ${designSystem.shadows.lg};
          transform: translateY(-2px);
        }

        .ticket-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ticket-id {
          font-family: ${designSystem.typography.fontFamily.english};
          font-size: ${designSystem.typography.fontSize.sm};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          color: ${designSystem.colors.text.tertiary};
          direction: ltr;
        }

        .ticket-badges {
          display: flex;
          gap: ${designSystem.spacing['2']};
        }

        .priority-badge {
          padding: 4px 12px;
          border-radius: ${designSystem.borderRadius.full};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xs};
          font-weight: ${designSystem.typography.fontWeight.semibold};
        }

        .priority-low {
          background: #10b98120;
          color: #10b981;
        }

        .priority-medium {
          background: #f59e0b20;
          color: #f59e0b;
        }

        .priority-high {
          background: #ef444420;
          color: #ef4444;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: ${designSystem.borderRadius.full};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xs};
          font-weight: ${designSystem.typography.fontWeight.semibold};
        }

        .status-open {
          background: ${designSystem.colors.primary.DEFAULT}20;
          color: ${designSystem.colors.primary.DEFAULT};
        }

        .status-answered {
          background: #10b98120;
          color: #10b981;
        }

        .status-closed {
          background: ${designSystem.colors.neutral[200]};
          color: ${designSystem.colors.text.tertiary};
        }

        .ticket-subject {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.lg};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          color: ${designSystem.colors.text.primary};
          margin: 0;
        }

        .ticket-meta {
          display: flex;
          gap: ${designSystem.spacing['6']};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
        }

        .ticket-date,
        .ticket-messages {
          display: flex;
          align-items: center;
          gap: ${designSystem.spacing['2']};
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: ${designSystem.spacing['16']};
          text-align: center;
        }

        .empty-state h3 {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xl};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: ${designSystem.spacing['4']} 0;
        }

        .empty-state p {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          color: ${designSystem.colors.text.secondary};
          margin: 0 0 ${designSystem.spacing['6']};
        }

        .browse-link {
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          border-radius: ${designSystem.borderRadius.xl};
          text-decoration: none;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .browse-link:hover {
          background: ${designSystem.colors.primary.dark};
          transform: translateY(-2px);
          box-shadow: ${designSystem.shadows.lg};
        }

        /* Mobile */
        @media (max-width: 768px) {
          .account-header {
            flex-direction: column;
            gap: ${designSystem.spacing['4']};
            align-items: flex-start;
          }

          .tabs {
            flex-direction: column;
          }

          .tab {
            justify-content: flex-start;
          }

          .user-name {
            font-size: ${designSystem.typography.fontSize.xl};
          }

          .ticket-meta {
            flex-direction: column;
            gap: ${designSystem.spacing['2']};
          }
        }
      `}</style>
    </>
  );
};

export default AccountPage;
