import * as THREE from 'three';

/**
 * Glass Refraction Shader
 * Creates liquid glass effect with light bending and chromatic aberration
 */
export class GlassShader {
  /**
   * Vertex Shader
   */
  static vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  /**
   * Fragment Shader
   */
  static fragmentShader = `
    uniform float uTime;
    uniform float uOpacity;
    uniform float uRefractionStrength;
    uniform vec3 uColor;
    uniform sampler2D uBackground;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      // Fresnel effect (edges are more transparent)
      vec3 viewDir = normalize(vPosition);
      float fresnel = pow(1.0 + dot(viewDir, vNormal), 3.0);
      
      // Refraction with chromatic aberration
      vec2 refractOffset = vNormal.xy * uRefractionStrength;
      
      // Sample background with slight offset for each color channel
      float r = texture2D(uBackground, vUv + refractOffset * 1.0).r;
      float g = texture2D(uBackground, vUv + refractOffset * 0.98).g;
      float b = texture2D(uBackground, vUv + refractOffset * 0.96).b;
      
      vec3 refractedColor = vec3(r, g, b);
      
      // Mix with glass color
      vec3 glassColor = mix(refractedColor, uColor, 0.1);
      
      // Apply fresnel for edge glow
      glassColor += uColor * fresnel * 0.3;
      
      // Subtle noise for glass texture
      float noise = fract(sin(dot(vUv + uTime * 0.1, vec2(12.9898, 78.233))) * 43758.5453);
      glassColor += noise * 0.02;
      
      gl_FragColor = vec4(glassColor, uOpacity * (1.0 - fresnel * 0.3));
    }
  `;

  /**
   * Create glass material with shader
   */
  static createMaterial(options: {
    color?: THREE.Color;
    opacity?: number;
    refractionStrength?: number;
    backgroundTexture?: THREE.Texture;
  } = {}): THREE.ShaderMaterial {
    const {
      color = new THREE.Color(0x0071e3),
      opacity = 0.3,
      refractionStrength = 0.02,
      backgroundTexture,
    } = options;

    return new THREE.ShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: opacity },
        uRefractionStrength: { value: refractionStrength },
        uColor: { value: color },
        uBackground: { value: backgroundTexture || null },
      },
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending,
    });
  }

  /**
   * Update shader uniforms (call in animation loop)
   */
  static updateMaterial(material: THREE.ShaderMaterial, time: number): void {
    if (material.uniforms.uTime) {
      material.uniforms.uTime.value = time;
    }
  }
}

/**
 * Helper to create glass plane
 */
export const createGlassPlane = (
  width: number,
  height: number,
  options?: Parameters<typeof GlassShader.createMaterial>[0]
): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = GlassShader.createMaterial(options);
  
  return new THREE.Mesh(geometry, material);
};

/**
 * Helper to create glass sphere
 */
export const createGlassSphere = (
  radius: number,
  options?: Parameters<typeof GlassShader.createMaterial>[0]
): THREE.Mesh => {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = GlassShader.createMaterial(options);
  
  return new THREE.Mesh(geometry, material);
};

export default GlassShader;
