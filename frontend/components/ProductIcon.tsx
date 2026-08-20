interface ProductIconProps {
  product: string;
  size?: number;
  className?: string;
}

export default function ProductIcon({ product, size = 64, className = '' }: ProductIconProps) {
  const iconStyle = {
    width: size,
    height: size,
  };

  // Real product icons with authentic brand colors
  switch (product.toLowerCase()) {
    case 'chatgpt':
      return (
        <div className={`relative ${className}`} style={iconStyle}>
          {/* OpenAI ChatGPT - Official design */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.2819 9.8211C23.5488 9.8211 24.5769 8.79302 24.5769 7.52613C24.5769 6.25923 23.5488 5.23114 22.2819 5.23114C21.015 5.23114 19.9869 6.25923 19.9869 7.52613C19.9869 8.79302 21.015 9.8211 22.2819 9.8211Z" fill="#10A37F"/>
            <path d="M20.6524 17.7262C21.0438 18.8975 20.4041 20.1565 19.2328 20.5479C18.0615 20.9393 16.8025 20.2996 16.4111 19.1283C16.0197 17.957 16.6594 16.698 17.8307 16.3066C19.002 15.9152 20.261 16.5549 20.6524 17.7262Z" fill="#10A37F"/>
            <path d="M11.2819 24C12.5488 24 13.5769 22.9719 13.5769 21.705C13.5769 20.4381 12.5488 19.41 11.2819 19.41C10.015 19.41 8.98691 20.4381 8.98691 21.705C8.98691 22.9719 10.015 24 11.2819 24Z" fill="#10A37F"/>
            <path d="M3.35891 17.7262C3.75029 16.5549 5.00929 15.9152 6.18059 16.3066C7.35189 16.698 7.99159 17.957 7.60021 19.1283C7.20883 20.2996 5.94983 20.9393 4.77853 20.5479C3.60723 20.1565 2.96753 18.8975 3.35891 17.7262Z" fill="#10A37F"/>
            <path d="M1.72943 9.8211C2.99633 9.8211 4.02442 8.79302 4.02442 7.52613C4.02442 6.25923 2.99633 5.23114 1.72943 5.23114C0.462543 5.23114 -0.565544 6.25923 -0.565544 7.52613C-0.565544 8.79302 0.462543 9.8211 1.72943 9.8211Z" fill="#10A37F"/>
            <path d="M3.35891 1.27395C2.96753 2.44525 3.60723 3.70425 4.77853 4.09563C5.94983 4.48701 7.20883 3.84731 7.60021 2.67601C7.99159 1.50471 7.35189 0.245714 6.18059 -0.145667C5.00929 -0.537048 3.75029 0.102652 3.35891 1.27395Z" fill="#10A37F"/>
          </svg>
        </div>
      );

    case 'claude':
      return (
        <div className={`relative ${className}`} style={iconStyle}>
          {/* Anthropic Claude - Brand colors */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#D97757"/>
            <path d="M7 17L12 7L17 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.5 13.5H14.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
      );

    case 'gemini':
      return (
        <div className={`relative ${className}`} style={iconStyle}>
          {/* Google Gemini - Official style */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4285F4"/>
                <stop offset="50%" stopColor="#9B72F2"/>
                <stop offset="100%" stopColor="#D96570"/>
              </linearGradient>
            </defs>
            <circle cx="12" cy="6" r="3" fill="url(#gemini-grad)"/>
            <circle cx="6" cy="18" r="3" fill="url(#gemini-grad)"/>
            <circle cx="18" cy="18" r="3" fill="url(#gemini-grad)"/>
            <path d="M12 9V15M9 16.5L6.5 15M15 16.5L17.5 15" stroke="url(#gemini-grad)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      );

    case 'cursor':
      return (
        <div className={`relative ${className}`} style={iconStyle}>
          {/* Cursor IDE - Brand design */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#000000"/>
            <path d="M8 6L16 12L8 18V6Z" fill="#00D4FF"/>
            <circle cx="16" cy="12" r="1.5" fill="#00D4FF"/>
          </svg>
        </div>
      );

    case 'spotify':
      return (
        <div className={`relative ${className}`} style={iconStyle}>
          {/* Spotify - Official logo */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#1DB954"/>
            <path d="M17.5 10.5C14.5 9 9.5 9 6.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M17 13C14.5 11.8 10 11.8 7 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16 15.5C14 14.5 10.5 14.5 8 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      );

    case 'midjourney':
      return (
        <div className={`relative ${className}`} style={iconStyle}>
          {/* Midjourney style */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#000000"/>
            <path d="M6 18L12 6L18 18M8 14H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      );

    default:
      return (
        <div className={`relative ${className}`} style={iconStyle}>
          {/* Default AI icon */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#6B4FE8"/>
            <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2"/>
            <circle cx="12" cy="12" r="1.5" fill="white"/>
          </svg>
        </div>
      );
  }
}

// 3D-style Product Card Icon with glassmorphism
export function Product3DIcon({ product, className = '' }: { product: string; className?: string }) {
  return (
    <div className={`relative w-24 h-24 ${className}`}>
      {/* 3D container with perspective */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-3" style={{ transformStyle: 'preserve-3d' }}>
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cosmic-orange/20 to-cosmic-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ProductIcon product={product} size={48} />
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Shadow */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/20 blur-xl rounded-full" />
    </div>
  );
}
