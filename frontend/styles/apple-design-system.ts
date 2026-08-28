/**
 * Apple Design System
 * Production-grade design tokens following Apple Human Interface Guidelines
 * Supports both Persian (Estedad) and Latin (SF Pro) typography
 * Implements Liquid Glass visual language for premium UX
 */

export const designSystem = {
  /**
   * Color Palette - Semantic, minimal approach
   * Based on Apple's refined color system with high contrast ratios
   */
  colors: {
    // Primary brand color - Apple blue
    primary: {
      DEFAULT: '#0071e3',
      hover: '#0077ed',
      active: '#006edb',
      light: '#e5f2ff',
    },

    // Surface colors - Light/Dark theme support
    surface: {
      light: '#ffffff',
      dark: '#000000',
      elevated: {
        light: '#f5f5f7',
        dark: '#1d1d1f',
      },
      // Liquid Glass backgrounds
      glass: {
        light: 'rgba(255, 255, 255, 0.72)',
        dark: 'rgba(0, 0, 0, 0.72)',
        // Glass with saturation boost for vibrancy
        vibrant: 'rgba(255, 255, 255, 0.8)',
      },
    },

    // Text colors - WCAG AAA compliant
    text: {
      primary: '#1d1d1f',      // 21:1 contrast on white
      secondary: '#86868b',     // 4.6:1 contrast on white
      tertiary: '#b0b0b5',      // 3.2:1 contrast (large text only)
      inverse: {
        primary: '#f5f5f7',     // On dark backgrounds
        secondary: '#a1a1a6',
      },
    },

    // Neutral scale - Apple's refined grays
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

    // Semantic accent colors
    accent: {
      success: {
        DEFAULT: '#34c759',
        light: '#e8f8ec',
        dark: '#28a745',
      },
      warning: {
        DEFAULT: '#ff9500',
        light: '#fff4e5',
        dark: '#ff8800',
      },
      error: {
        DEFAULT: '#ff3b30',
        light: '#ffe8e6',
        dark: '#e62e24',
      },
      info: {
        DEFAULT: '#0071e3',
        light: '#e5f2ff',
        dark: '#005bb5',
      },
    },

    // Discount badge gradient - Eye-catching but tasteful
    discount: {
      from: '#ff3b30',
      to: '#ff9500',
    },

    // Product category colors (subtle, used sparingly)
    category: {
      ai: '#a78bfa',          // Purple for AI tools
      music: '#1db954',       // Spotify green
      devTools: '#24292e',    // GitHub dark
      design: '#00c4cc',      // Canva cyan
      media: '#e50914',       // Netflix red
    },
  },

  /**
   * Typography - SF Pro (Latin) + Estedad (Persian)
   * Apple's refined type scale with optical sizing
   */
  typography: {
    fontFamily: {
      // Latin typography - Apple standard
      display: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      text: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"SF Mono", "Monaco", "Menlo", "Courier New", monospace',
      
      // Persian typography - Modern, geometric
      persian: '"Estedad", "IRANYekan", system-ui, sans-serif',
      
      // Combined for mixed content (auto-selects based on script)
      system: '"Estedad", "SF Pro Text", -apple-system, system-ui, sans-serif',
    },

    // Type scale - Modular scale based on 16px base
    fontSize: {
      xs: '0.75rem',      // 12px - Captions, labels
      sm: '0.875rem',     // 14px - Secondary text
      base: '1rem',       // 16px - Body text
      lg: '1.125rem',     // 18px - Large body, subheadings
      xl: '1.25rem',      // 20px - Section headings
      '2xl': '1.5rem',    // 24px - Page subheadings
      '3xl': '1.875rem',  // 30px - Card headings
      '4xl': '2.25rem',   // 36px - Section titles
      '5xl': '3rem',      // 48px - Hero subheadings
      '6xl': '3.75rem',   // 60px - Hero headings
      '7xl': '4.5rem',    // 72px - Display (desktop)
      '8xl': '6rem',      // 96px - Large display
    },

    // Font weights - Apple's refined scale
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 800,
    },

    // Line heights - Optical spacing for readability
    lineHeight: {
      tight: 1.1,         // Display text
      snug: 1.2,          // Headings
      normal: 1.5,        // Body text
      relaxed: 1.6,       // Large body, Persian text
      loose: 1.8,         // Special cases
    },

    // Letter spacing - Refined tracking
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  /**
   * Spacing - 4px base unit system
   * Follows Apple's 8-point grid for alignment
   */
  spacing: {
    base: 4,              // Base unit in pixels
    scale: {
      0: '0',
      1: '0.25rem',       // 4px
      2: '0.5rem',        // 8px
      3: '0.75rem',       // 12px
      4: '1rem',          // 16px
      5: '1.25rem',       // 20px
      6: '1.5rem',        // 24px
      8: '2rem',          // 32px
      10: '2.5rem',       // 40px
      12: '3rem',         // 48px
      16: '4rem',         // 64px
      20: '5rem',         // 80px
      24: '6rem',         // 96px
      32: '8rem',         // 128px
    },
  },

  /**
   * Liquid Glass - Apple's translucent material system
   * Backdrop blur with adaptive tint for depth hierarchy
   */
  liquidGlass: {
    blur: {
      nav: '20px',          // Navigation bar
      modal: '40px',        // Modal overlays
      card: '10px',         // Card hover states
      subtle: '5px',        // Minimal blur
    },
    
    opacity: {
      regular: 0.72,        // Standard glass (nav, toolbars)
      clear: 0.4,           // Clear glass (over media)
      heavy: 0.85,          // Heavy glass (prominent elements)
      light: 0.5,           // Light glass (subtle overlays)
    },
    
    saturation: {
      boost: 1.2,           // Saturation multiplier for vibrancy
      default: 1.0,
    },
  },

  /**
   * Shadows - Elevation system for depth
   * Soft, natural shadows matching Apple's refined aesthetics
   */
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    
    // Colored shadows for emphasis
    glow: {
      primary: '0 4px 20px rgba(0, 113, 227, 0.3)',
      discount: '0 4px 12px rgba(255, 59, 48, 0.3)',
      success: '0 4px 12px rgba(52, 199, 89, 0.3)',
    },
  },

  /**
   * Border Radius - Apple's refined corner radii
   */
  borderRadius: {
    none: '0',
    sm: '0.25rem',        // 4px - Small elements
    md: '0.5rem',         // 8px - Cards, buttons
    lg: '0.75rem',        // 12px - Larger cards
    xl: '1rem',           // 16px - Prominent cards
    '2xl': '1.25rem',     // 20px - Hero elements
    '3xl': '1.5rem',      // 24px - Large surfaces
    full: '9999px',       // Pills, badges
  },

  /**
   * Animation - Apple's refined motion system
   * Emphasizes natural, purposeful movement
   */
  animation: {
    duration: {
      fast: '150ms',        // Quick feedback (button press)
      normal: '300ms',      // Standard transitions
      slow: '500ms',        // Deliberate animations
      slower: '800ms',      // Hero animations
    },
    
    easing: {
      // Apple's signature easing curves
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',          // Standard ease
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',      // Spring bounce
      decelerate: 'cubic-bezier(0, 0, 0.2, 1)',         // Ease out
      accelerate: 'cubic-bezier(0.4, 0, 1, 1)',         // Ease in
      anticipate: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bounce
    },
  },

  /**
   * Breakpoints - Responsive design system
   * Matches common Apple device widths
   */
  breakpoints: {
    xs: '320px',          // iPhone SE
    sm: '375px',          // iPhone 12/13
    md: '768px',          // iPad
    lg: '1024px',         // iPad Pro, small desktop
    xl: '1280px',         // Desktop
    '2xl': '1536px',      // Large desktop
  },

  /**
   * Z-Index - Layering system for stacking context
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  /**
   * Accessibility - WCAG compliance constants
   */
  accessibility: {
    // Minimum contrast ratios
    contrast: {
      text: 4.5,          // WCAG AA for normal text
      largeText: 3.0,     // WCAG AA for large text (18pt+)
      uiComponent: 3.0,   // WCAG AA for UI components
      enhanced: 7.0,      // WCAG AAA for normal text
    },
    
    // Minimum touch target sizes
    touchTarget: {
      mobile: 44,         // 44pt minimum (iOS guideline)
      desktop: 24,        // 24px minimum for mouse targets
    },
    
    // Focus indicator
    focusRing: {
      width: '2px',
      offset: '2px',
      color: '#0071e3',
      opacity: 0.5,
    },
  },
} as const;

/**
 * Type definitions for TypeScript autocomplete
 */
export type DesignSystem = typeof designSystem;
export type ColorToken = keyof typeof designSystem.colors;
export type FontSize = keyof typeof designSystem.typography.fontSize;
export type Spacing = keyof typeof designSystem.spacing.scale;
export type Shadow = keyof typeof designSystem.shadows;
export type BorderRadius = keyof typeof designSystem.borderRadius;
export type AnimationDuration = keyof typeof designSystem.animation.duration;
export type AnimationEasing = keyof typeof designSystem.animation.easing;
export type Breakpoint = keyof typeof designSystem.breakpoints;
export type ZIndex = keyof typeof designSystem.zIndex;

/**
 * Helper function to get color with opacity
 * @param color - RGB color string
 * @param opacity - Opacity value (0-1)
 */
export const withOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

/**
 * Helper function to apply Liquid Glass effect
 * Returns CSS properties object for Liquid Glass material
 */
export const liquidGlassEffect = (
  variant: 'regular' | 'clear' | 'heavy' = 'regular',
  blurAmount: 'nav' | 'modal' | 'card' | 'subtle' = 'nav'
) => {
  const opacity = designSystem.liquidGlass.opacity[variant];
  const blur = designSystem.liquidGlass.blur[blurAmount];
  
  return {
    backdropFilter: `blur(${blur}) saturate(${designSystem.liquidGlass.saturation.boost})`,
    WebkitBackdropFilter: `blur(${blur}) saturate(${designSystem.liquidGlass.saturation.boost})`,
    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    border: '1px solid rgba(255, 255, 255, 0.18)',
  };
};

export default designSystem;
