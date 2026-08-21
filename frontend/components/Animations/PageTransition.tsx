import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { designSystem } from '@/styles/apple-design-system';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Page Transition Component
 * Smooth fade-in animation on route changes
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    const handleStart = () => setIsTransitioning(true);
    const handleComplete = () => setIsTransitioning(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      <div className={`page-transition ${isTransitioning ? 'transitioning' : ''}`}>
        {children}
      </div>

      <style jsx>{`
        .page-transition {
          animation: fadeIn ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
        }

        .page-transition.transitioning {
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Respect user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .page-transition {
            animation: none;
          }
          
          .page-transition.transitioning {
            transform: none;
          }
        }
      `}</style>
    </>
  );
};

/**
 * Loading Spinner Component
 */
export const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <>
      <div className="loading-spinner" style={{ width: size, height: size }}>
        <svg viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
          />
        </svg>
      </div>

      <style jsx>{`
        .loading-spinner {
          display: inline-block;
          animation: spin 1s linear infinite;
        }

        .loading-spinner svg {
          width: 100%;
          height: 100%;
        }

        .loading-spinner circle {
          stroke: ${designSystem.colors.primary.DEFAULT};
          stroke-linecap: round;
          stroke-dasharray: 90, 150;
          stroke-dashoffset: 0;
          animation: dash 1.5s ease-in-out infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-spinner {
            animation: none;
          }
          
          .loading-spinner circle {
            animation: none;
            stroke-dasharray: 90, 150;
          }
        }
      `}</style>
    </>
  );
};

export default PageTransition;
