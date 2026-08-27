import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function OrbitalCore() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const particles = useMemo(() => {
    const points = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i++) {
      const radius = 2.8 + Math.random() * 4.8;
      const angle = Math.random() * Math.PI * 2;
      points[i * 3] = Math.cos(angle) * radius;
      points[i * 3 + 1] = (Math.random() - 0.5) * 4;
      points[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return points;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.08;
      group.current.rotation.x = Math.sin(t * 0.18) * 0.08;
    }
    if (core.current) {
      core.current.rotation.x = t * 0.32;
      core.current.rotation.y = t * 0.48;
      core.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.035);
    }
  });

  return (
    <group ref={group}>
      <pointLight position={[0, 0, 1]} color="#00f5ff" intensity={8} distance={8} />
      <mesh ref={core}>
        <icosahedronGeometry args={[1.55, 5]} />
        <meshPhysicalMaterial color="#8b5cf6" emissive="#00e5ff" emissiveIntensity={2.5} metalness={0.85} roughness={0.12} wireframe />
      </mesh>
      <mesh rotation={[0.4, 0.3, 0]}>
        <icosahedronGeometry args={[1.25, 4]} />
        <meshPhysicalMaterial color="#ff4ecd" emissive="#ff2ea6" emissiveIntensity={1.8} transparent opacity={0.28} metalness={0.6} roughness={0.1} />
      </mesh>
      {[2.2, 2.8, 3.35].map((radius, index) => (
        <mesh key={radius} rotation={[index * 0.7, index * 0.45, index * 0.3]}>
          <torusGeometry args={[radius, 0.018 + index * 0.008, 12, 160]} />
          <meshBasicMaterial color={index === 1 ? '#ff795e' : '#00f5ff'} transparent opacity={0.8 - index * 0.12} />
        </mesh>
      ))}
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} /></bufferGeometry>
        <pointsMaterial color="#b7faff" size={0.026} transparent opacity={0.7} sizeAttenuation />
      </points>
    </group>
  );
}

export default function WebGLHero() {
  return (
    <section className="flash-hero">
      <div className="flash-grid" aria-hidden="true" />
      <div className="flash-canvas" aria-hidden="true"><Canvas camera={{ position: [0, 0, 10], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}><color attach="background" args={['#070314']} /><ambientLight intensity={0.35} /><OrbitalCore /></Canvas></div>
      <div className="flash-hero-content">
        <motion.div className="flash-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>SUBIX / AI ACCESS SYSTEM</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>قدرت پردازش<br /><span>در مدار تو</span></motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>اکانت‌های پریمیوم هوش مصنوعی را آنی فعال کن؛ از اولین پیام تا آخرین توکن، بدون اصطکاک.</motion.p>
        <motion.div className="flash-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}><a href="#products" className="flash-button primary">ورود به بازار <span>↙</span></a><a href="#how-it-works" className="flash-button ghost">چطور کار می‌کند؟</a></motion.div>
        <div className="flash-metrics"><div><strong>۱۵K+</strong><small>کاربر فعال</small></div><div><strong>۵۰+</strong><small>سرویس آماده</small></div><div><strong>۲۴/۷</strong><small>پشتیبانی انسانی</small></div></div>
      </div>
      <div className="flash-corner top">LIVE / 02:37:11</div><div className="flash-corner bottom">SCROLL TO EXPLORE <span>↓</span></div>
    </section>
  );
}

export { WebGLHero };
