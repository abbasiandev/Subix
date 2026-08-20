import { ReactNode, HTMLAttributes, useState, forwardRef } from 'react';

interface GlassContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  elevation?: 'subtle' | 'light' | 'medium' | 'strong';
  hover?: boolean;
  animated?: boolean;
  magnetic?: boolean;
  className?: string;
}

const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(({
  children,
  elevation = 'light',
  hover = false,
  animated = false,
  magnetic = false,
  className = '',
  ...props
}, ref) => {
  const [magneticStyle, setMagneticStyle] = useState({});

  const elevationClass = {
    subtle: 'glass-subtle',
    light: 'glass-light',
    medium: 'glass-medium',
    strong: 'glass-strong',
  }[elevation];

  const hoverClass = hover ? 'glass-hover' : '';
  const magneticClass = magnetic ? 'glass-magnetic' : '';
  const animatedClass = animated ? 'opacity-0' : '';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magnetic) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle magnetic pull effect (max 8px movement)
    const moveX = x * 0.05;
    const moveY = y * 0.05;

    setMagneticStyle({
      transform: `translate(${moveX}px, ${moveY}px)`,
    });
  };

  const handleMouseLeave = () => {
    if (!magnetic) return;
    setMagneticStyle({
      transform: 'translate(0px, 0px)',
    });
  };

  return (
    <div
      ref={ref}
      className={`
        ${elevationClass}
        ${hoverClass}
        ${magneticClass}
        ${animatedClass}
        gpu-accelerated
        ${className}
      `.trim()}
      style={magnetic ? { ...magneticStyle, transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
});

GlassContainer.displayName = 'GlassContainer';

export default GlassContainer;
