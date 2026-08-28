import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { designSystem } from '@/styles/apple-design-system';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

/**
 * Scroll Reveal Animation Component
 * Triggers animations when elements enter viewport
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Optionally disconnect after first trigger
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  // Calculate initial transform based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(40px)';
      case 'down':
        return 'translateY(-40px)';
      case 'left':
        return 'translateX(40px)';
      case 'right':
        return 'translateX(-40px)';
      case 'fade':
        return 'none';
      default:
        return 'translateY(40px)';
    }
  };

  return (
    <>
      <div
        ref={elementRef}
        className={`scroll-reveal ${isVisible ? 'visible' : ''} ${className}`}
        style={{
          transitionDelay: `${delay}ms`,
          transitionDuration: `${duration}ms`,
        }}
      >
        {children}
      </div>

      <style jsx>{`
        .scroll-reveal {
          opacity: 0;
          transform: ${getInitialTransform()};
          transition: opacity ${duration}ms ${designSystem.animation.easing.default},
                      transform ${duration}ms ${designSystem.animation.easing.default};
          will-change: opacity, transform;
        }

        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0) translateX(0);
        }
      `}</style>
    </>
  );
};

/**
 * Stagger Children Animation
 * Reveals children one by one with stagger delay
 */
interface StaggerRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  staggerDelay = 100,
  className = '',
}) => {
  const childArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <ScrollReveal
          key={index}
          direction="up"
          delay={index * staggerDelay}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
};

/**
 * Number Counter Animation
 * Animates numbers counting up when visible
 */
interface CounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const range = end - start;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + range * easeOut);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, start, end, duration]);

  return (
    <span ref={elementRef} className={className}>
      {count.toLocaleString('fa-IR')}
      {suffix}
    </span>
  );
};

export default ScrollReveal;
