import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { ParticleSystem } from './ParticleSystem';
import { MorphingLogoCloud } from './MorphingLogoCloud';
import { useWebGLPerformance, useIsMobile, useMouseParallax } from './hooks/useWebGLPerformance';

interface HeroSceneProps {
  scrollProgress?: number;
  className?: string;
}

/**
 * Main WebGL Hero Scene
 * Combines morphing logos, particle system, and interactive effects
 * Optimized for 60fps on desktop, 30fps on mobile
 */
export const HeroScene: React.FC<HeroSceneProps> = ({ 
  scrollProgress = 0,
  className = '',
}) => {
  const { qualitySettings, isTabActive } = useWebGLPerformance();
  const isMobile = useIsMobile();
  const mousePosition = useMouseParallax(0.02);

  // Adjust settings for mobile
  const particleCount = isMobile 
    ? Math.floor(qualitySettings.particleCount / 5) 
    : qualitySettings.particleCount;
    
  const logoCount = isMobile
    ? Math.floor(qualitySettings.logoCount / 2)
    : qualitySettings.logoCount;

  return (
    <div className={`webgl-hero-container ${className}`}>
      <Canvas
        className="webgl-canvas"
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        performance={{ min: 0.5 }}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 10]}
            fov={50}
          />

          {/* Lights */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0071e3" />

          {/* Particle System */}
          {isTabActive && (
            <ParticleSystem 
              count={particleCount}
              scrollProgress={scrollProgress}
            />
          )}

          {/* Morphing Logo Cloud */}
          {isTabActive && (
            <MorphingLogoCloud
              logoCount={logoCount}
              mousePosition={mousePosition}
            />
          )}

          {/* Environment (subtle ambient lighting) */}
          <Environment preset="city" />

          {/* Debug controls (disable in production) */}
          {process.env.NODE_ENV === 'development' && (
            <OrbitControls enableZoom={false} enablePan={false} />
          )}
        </Suspense>
      </Canvas>

      {/* FPS counter (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <FPSCounter />
      )}

      <style jsx>{`
        .webgl-hero-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .webgl-canvas {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

/**
 * FPS Counter for development
 */
const FPSCounter: React.FC = () => {
  const { fps, quality } = useWebGLPerformance();
  
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: '4px',
      fontFamily: 'monospace',
      fontSize: '12px',
      zIndex: 1000,
    }}>
      <div>FPS: {fps}</div>
      <div>Quality: {quality}</div>
    </div>
  );
};

export default HeroScene;
