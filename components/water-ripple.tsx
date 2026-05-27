"use client";

import { useRef, useEffect, useMemo, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const MAX_RIPPLES = 30;
const BRUSH_SIZE = 100;
const FBO_SCALE = 0.5;

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

const RANDOM_ROTATIONS = Array.from({ length: MAX_RIPPLES }, (_, i) => seededRandom(i + 1) * Math.PI * 2);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture, uDisplacement;
  uniform vec2 uResolution, uTextureSize, uMaskCenter;
  uniform float uMaskRadius, uTime;
  varying vec2 vUv;
  const float PI = 3.141592653589793238;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y) * 2.0 - 1.0;
  }

  vec2 getCoverUV(vec2 uv, vec2 texSize) {
    float scale = max(uResolution.x / texSize.x, uResolution.y / texSize.y);
    vec2 offset = (uResolution - texSize * scale) * 0.5;
    return (uv * uResolution - offset) / (texSize * scale);
  }

  vec3 applyDuotone(vec3 c) {
    c = clamp((c - 0.5) * 1.2 + 0.5, 0.0, 1.0);
    float lum = pow(dot(c, vec3(0.299, 0.587, 0.114)), 0.9);
    vec3 shadow = vec3(0.08, 0.02, 0.18), highlight = vec3(0.98, 0.65, 0.85);
    vec3 duo = mix(shadow, highlight, smoothstep(0.0, 1.0, lum));
    float shift = (c.r - c.b) * 0.1;
    duo.r += shift; duo.b -= shift * 0.5;
    return clamp(mix(vec3(dot(duo, vec3(0.299, 0.587, 0.114))), duo, 1.3), 0.0, 1.0);
  }

  void main() {
    vec4 disp = texture2D(uDisplacement, vUv);
    float theta = disp.r * 2.0 * PI;
    vec2 finalUv = getCoverUV(vUv, uTextureSize) + vec2(sin(theta), cos(theta)) * disp.r * 0.05;
    vec3 color = applyDuotone(texture2D(uTexture, finalUv).rgb);
    
    vec2 px = vUv * uResolution;
    float dist = distance(px, uMaskCenter * uResolution);
    float n = noise(px * 0.01 + uTime * 0.15) * 50.0;
    float mask = 1.0 - smoothstep(uMaskRadius - 35.0 + n, uMaskRadius + n, dist);
    
    gl_FragColor = vec4(color, mask);
    #include <colorspace_fragment>
  }
`;

function createBrushTexture(): THREE.Texture {
  const canvas = Object.assign(document.createElement("canvas"), { width: 128, height: 128 });
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.3, "rgba(255,255,255,0.5)");
  g.addColorStop(0.7, "rgba(255,255,255,0.1)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function WaterRippleScene({ src, maskRadius }: { src: string; maskRadius: number }) {
  const { size, gl } = useThree();
  const mainMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const imageTexture = useTexture(src);
  const brushTexture = useMemo(() => createBrushTexture(), []);

  const fboRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const brushSceneRef = useRef<THREE.Scene | null>(null);
  const brushCameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const ripplesRef = useRef<{ mesh: THREE.Mesh; material: THREE.MeshBasicMaterial }[]>([]);
  const timeRef = useRef(0);
  const initializedRef = useRef(false);
  const prevMouse = useRef(new THREE.Vector2());
  const currentWave = useRef(0);
  const imageTextureRef = useRef(imageTexture);
  const sizeRef = useRef(size);
  const maskRadiusRef = useRef(maskRadius);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const w = Math.max(1, Math.floor((size.width || 1) * FBO_SCALE));
    const h = Math.max(1, Math.floor((size.height || 1) * FBO_SCALE));
    fboRef.current = new THREE.WebGLRenderTarget(w, h, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });
    brushSceneRef.current = new THREE.Scene();
    const hw = (size.width || 1) / 2, hh = (size.height || 1) / 2;
    brushCameraRef.current = new THREE.OrthographicCamera(-hw, hw, hh, -hh, 0, 10);

    const geo = new THREE.PlaneGeometry(BRUSH_SIZE, BRUSH_SIZE);
    ripplesRef.current = Array.from({ length: MAX_RIPPLES }, (_, i) => {
      const mat = new THREE.MeshBasicMaterial({
        map: brushTexture,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      mesh.rotation.z = RANDOM_ROTATIONS[i] ?? 0;
      brushSceneRef.current!.add(mesh);
      return { mesh, material: mat };
    });

    return () => {
      fboRef.current?.dispose();
      geo.dispose();
      ripplesRef.current.forEach((r) => r.material.dispose());
      initializedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brushTexture]);

  useEffect(() => {
    const w = Math.floor(size.width * FBO_SCALE), h = Math.floor(size.height * FBO_SCALE);
    fboRef.current?.setSize(w, h);
    if (brushCameraRef.current) {
      const hw = size.width / 2, hh = size.height / 2;
      Object.assign(brushCameraRef.current, { left: -hw, right: hw, top: hh, bottom: -hh });
      brushCameraRef.current.updateProjectionMatrix();
    }
  }, [size.width, size.height]);

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = -(e.clientY - rect.top - rect.height / 2);
      if (Math.abs(x - prevMouse.current.x) > 4 || Math.abs(y - prevMouse.current.y) > 4) {
        currentWave.current = (currentWave.current + 1) % MAX_RIPPLES;
        const r = ripplesRef.current[currentWave.current];
        if (r) {
          r.mesh.position.set(x, y, 0);
          r.mesh.visible = true;
          r.material.opacity = 1;
          r.mesh.scale.setScalar(1.5);
        }
        prevMouse.current.set(x, y);
      }
    };
    canvas.addEventListener("pointermove", onMove);
    return () => canvas.removeEventListener("pointermove", onMove);
  }, [gl]);

  useEffect(() => { imageTextureRef.current = imageTexture; }, [imageTexture]);
  useEffect(() => { sizeRef.current = size; }, [size]);
  useEffect(() => { maskRadiusRef.current = maskRadius; }, [maskRadius]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: imageTexture },
      uDisplacement: { value: null as THREE.Texture | null },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uTextureSize: { value: new THREE.Vector2(1, 1) },
      uMaskRadius: { value: 0 },
      uMaskCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((_, delta) => {
    const fbo = fboRef.current;
    const scene = brushSceneRef.current;
    const cam = brushCameraRef.current;
    if (!fbo || !scene || !cam) return;

    timeRef.current += delta;
    const ts = delta * 60;

    ripplesRef.current.forEach(({ mesh, material }) => {
      if (mesh.visible) {
        mesh.rotation.z += 0.02 * ts;
        material.opacity *= Math.pow(0.96, ts);
        mesh.scale.x = mesh.scale.x * 0.982 + 0.108;
        mesh.scale.y = mesh.scale.y * 0.982 + 0.108;
        if (material.opacity < 0.002) mesh.visible = false;
      }
    });

    const prev = gl.getRenderTarget();
    gl.setRenderTarget(fbo);
    gl.clear();
    gl.render(scene, cam);

    const u = mainMaterialRef.current?.uniforms;
    if (u) {
      if (u.uDisplacement) u.uDisplacement.value = fbo.texture;
      if (u.uTexture) u.uTexture.value = imageTextureRef.current;
      if (u.uResolution) u.uResolution.value.set(sizeRef.current.width, sizeRef.current.height);
      const img = imageTextureRef.current.image as HTMLImageElement;
      if (u.uTextureSize && img?.width && img?.height) u.uTextureSize.value.set(img.width, img.height);
      if (u.uMaskRadius) u.uMaskRadius.value = maskRadiusRef.current;
      if (u.uTime) u.uTime.value = timeRef.current;
    }
    gl.setRenderTarget(prev);
  });

  useEffect(() => () => { brushTexture.dispose(); }, [brushTexture]);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mainMaterialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

const emptySubscribe = () => () => {};

export function WaterRipple({ src, maskRadius }: { src: string; maskRadius: number }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ willChange: "transform", transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
    >
      {isMounted && (
        <Canvas
          dpr={1}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false, depth: false }}
          style={{ width: "100%", height: "100%" }}
          frameloop="always"
        >
          <WaterRippleScene src={src} maskRadius={maskRadius} />
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.35} luminanceThreshold={0.65} luminanceSmoothing={0.8} mipmapBlur levels={3} />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}
