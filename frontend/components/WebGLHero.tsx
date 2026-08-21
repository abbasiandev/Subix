import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Animated product icons floating in 3D space
function FloatingProduct({ position, icon }: { position: [number, number, number]; icon: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#0070f3"
          emissive="#0070f3"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// Main 3D scene
function Scene() {
  const particlesRef = useRef<THREE.Points>(null);
  
  // Generate particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x += 0.0003;
    }
  });

  // Product positions in 3D space
  const productPositions: [number, number, number][] = [
    [3, 2, 0],
    [-3, 1.5, 1],
    [2, -1, -2],
    [-2, -1.5, 1.5],
    [0, 2.5, -1],
    [4, 0, 2],
  ];

  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0070f3" />

      {/* Main sphere with distortion */}
      <Sphere args={[2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#0070f3"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#001a33"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Floating product spheres */}
      {productPositions.map((pos, i) => (
        <FloatingProduct key={i} position={pos} icon="" />
      ))}

      {/* Particle field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#ffffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

interface WebGLHeroProps {
  className?: string;
}

const WebGLHero: React.FC<WebGLHeroProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-screen ${className}`}>
      {/* WebGL Canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-[#0d0d12]">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            اشتراک هوش مصنوعی
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              در دسترس همه
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            دسترسی به قدرتمندترین ابزارهای هوش مصنوعی
            <br />
            با بهترین قیمت و پشتیبانی ۲۴/۷
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="#products"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              مشاهده محصولات
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              نحوه خرید
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5,
          }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WebGLHero;
