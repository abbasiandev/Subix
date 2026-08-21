/**
 * Subix Design System
 * Apple-inspired design tokens for consistent UI/UX
 */

export const colors = {
  // Primary brand colors
  primary: {
    50: '#e6f7ff',
    100: '#bae7ff',
    200: '#91d5ff',
    300: '#69c0ff',
    400: '#40a9ff',
    500: '#1890ff',
    600: '#0070f3', // Main brand color
    700: '#0050b3',
    800: '#003a8c',
    900: '#002766',
  },
  
  // Neutrals - Apple style
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f7',
    200: '#e8e8ed',
    300: '#d2d2d7',
    400: '#b0b0b5',
    500: '#86868b',
    600: '#6e6e73',
    700: '#515154',
    800: '#1d1d1f',
    900: '#000000',
  },
  
  // Glass backgrounds
  glass: {
    light: 'rgba(255, 255, 255, 0.72)',
    medium: 'rgba(255, 255, 255, 0.5)',
    dark: 'rgba(0, 0, 0, 0.72)',
    darkMedium: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Semantic colors
  success: '#34c759',
  warning: '#ff9500',
  error: '#ff3b30',
  info: '#0070f3',
  
  // Product category colors
  categories: {
    chatgpt: '#10a37f',
    claude: '#d97757',
    gemini: '#4285f4',
    spotify: '#1db954',
    cursor: '#000000',
    github: '#24292e',
    midjourney: '#000000',
    canva: '#00c4cc',
    youtube: '#ff0000',
    netflix: '#e50914',
  },
  
  // Gradients
  gradients: {
    hero: 'linear-gradient(180deg, #000000 0%, #1d1d1f 100%)',
    card: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    primary: 'linear-gradient(135deg, #0070f3 0%, #00a8ff 100%)',
    premium: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
};

export const typography = {
  // Font families - SF Pro for Apple feel
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
    farsi: '"Vazirmatn", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  // Font sizes - modular scale
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
    '8xl': '6rem',      // 96px
  },
  
  // Font weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
};

export const borderRadius = {
  none: '0',
  sm: '0.375rem',    // 6px
  base: '0.5rem',    // 8px
  md: '0.75rem',     // 12px
  lg: '1rem',        // 16px
  xl: '1.5rem',      // 24px
  '2xl': '2rem',     // 32px
  '3xl': '3rem',     // 48px
  full: '9999px',
};

export const shadows = {
  // Apple-style soft shadows
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  '2xl': '0 50px 100px -20px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // Colored shadows
  primary: '0 20px 60px -15px rgba(0, 112, 243, 0.4)',
  success: '0 20px 60px -15px rgba(52, 199, 89, 0.4)',
  error: '0 20px 60px -15px rgba(255, 59, 48, 0.4)',
  
  // Glass effect
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
};

export const blur = {
  none: '0',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px',
};

export const transitions = {
  // Duration
  duration: {
    instant: '75ms',
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
    slowest: '700ms',
  },
  
  // Easing - Apple's curves
  easing: {
    // Standard
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    
    // Apple's ease curves
    appleEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    appleSpring: 'cubic-bezier(0.5, 1.5, 0.5, 1)',
    
    // Enter
    easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    
    // Exit
    easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    
    // Sharp
    sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
  },
};

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
};

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
  max: 9999,
};

export const animation = {
  // Keyframes for common animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  
  fadeInUp: {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  
  fadeInDown: {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  
  scaleIn: {
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
  
  slideInRight: {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
  },
  
  bounce: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  
  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  },
  
  shimmer: {
    '0%': { backgroundPosition: '-1000px 0' },
    '100%': { backgroundPosition: '1000px 0' },
  },
};

// Framer Motion variants
export const motionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  
  slideInRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
  
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

export const glass = {
  // Glass morphism presets
  light: {
    background: 'rgba(255, 255, 255, 0.72)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  
  medium: {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(16px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  
  dark: {
    background: 'rgba(0, 0, 0, 0.72)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  
  darkMedium: {
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(16px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
};

export const designSystem = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  blur,
  transitions,
  breakpoints,
  zIndex,
  animation,
  motionVariants,
  glass,
};

export default designSystem;
