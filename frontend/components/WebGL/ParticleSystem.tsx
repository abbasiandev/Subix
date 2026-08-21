import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count: number;
  scrollProgress?: number;
}

/**
 * GPU-accelerated particle system
 * Forms AI brain/network shape with connecting lines
 */
export const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  count,
  scrollProgress = 0,
}) => {
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate particle positions in brain/network shape
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create spherical distribution with some clustering
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, [count]);

  // Create line connections between nearby particles
  const linePositions = useMemo(() => {
    const maxConnections = 100;
    const connectionDistance = 0.8;
    const positions: number[] = [];
    
    for (let i = 0; i < count && positions.length < maxConnections * 6; i++) {
      const i3 = i * 3;
      const x1 = particlePositions[i3];
      const y1 = particlePositions[i3 + 1];
      const z1 = particlePositions[i3 + 2];
      
      for (let j = i + 1; j < count && positions.length < maxConnections * 6; j++) {
        const j3 = j * 3;
        const x2 = particlePositions[j3];
        const y2 = particlePositions[j3 + 1];
        const z2 = particlePositions[j3 + 2];
        
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dz = z2 - z1;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < connectionDistance) {
          positions.push(x1, y1, z1, x2, y2, z2);
        }
      }
    }
    
    return new Float32Array(positions);
  }, [particlePositions, count]);

  // Animate particles
  useFrame(({ clock }) => {
    if (!particlesRef.current || !linesRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Rotate particle system
    particlesRef.current.rotation.y = time * 0.05;
    particlesRef.current.rotation.x = Math.sin(time * 0.03) * 0.2;
    
    // Sync lines with particles
    linesRef.current.rotation.y = particlesRef.current.rotation.y;
    linesRef.current.rotation.x = particlesRef.current.rotation.x;
    
    // Color shift based on scroll
    const hue = 0.6 + scrollProgress * 0.2; // Blue to purple
    const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
    
    if (particlesRef.current.material instanceof THREE.PointsMaterial) {
      particlesRef.current.material.color = color;
    }
    
    if (linesRef.current.material instanceof THREE.LineBasicMaterial) {
      linesRef.current.material.color = color;
      linesRef.current.material.opacity = 0.3 - scrollProgress * 0.1;
    }
  });

  return (
    <group>
      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#0071e3"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0071e3"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};
