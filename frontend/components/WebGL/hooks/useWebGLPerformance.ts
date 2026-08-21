import { useEffect, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Performance monitoring hook for WebGL scenes
 * Tracks FPS and adjusts quality settings automatically
 */
export const useWebGLPerformance = () => {
  const [fps, setFps] = useState(60);
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [isTabActive, setIsTabActive] = useState(true);
  
  let frameCount = 0;
  let lastTime = performance.now();

  // Track FPS
  useFrame(() => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      const currentFps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      setFps(currentFps);
      
      // Auto-adjust quality based on FPS
      if (currentFps < 30 && quality !== 'low') {
        setQuality('low');
      } else if (currentFps < 45 && quality === 'high') {
        setQuality('medium');
      } else if (currentFps > 55 && quality !== 'high') {
        setQuality('high');
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
  });

  // Detect tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Get quality settings
  const getQualitySettings = useCallback(() => {
    switch (quality) {
      case 'high':
        return {
          particleCount: 5000,
          logoCount: 20,
          blurAmount: 20,
          shadowQuality: 'high',
        };
      case 'medium':
        return {
          particleCount: 2000,
          logoCount: 15,
          blurAmount: 15,
          shadowQuality: 'medium',
        };
      case 'low':
        return {
          particleCount: 500,
          logoCount: 10,
          blurAmount: 10,
          shadowQuality: 'low',
        };
    }
  }, [quality]);

  return {
    fps,
    quality,
    isTabActive,
    qualitySettings: getQualitySettings(),
  };
};

/**
 * Hook to detect mobile device
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

/**
 * Hook for mouse parallax effect
 */
export const useMouseParallax = (strength: number = 0.02) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * strength;
      const y = (event.clientY / window.innerHeight - 0.5) * strength;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return mouse;
};
