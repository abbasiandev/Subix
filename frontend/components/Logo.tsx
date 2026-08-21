import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'full' | 'icon' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'black';
  animated?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  color = 'primary',
  animated = false,
  className = '',
}) => {
  const sizes = {
    sm: { width: 32, height: 32, fontSize: '1rem' },
    md: { width: 40, height: 40, fontSize: '1.25rem' },
    lg: { width: 56, height: 56, fontSize: '1.75rem' },
    xl: { width: 80, height: 80, fontSize: '2.5rem' },
  };

  const colors = {
    primary: '#0070f3',
    white: '#ffffff',
    black: '#000000',
  };

  const { width, height, fontSize } = sizes[size];
  const fillColor = colors[color];

  // Icon only - Stylized "S" with hexagon
  const IconSVG = () => (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animated ? { scale: 0, rotate: -180 } : false}
      animate={animated ? { scale: 1, rotate: 0 } : false}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Hexagon background */}
      <motion.path
        d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
        fill={`url(#gradient-${color})`}
        initial={animated ? { pathLength: 0 } : false}
        animate={animated ? { pathLength: 1 } : false}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      
      {/* Stylized S */}
      <motion.path
        d="M50 30 C40 30, 35 35, 35 42 C35 48, 40 50, 50 52 C60 54, 65 56, 65 62 C65 68, 60 73, 50 73 C40 73, 35 68, 35 62"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        animate={animated ? { pathLength: 1, opacity: 1 } : false}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
      />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0070f3" />
          <stop offset="100%" stopColor="#00a8ff" />
        </linearGradient>
        <linearGradient id="gradient-white" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8e8ed" />
        </linearGradient>
        <linearGradient id="gradient-black" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d1d1f" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
    </motion.svg>
  );

  // Wordmark - "SUBIX" text
  const WordmarkSVG = () => (
    <motion.div
      style={{ fontSize, fontWeight: 700, letterSpacing: '-0.02em', color: fillColor }}
      className={`font-sans ${className}`}
      initial={animated ? { opacity: 0, x: -20 } : false}
      animate={animated ? { opacity: 1, x: 0 } : false}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      SUBIX
    </motion.div>
  );

  // Full logo - Icon + Wordmark
  if (variant === 'full') {
    return (
      <motion.div 
        className={`flex items-center gap-3 ${className}`}
        initial={animated ? { opacity: 0 } : false}
        animate={animated ? { opacity: 1 } : false}
        transition={{ duration: 0.5 }}
      >
        <IconSVG />
        <WordmarkSVG />
      </motion.div>
    );
  }

  if (variant === 'icon') {
    return <IconSVG />;
  }

  return <WordmarkSVG />;
};

export default Logo;
