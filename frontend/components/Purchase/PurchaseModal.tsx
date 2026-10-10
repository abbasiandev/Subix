import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { PhoneAuth } from '@/components/Auth/PhoneAuth';
import { asset } from '@/lib/assets';
import { designSystem } from '@/styles/apple-design-system';
import { useAuth } from '@/context/AuthContext';

interface PurchaseModalProps {
  product: Product;
  onClose: () => void;
}

type PurchaseStep = 'auth' | 'payment' | 'demo';

/**
 * Purchase Modal Component
 * Handles direct purchase and payment flow (frictionless for guests and auto-filled for users)
 */
export const PurchaseModal: React.FC<PurchaseModalProps> = ({ product, onClose }) => {
  const { user } = useAuth();
  const [step, setStep] = useState<PurchaseStep>(user?.phone_number ? 'payment' : 'auth');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || '');
  const [selectedGateway, setSelectedGateway] = useState<'zarinpal' | 'idpay'>('zarinpal');

  const handleAuthSuccess = (phone: string) => {
    setPhoneNumber(phone);
    setStep('payment');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
           {
            <button className="close-button" onClick={handleClose} aria-label="بستن">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
           }

          {/* Product Header */}
          <div className="modal-header">
            <div className="product-info-small">
              <Image
                src={asset(product.brandLogoPath)}
                alt={product.name}
                width={48}
                height={48}
                className="product-icon-small"
              />
              <div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">
                  {product.price.toLocaleString('fa-IR')} تومان
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="modal-content">
            {step === 'auth' && (
              <PhoneAuth onSuccess={handleAuthSuccess} />
            )}

            {step === 'payment' && (
              <div className="payment-step">
                 <h3 className="step-title">پیش‌نمایش مسیر دریافت</h3>
                <p className="demo-note">اتصال پرداخت در این نسخه فعال نیست؛ این پنجره فقط مسیر تجربه خرید را نشان می‌دهد.</p>
                
                <div className="gateway-options">
                  <button
                    className={`gateway-option ${selectedGateway === 'zarinpal' ? 'active' : ''}`}
                    onClick={() => setSelectedGateway('zarinpal')}
                  >
                    <div className="gateway-icon">
                      <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                        <rect width="60" height="30" rx="4" fill="#21AC4B"/>
                        <text x="30" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                          زرین‌پال
                        </text>
                      </svg>
                    </div>
                    <span className="gateway-name">زرین‌پال</span>
                    {selectedGateway === 'zarinpal' && (
                      <div className="checkmark">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="10" fill="#21AC4B"/>
                          <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                    )}
                  </button>

                  <button
                    className={`gateway-option ${selectedGateway === 'idpay' ? 'active' : ''}`}
                    onClick={() => setSelectedGateway('idpay')}
                  >
                    <div className="gateway-icon">
                      <Image
                        src={asset('/trust-badges/idpay-logo.svg')}
                        alt="آی‌دی‌پی"
                        width={60}
                        height={30}
                      />
                    </div>
                    <span className="gateway-name">آی‌دی‌پی</span>
                    {selectedGateway === 'idpay' && (
                      <div className="checkmark">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="10" fill="#21AC4B"/>
                          <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                </div>

                <div className="payment-summary">
                  <div className="summary-row">
                    <span>قیمت محصول:</span>
                    <span>{product.price.toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="summary-row total">
                    <span>مبلغ قابل پرداخت:</span>
                    <span>{product.price.toLocaleString('fa-IR')} تومان</span>
                  </div>
                </div>

                 <button className="pay-button" onClick={() => setStep('demo')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 10h18" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="7" cy="14" r="1" fill="currentColor"/>
                  </svg>
                   نمایش وضعیت ادامه مسیر
                </button>

                <p className="security-note">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1L12 3V7C12 10 8 13 8 13C8 13 4 10 4 7V3L8 1Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                   درگاه‌ها پس از اتصال backend در همین مرحله فعال می‌شوند
                </p>
              </div>
            )}

            {step === 'demo' && (
              <div className="demo-step">
                <div className="demo-icon" aria-hidden="true">i</div>
                <h3 className="success-title">این مسیر هنوز نمایشی است</h3>
                <p className="success-text">جزئیات انتخاب شما آماده است، اما پرداخت و فعال‌سازی تا زمان اتصال backend انجام نمی‌شود.</p>
                <div className="success-actions">
                  <button className="primary-action" onClick={onClose}>بازگشت به جزئیات محصول</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: ${designSystem.spacing.scale['4']};
          animation: fadeIn ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
        }

        .modal-container {
          position: relative;
          background: white;
          border-radius: ${designSystem.borderRadius['2xl']};
          box-shadow: ${designSystem.shadows['2xl']};
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
        }

        .close-button {
          position: absolute;
          top: 16px;
          left: 16px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${designSystem.colors.neutral[100]};
          border: none;
          border-radius: ${designSystem.borderRadius.full};
          color: ${designSystem.colors.text.secondary};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          z-index: 10;
        }

        .close-button:hover {
          background: ${designSystem.colors.neutral[200]};
          color: ${designSystem.colors.text.primary};
        }

        .modal-header {
          padding: ${designSystem.spacing.scale['6']};
          border-bottom: 1px solid ${designSystem.colors.neutral[200]};
        }

        .product-info-small {
          display: flex;
          align-items: center;
          gap: ${designSystem.spacing.scale['4']};
        }

        .product-icon-small {
          border-radius: ${designSystem.borderRadius.lg};
        }

        .product-name {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.lg};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0 0 ${designSystem.spacing.scale['1']};
        }

        .product-price {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.primary.DEFAULT};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          margin: 0;
        }

         .modal-content {
           padding: ${designSystem.spacing.scale['6']};
         }

         .demo-note {
           margin: -12px 0 0;
           padding: 12px 14px;
           border-radius: 12px;
           background: #fff8e1;
           color: #7a5b00;
           font-size: ${designSystem.typography.fontSize.sm};
           line-height: 1.8;
         }

         .demo-icon {
           width: 64px;
           height: 64px;
           display: grid;
           place-items: center;
           border-radius: 50%;
           background: #fff8e1;
           color: #9a7400;
           font-size: 2rem;
           font-weight: 800;
         }

        /* Payment Step */
        .payment-step {
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing.scale['6']};
        }

        .step-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xl};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0;
          text-align: center;
        }

        .gateway-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: ${designSystem.spacing.scale['4']};
        }

        .gateway-option {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: ${designSystem.spacing.scale['3']};
          padding: ${designSystem.spacing.scale['6']};
          background: ${designSystem.colors.neutral[50]};
          border: 2px solid ${designSystem.colors.neutral[200]};
          border-radius: ${designSystem.borderRadius.xl};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .gateway-option:hover {
          border-color: ${designSystem.colors.primary.DEFAULT};
          background: white;
        }

        .gateway-option.active {
          border-color: ${designSystem.colors.primary.DEFAULT};
          background: ${designSystem.colors.primary.DEFAULT}05;
          box-shadow: ${designSystem.shadows.md};
        }

        .gateway-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gateway-name {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.primary};
          font-weight: ${designSystem.typography.fontWeight.medium};
        }

        .checkmark {
          position: absolute;
          top: 8px;
          right: 8px;
        }

        .payment-summary {
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing.scale['3']};
          padding: ${designSystem.spacing.scale['4']};
          background: ${designSystem.colors.neutral[50]};
          border-radius: ${designSystem.borderRadius.lg};
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
        }

        .summary-row.total {
          padding-top: ${designSystem.spacing.scale['3']};
          border-top: 1px solid ${designSystem.colors.neutral[200]};
          font-size: ${designSystem.typography.fontSize.lg};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
        }

        .pay-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: ${designSystem.spacing.scale['2']};
          width: 100%;
          padding: 16px;
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          border: none;
          border-radius: ${designSystem.borderRadius.xl};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          min-height: ${designSystem.accessibility.touchTarget.mobile};
        }

        .pay-button:hover {
          background: ${designSystem.colors.primary.active};
          transform: translateY(-2px);
          box-shadow: ${designSystem.shadows.lg};
        }

        .security-note {
          display: flex;
          align-items: center;
          gap: ${designSystem.spacing.scale['2']};
          justify-content: center;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xs};
          color: ${designSystem.colors.text.tertiary};
          margin: 0;
        }

        .security-note svg {
          color: ${designSystem.colors.primary.DEFAULT};
        }

        /* Processing Step */
        .processing-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: ${designSystem.spacing.scale['4']};
          padding: ${designSystem.spacing.scale['8']} 0;
          text-align: center;
        }

        .processing-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xl};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0;
        }

        .processing-text {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          margin: 0;
        }

        /* Success Step */
        .success-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: ${designSystem.spacing.scale['4']};
          padding: ${designSystem.spacing.scale['8']} 0;
          text-align: center;
        }

        .success-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize['2xl']};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0;
        }

        .success-text {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          color: ${designSystem.colors.text.secondary};
          line-height: ${designSystem.typography.lineHeight.relaxed};
          margin: 0;
        }

        .success-actions {
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing.scale['3']};
          width: 100%;
          margin-top: ${designSystem.spacing.scale['4']};
        }

        .primary-action,
        .secondary-action {
          padding: 14px 24px;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          border-radius: ${designSystem.borderRadius.xl};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          min-height: ${designSystem.accessibility.touchTarget.mobile};
        }

        .primary-action {
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          border: none;
        }

        .primary-action:hover {
          background: ${designSystem.colors.primary.active};
        }

        .secondary-action {
          background: transparent;
          color: ${designSystem.colors.text.secondary};
          border: 1px solid ${designSystem.colors.neutral[300]};
        }

        .secondary-action:hover {
          background: ${designSystem.colors.neutral[50]};
          color: ${designSystem.colors.text.primary};
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .modal-container {
            max-height: 95vh;
          }

          .gateway-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default PurchaseModal;
