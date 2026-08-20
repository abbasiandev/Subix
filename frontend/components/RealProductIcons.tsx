export function ChatGPTIcon({ size = 64 }: { size?: number }) {
  return (
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
      alt="ChatGPT"
      width={size}
      height={size}
      className="transition-transform hover:scale-110"
    />
  );
}

export function ClaudeIcon({ size = 64 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="flex items-center justify-center bg-gradient-to-br from-orange-600 to-orange-400 rounded-2xl transition-transform hover:scale-110">
      <svg viewBox="0 0 24 24" fill="white" width={size * 0.6} height={size * 0.6}>
        <path d="M7 17L12 7L17 17M9.5 13.5H14.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export function GeminiIcon({ size = 64 }: { size?: number }) {
  return (
    <img 
      src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
      alt="Gemini"
      width={size}
      height={size}
      className="transition-transform hover:scale-110"
    />
  );
}

export function CursorIcon({ size = 64 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="flex items-center justify-center bg-black rounded-2xl transition-transform hover:scale-110">
      <svg viewBox="0 0 24 24" fill="none" width={size * 0.6} height={size * 0.6}>
        <path d="M8 6L16 12L8 18V6Z" fill="#00D4FF"/>
        <circle cx="16" cy="12" r="1.5" fill="#00D4FF"/>
      </svg>
    </div>
  );
}

export function SpotifyIcon({ size = 64 }: { size?: number }) {
  return (
    <img 
      src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
      alt="Spotify"
      width={size}
      height={size}
      className="transition-transform hover:scale-110 rounded-2xl"
    />
  );
}

// Dynamic icon selector
export function ProductIconReal({ product, size = 64 }: { product: string; size?: number }) {
  const productLower = product.toLowerCase();
  
  if (productLower.includes('chatgpt') || productLower.includes('gpt')) {
    return <ChatGPTIcon size={size} />;
  }
  if (productLower.includes('claude')) {
    return <ClaudeIcon size={size} />;
  }
  if (productLower.includes('gemini')) {
    return <GeminiIcon size={size} />;
  }
  if (productLower.includes('cursor')) {
    return <CursorIcon size={size} />;
  }
  if (productLower.includes('spotify')) {
    return <SpotifyIcon size={size} />;
  }
  
  // Default
  return (
    <div style={{ width: size, height: size }} className="flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl">
      <svg viewBox="0 0 24 24" fill="white" width={size * 0.6} height={size * 0.6}>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      </svg>
    </div>
  );
}
