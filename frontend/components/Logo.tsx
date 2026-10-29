import React, { memo } from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'black';
  animated?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { symbol: 24, text: 15, letterSpacing: '-3px', gap: 8 },
  md: { symbol: 32, text: 18, letterSpacing: '-4px', gap: 10 },
  lg: { symbol: 42, text: 24, letterSpacing: '-5px', gap: 12 },
  xl: { symbol: 56, text: 32, letterSpacing: '-6px', gap: 16 },
};

const Logo: React.FC<LogoProps> = memo(({
  variant = 'full',
  size = 'md',
  color = 'white',
  className = '',
}) => {
  const currentSize = sizeConfig[size] || sizeConfig.md;
  const textColor = color === 'black' ? '#000000' : '#ffffff';
  const dotColor = 'var(--site-accent-text, #f4d548)';

  const symbol = (
    <span
      className="wordmark-symbol select-none"
      aria-hidden="true"
      style={{
        font: `800 ${currentSize.symbol}px/1 system-ui, -apple-system, sans-serif`,
        letterSpacing: currentSize.letterSpacing,
        color: textColor,
        direction: 'ltr',
        display: 'inline-block',
      }}
    >
      F<span style={{ color: dotColor }}>.</span>
    </span>
  );

  const wordmark = (
    <span
      className="select-none"
      style={{
        fontSize: `${currentSize.text}px`,
        fontWeight: 700,
        color: textColor,
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
        lineHeight: 1,
      }}
    >
      فلوکسو
    </span>
  );

  if (variant === 'icon') {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        {symbol}
      </span>
    );
  }

  if (variant === 'wordmark') {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        {wordmark}
      </span>
    );
  }

  return (
    <div
      className={`site-wordmark inline-flex items-center ${className}`}
      style={{
        gap: `${currentSize.gap}px`,
        color: textColor,
      }}
    >
      {symbol}
      {wordmark}
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;
