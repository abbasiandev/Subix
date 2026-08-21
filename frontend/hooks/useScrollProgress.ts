import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to track scroll progress
 * Returns scroll progress (0-1) and current scroll position
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    // Calculate progress (0 to 1)
    const maxScroll = documentHeight - windowHeight;
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    
    setScrollProgress(Math.min(progress, 1));
    setScrollY(scrollTop);
  }, []);

  useEffect(() => {
    // Initial calculation
    handleScroll();

    // Throttled scroll listener
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  return { scrollProgress, scrollY };
};

/**
 * Hook to track element scroll progress
 * Returns progress (0-1) of element through viewport
 */
export const useElementScrollProgress = (ref: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Element enters from bottom, exits at top
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Progress: 0 when bottom enters viewport, 1 when top exits viewport
      const totalDistance = windowHeight + elementHeight;
      const currentPosition = windowHeight - elementTop;
      const elementProgress = currentPosition / totalDistance;
      
      setProgress(Math.max(0, Math.min(1, elementProgress)));
    };

    handleScroll();

    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ref]);

  return progress;
};

/**
 * Hook for smooth scroll to element
 */
export const useSmoothScroll = () => {
  const scrollToElement = useCallback((
    elementId: string,
    options?: ScrollIntoViewOptions
  ) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options,
    });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return { scrollToElement, scrollToTop };
};

/**
 * Hook to detect scroll direction
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };

    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return scrollDirection;
};

export default useScrollProgress;
