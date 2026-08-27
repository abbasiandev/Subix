import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function SignalField() {
  const cluster = useRef<THREE.Group>(null)
  const rings = useRef<THREE.Group>(null)
  const points = useMemo(() => {
    const data = new Float32Array(900 * 3)
    for (let i = 0; i < 900; i += 1) {
      const radius = 5 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      data[i * 3] = Math.cos(theta) * radius
      data[i * 3 + 1] = (Math.random() - 0.5) * 6
      data[i * 3 + 2] = Math.sin(theta) * radius - 3
    }
    return data
  }, [])

  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime
    if (cluster.current) {
      cluster.current.rotation.y = t * 0.035 + pointer.x * 0.08
      cluster.current.rotation.x = Math.sin(t * 0.16) * 0.08 + pointer.y * 0.04
    }
    if (rings.current) {
      rings.current.rotation.z = t * -0.04
      rings.current.rotation.x = Math.sin(t * 0.11) * 0.25
    }
  })

  return (
    <>
      <ambientLight intensity={0.18} />
      <pointLight position={[3, 2, 2]} color="#04e6ff" intensity={13} distance={15} />
      <pointLight position={[-4, -1, 3]} color="#d928ff" intensity={10} distance={14} />
      <group ref={cluster}>
        <mesh>
          <icosahedronGeometry args={[1.35, 4]} />
          <meshPhysicalMaterial color="#5b20c9" emissive="#00d9ff" emissiveIntensity={2.8} metalness={0.9} roughness={0.14} wireframe />
        </mesh>
        <mesh scale={0.82}>
          <icosahedronGeometry args={[1.4, 3]} />
          <meshPhysicalMaterial color="#ff438f" emissive="#ff237e" emissiveIntensity={1.6} transparent opacity={0.18} metalness={0.7} roughness={0.08} />
        </mesh>
      </group>
      <group ref={rings}>
        {[2, 2.8, 3.7, 4.6].map((radius, index) => (
          <mesh key={radius} rotation={[index * 0.62, index * 0.38, index * 0.2]}>
            <torusGeometry args={[radius, index === 3 ? 0.012 : 0.022, 10, 180]} />
            <meshBasicMaterial color={index % 2 ? '#ff5cba' : '#00eaff'} transparent opacity={0.5 - index * 0.07} />
          </mesh>
        ))}
      </group>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} /></bufferGeometry>
        <pointsMaterial color="#b7f7ff" size={0.032} transparent opacity={0.55} sizeAttenuation />
      </points>
    </>
  )
}

export default function WebGLRouteStage() {
  return (
    <div className="route-webgl-stage" aria-hidden="true">
      <div className="route-stage-grid" />
      <Canvas camera={{ position: [0, 0, 12], fov: 44 }} dpr={[0.65, 1.15]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <color attach="background" args={['#06020f']} />
        <SignalField />
      </Canvas>
    </div>
  )
}

export { WebGLRouteStage }
