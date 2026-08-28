import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ScrollParallaxProps {
  scrollProgress: number;
  layer: 'background' | 'mid' | 'foreground';
}

/**
 * Scroll-based 3D Parallax System
 * Creates depth through multi-layer parallax at different speeds
 */
export const ScrollParallax: React.FC<ScrollParallaxProps> = ({
  scrollProgress,
  layer,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Layer-specific settings
  const layerSettings = useMemo(() => {
    switch (layer) {
      case 'background':
        return {
          speed: 0.2,
          count: 8,
          size: 0.5,
          spread: 15,
          shapes: ['sphere', 'torus'],
        };
      case 'mid':
        return {
          speed: 0.5,
          count: 12,
          size: 0.3,
          spread: 10,
          shapes: ['box', 'octahedron'],
        };
      case 'foreground':
        return {
          speed: 1.5,
          count: 20,
          size: 0.15,
          spread: 8,
          shapes: ['tetrahedron', 'sphere'],
        };
    }
  }, [layer]);

  // Generate shapes
  const shapes = useMemo(() => {
    const shapeArray = [];
    
    for (let i = 0; i < layerSettings.count; i++) {
      const shape = layerSettings.shapes[i % layerSettings.shapes.length];
      const position: [number, number, number] = [
        (Math.random() - 0.5) * layerSettings.spread,
        (Math.random() - 0.5) * layerSettings.spread,
        (Math.random() - 0.5) * layerSettings.spread,
      ];
      const rotation = Math.random() * Math.PI * 2;
      const rotationSpeed = (Math.random() - 0.5) * 0.5;
      
      shapeArray.push({
        shape,
        position,
        rotation,
        rotationSpeed,
        scale: layerSettings.size * (0.8 + Math.random() * 0.4),
      });
    }
    
    return shapeArray;
  }, [layerSettings]);

  // Animate based on scroll
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Move entire group based on scroll
    groupRef.current.position.y = -scrollProgress * 10 * layerSettings.speed;
    
    // Rotate group slowly
    groupRef.current.rotation.y = time * 0.05;
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shapeData, index) => (
        <ParallaxShape
          key={index}
          {...shapeData}
          index={index}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  );
};

/**
 * Individual parallax shape
 */
interface ParallaxShapeProps {
  shape: string;
  position: [number, number, number];
  rotation: number;
  rotationSpeed: number;
  scale: number;
  index: number;
  scrollProgress: number;
}

const ParallaxShape: React.FC<ParallaxShapeProps> = ({
  shape,
  position,
  rotation,
  rotationSpeed,
  scale,
  index,
  scrollProgress,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Rotate shape
    meshRef.current.rotation.x = rotation + time * rotationSpeed;
    meshRef.current.rotation.y = rotation * 2 + time * rotationSpeed * 0.5;
    
    // Fade based on scroll
    const opacity = 1 - scrollProgress * 0.5;
    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.opacity = Math.max(0, opacity);
    }
  });

  // Geometry based on shape type
  const geometry = useMemo(() => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[scale, 16, 16]} />;
      case 'box':
        return <boxGeometry args={[scale, scale, scale]} />;
      case 'torus':
        return <torusGeometry args={[scale, scale * 0.3, 16, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[scale]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[scale]} />;
      default:
        return <sphereGeometry args={[scale, 16, 16]} />;
    }
  }, [shape, scale]);

  // Color based on index
  const color = useMemo(() => {
    const hue = (index * 0.1) % 1;
    return new THREE.Color().setHSL(hue, 0.5, 0.6);
  }, [index]);

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

export default ScrollParallax;
