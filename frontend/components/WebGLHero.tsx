import React, { useEffect, useRef, useState } from 'react';

type SceneState = { active: boolean; supported: boolean; ready: boolean };

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.8);
    float noise = sin(vPosition.y * 5.0 + uTime * 0.45) * 0.035 + sin(vPosition.x * 8.0 - uTime * 0.25) * 0.025;
    vec3 color = mix(uColor * 0.35, uColor * 1.2, fresnel + noise + 0.35);
    gl_FragColor = vec4(color, 0.28 + fresnel * 0.58);
  }
`;

const particleVertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aScale;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.25 + p.x * 1.8) * 0.035;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aScale * uPixelRatio * (34.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vAlpha = 0.42 + aScale * 0.22;
  }
`;

const particleFragmentShader = `
  varying float vAlpha;
  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float glow = smoothstep(0.5, 0.0, distanceToCenter);
    gl_FragColor = vec4(0.22, 0.96, 1.0, glow * vAlpha);
  }
`;

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

function isLowPowerDevice() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(connection?.saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4));
}

function OrbitalScene({ onStateChange }: { onStateChange: (state: SceneState) => void }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let animationFrame = 0;
    let renderer: import('three').WebGLRenderer | undefined;
    let scene: import('three').Scene | undefined;
    let camera: import('three').PerspectiveCamera | undefined;
    let disposeScene: (() => void) | undefined;

    const start = async () => {
      if (!mountRef.current || process.env.NEXT_PUBLIC_DISABLE_WEBGL === '1' || !supportsWebGL() || isLowPowerDevice()) {
        onStateChange({ active: false, supported: false, ready: true });
        return;
      }

      const THREE = await import('three');
      if (cancelled || !mountRef.current) return;

      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight, false);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute('aria-hidden', 'true');
        mountRef.current.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(42, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100);
        camera.position.set(0, 0.25, 8.8);

        const root = new THREE.Group();
        scene.add(root);
        const startedAt = performance.now();
        const pointer = new THREE.Vector2();
        const targetPointer = new THREE.Vector2();
        const scroll = { current: 0, target: 0 };
        const shaderMaterials: import('three').ShaderMaterial[] = [];

        const makeShaderMaterial = (color: number, opacity = 1) => {
          const material = new THREE.ShaderMaterial({
            uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) } },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            opacity,
          });
          shaderMaterials.push(material);
          return material;
        };

        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.48, 4), makeShaderMaterial(0x7657ff, 1));
        root.add(core);
        const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.92, 2), makeShaderMaterial(0xff4ecd, 0.56));
        root.add(shell);

        [2.25, 2.9, 3.55].forEach((radius, index) => {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(radius, index === 1 ? 0.024 : 0.014, 10, 160),
            new THREE.MeshBasicMaterial({ color: index === 1 ? 0xff795e : 0x00f5ff, transparent: true, opacity: 0.74 - index * 0.13 }),
          );
          ring.rotation.set(index * 0.7, index * 0.45, index * 0.3);
          root.add(ring);
        });

        const particleCount = 1100;
        const particlePositions = new Float32Array(particleCount * 3);
        const particleScales = new Float32Array(particleCount);
        for (let index = 0; index < particleCount; index += 1) {
          const radius = 2.8 + Math.random() * 4.5;
          const angle = Math.random() * Math.PI * 2;
          particlePositions[index * 3] = Math.cos(angle) * radius;
          particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 4.2;
          particlePositions[index * 3 + 2] = Math.sin(angle) * radius - 1;
          particleScales[index] = 0.4 + Math.random() * 1.4;
        }
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('aScale', new THREE.BufferAttribute(particleScales, 1));
        const particleMaterial = new THREE.ShaderMaterial({
          uniforms: { uTime: { value: 0 }, uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) } },
          vertexShader: particleVertexShader,
          fragmentShader: particleFragmentShader,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        root.add(particles);

        let visible = true;
        let tabVisible = !document.hidden;
        const updateActivity = () => onStateChange({ active: visible && tabVisible, supported: true, ready: true });
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updateActivity(); }, { rootMargin: '120px' });
        observer.observe(mountRef.current);
        const onVisibilityChange = () => { tabVisible = !document.hidden; updateActivity(); };
        const onPointerMove = (event: PointerEvent) => { targetPointer.x = (event.clientX / window.innerWidth) * 2 - 1; targetPointer.y = -(event.clientY / window.innerHeight) * 2 + 1; };
        const onScroll = () => { scroll.target = Math.min(1, Math.max(0, window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight))); };
        const onResize = () => {
          if (!mountRef.current || !renderer || !camera) return;
          const activeCamera = camera;
          const { clientWidth, clientHeight } = mountRef.current;
          activeCamera.aspect = clientWidth / Math.max(1, clientHeight);
          activeCamera.updateProjectionMatrix();
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(clientWidth, clientHeight, false);
          particleMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
        };
        document.addEventListener('visibilitychange', onVisibilityChange);
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        onScroll();
        updateActivity();

        const render = () => {
          if (cancelled) return;
          animationFrame = window.requestAnimationFrame(render);
          if (!visible || !tabVisible) return;
          const elapsed = (performance.now() - startedAt) / 1000;
          const motionScale = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.12 : 1;
          pointer.lerp(targetPointer, 0.045);
          scroll.current += (scroll.target - scroll.current) * 0.035;
          root.rotation.y += 0.0018 * motionScale;
          root.rotation.x = pointer.y * 0.08 * motionScale + scroll.current * 0.22;
          root.rotation.z = pointer.x * 0.04 * motionScale;
          if (!camera || !scene) return;
          camera.position.x += (pointer.x * 0.42 * motionScale - camera.position.x) * 0.035;
          camera.position.y += (0.25 + pointer.y * 0.22 * motionScale - camera.position.y) * 0.035;
          camera.lookAt(0, 0, 0);
          core.rotation.x = elapsed * 0.18 * motionScale;
          core.rotation.y = elapsed * 0.28 * motionScale;
          shell.rotation.y = -elapsed * 0.12 * motionScale;
          core.scale.setScalar(1 + Math.sin(elapsed * 1.6) * 0.025 * motionScale);
          shaderMaterials.forEach((material) => { material.uniforms.uTime.value = elapsed * motionScale; });
          particleMaterial.uniforms.uTime.value = elapsed * motionScale;
          particles.rotation.y = elapsed * 0.018 * motionScale + scroll.current * 0.4;
          renderer?.render(scene!, camera!);
        };
        render();

        disposeScene = () => {
          observer.disconnect();
          document.removeEventListener('visibilitychange', onVisibilityChange);
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onResize);
          cancelAnimationFrame(animationFrame);
          scene?.traverse((object) => {
            const mesh = object as import('three').Mesh;
            if (mesh.geometry) mesh.geometry.dispose();
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.filter(Boolean).forEach((material: import('three').Material) => material.dispose());
          });
          renderer?.dispose();
          renderer?.domElement.remove();
        };
      } catch {
        renderer?.dispose();
        onStateChange({ active: false, supported: false, ready: true });
      }
    };

    let idle: number;
    let usedIdleCallback = false;
    if (typeof window.requestIdleCallback === 'function') {
      usedIdleCallback = true;
      idle = window.requestIdleCallback(start, { timeout: 700 });
    } else {
      idle = window.setTimeout(start, 260);
    }
    return () => {
      cancelled = true;
      if (usedIdleCallback && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle);
      else window.clearTimeout(idle as number);
      disposeScene?.();
    };
  }, [onStateChange]);

  return <div ref={mountRef} className="flash-canvas" aria-hidden="true" />;
}

export default function WebGLHero() {
  const [sceneState, setSceneState] = useState<SceneState>({ active: false, supported: true, ready: false });
  const handleStateChange = React.useCallback((state: SceneState) => setSceneState(state), []);

  return (
      <section id="home" className={`flash-hero ${sceneState.supported && sceneState.ready ? 'webgl-ready' : 'webgl-fallback'}`} aria-labelledby="hero-title">
      <div className="flash-grid" aria-hidden="true" />
      <div className="flash-fallback" aria-hidden="true" />
      <OrbitalScene onStateChange={handleStateChange} />
      <div className="flash-hero-content">
         <div className="flash-kicker"><span dir="ltr">FLUXO</span> / جریان انتخاب</div>
         <h1 id="hero-title">از نیاز تا انتخاب،<br/><span>در یک جریان.</span></h1>
         <p>فلوکسو انتخاب اکانت هوش مصنوعی را به یک مسیر ساده تبدیل می‌کند: نیازتان را بشناسید، گزینه‌ها را مقایسه کنید و با اطمینان انتخاب کنید.</p>
         <div className="flash-actions">
           <a href="#selection-flow" className="flash-button primary">شروع مسیر انتخاب <span aria-hidden="true">↙</span></a>
        </div>
      </div>
       <div className="flash-corner top">FLUXO / ۰۱</div>
        <div className="flash-corner bottom">جریان انتخاب را دنبال کنید <span aria-hidden="true">↓</span></div>
      <span className="sr-only">{sceneState.supported && sceneState.ready ? 'نمایش سه‌بعدی فعال است' : 'نمایش سه‌بعدی در دسترس نیست؛ پس‌زمینه جایگزین فعال است'}</span>
    </section>
  );
}

export { WebGLHero };
