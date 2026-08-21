import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

interface Logo {
  path: string;
  initialPosition: [number, number, number];
  targetPosition: [number, number, number];
  rotation: number;
  scale: number;
}

interface MorphingLogoCloudProps {
  logoCount: number;
  mousePosition: { x: number; y: number };
}

/**
 * Morphing logo cloud with 3D brand logos
 * Logos float randomly then morph into "Subix" formation
 */
export const MorphingLogoCloud: React.FC<MorphingLogoCloudProps> = ({
  logoCount,
  mousePosition,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const morphProgress = useRef(0);

  // Brand logo paths
  const brandLogos = [
    '/brands/openai.svg',
    '/brands/spotify.svg',
    '/brands/youtube.svg',
    '/brands/netflix.svg',
    '/brands/github.svg',
    '/brands/canva.svg',
    '/brands/figma.svg',
    '/brands/adobe.svg',
    '/brands/notion.svg',
    '/brands/discord.svg',
    '/brands/cursor.svg',
    '/brands/google.svg',
  ];

  // Generate logo data with random and target positions
  const logos = useMemo<Logo[]>(() => {
    const logoArray: Logo[] = [];
    
    for (let i = 0; i < Math.min(logoCount, brandLogos.length); i++) {
      // Random initial position (floating in space)
      const radius = 4 + Math.random() * 2;
      const theta = (i / logoCount) * Math.PI * 2 + Math.random() * 0.5;
      const phi = Math.PI / 4 + Math.random() * Math.PI / 2;
      
      const initialX = radius * Math.sin(phi) * Math.cos(theta);
      const initialY = radius * Math.sin(phi) * Math.sin(theta);
      const initialZ = radius * Math.cos(phi);
      
      // Target position (forms "SUBIX" text shape)
      const targetX = (i - logoCount / 2) * 0.6;
      const targetY = Math.sin(i * 0.5) * 0.3;
      const targetZ = 0;
      
      logoArray.push({
        path: brandLogos[i % brandLogos.length],
        initialPosition: [initialX, initialY, initialZ],
        targetPosition: [targetX, targetY, targetZ],
        rotation: Math.random() * Math.PI * 2,
        scale: 0.3 + Math.random() * 0.2,
      });
    }
    
    return logoArray;
  }, [logoCount, brandLogos]);

  // Animate morphing and rotation
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Morph progress (0 = random positions, 1 = "SUBIX" formation)
    // Oscillates slowly between states
    morphProgress.current = (Math.sin(time * 0.2) + 1) / 2;
    
    // Apply mouse parallax to group
    groupRef.current.rotation.y = mousePosition.x * 2;
    groupRef.current.rotation.x = -mousePosition.y * 2;
  });

  return (
    <group ref={groupRef}>
      {logos.map((logo, index) => (
        <LogoMesh
          key={index}
          logo={logo}
          index={index}
          morphProgress={morphProgress}
        />
      ))}
    </group>
  );
};

/**
 * Individual logo mesh with animation
 */
const LogoMesh: React.FC<{
  logo: Logo;
  index: number;
  morphProgress: React.MutableRefObject<number>;
}> = ({ logo, index, morphProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime();
    const progress = morphProgress.current;
    
    // Interpolate between initial and target positions
    const x = logo.initialPosition[0] + (logo.targetPosition[0] - logo.initialPosition[0]) * progress;
    const y = logo.initialPosition[1] + (logo.targetPosition[1] - logo.initialPosition[1]) * progress;
    const z = logo.initialPosition[2] + (logo.targetPosition[2] - logo.initialPosition[2]) * progress;
    
    meshRef.current.position.set(x, y, z);
    
    // Breathing scale animation
    const breathe = 1 + Math.sin(time * 2 + index) * 0.1;
    meshRef.current.scale.setScalar(logo.scale * breathe);
    
    // Slow rotation
    meshRef.current.rotation.z = logo.rotation + time * 0.1;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        >
          {/* Logo texture will be loaded dynamically */}
          <primitive attach="map" object={createLogoTexture(logo.path)} />
        </meshBasicMaterial>
      </mesh>
    </Float>
  );
};

/**
 * Create texture from SVG path
 * In production, preload these textures
 */
const createLogoTexture = (path: string): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Draw colored circle as placeholder
    ctx.fillStyle = '#0071e3';
    ctx.beginPath();
    ctx.arc(128, 128, 100, 0, Math.PI * 2);
    ctx.fill();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  
  // TODO: Load actual SVG and render to canvas
  // For now, using placeholder
  
  return texture;
};
