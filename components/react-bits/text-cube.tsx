"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface TextCubeProps {
  /** Container width */
  width?: string | number;
  /** Container height */
  height?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Content rendered above the effect */
  children?: React.ReactNode;
  /** The word rendered on each face */
  word?: string;
  /** Cube edge length in pixels */
  cubeSize?: number;
  /** Rotation speed multiplier */
  rotationSpeed?: number;
  /** How quickly the cube follows the cursor (0-1) */
  followSpeed?: number;
  /** Number of text duplicates per face */
  density?: number;
  /** Base font size in pixels */
  fontSize?: number;
  /** Font weight (100-900) */
  fontWeight?: number;
  /** Font family */
  fontFamily?: string;
  /** Text color (hex) */
  color?: string;
  /** Background color (hex) */
  backgroundColor?: string;
  /** Horizontal offset from cursor in pixels */
  offsetX?: number;
  /** Vertical offset from cursor in pixels */
  offsetY?: number;
  /** Breathing animation amplitude (0-1) */
  breathe?: number;
  /** Breathing animation speed */
  breatheSpeed?: number;
  /** Tail opacity at furthest face (0-1) */
  depthFade?: number;
  /** Perspective distance in pixels */
  perspective?: number;
  /** Auto-rotate on X axis when idle */
  autoRotateX?: number;
  /** Auto-rotate on Y axis when idle */
  autoRotateY?: number;
  /** Master opacity (0-1) */
  opacity?: number;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function rotX(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}

function rotY(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
}

function rotZ(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c, z: p.z };
}

function projectPoint(
  p: Vec3,
  persp: number,
): { sx: number; sy: number; depth: number } {
  const d = persp / (persp + p.z);
  return { sx: p.x * d, sy: p.y * d, depth: d };
}

const FACE_NORMALS: Vec3[] = [
  { x: 0, y: 0, z: -1 },
  { x: 0, y: 0, z: 1 },
  { x: -1, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: 1, z: 0 },
];

const FACE_CENTERS: Vec3[] = [
  { x: 0, y: 0, z: -1 },
  { x: 0, y: 0, z: 1 },
  { x: -1, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: 1, z: 0 },
];

const FACE_UP: Vec3[] = [
  { x: 0, y: -1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: -1 },
];

const FACE_RIGHT: Vec3[] = [
  { x: 1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: -1 },
  { x: 1, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
];

const TextCube: React.FC<TextCubeProps> = ({
  width = "100%",
  height = "100%",
  className,
  children,
  word = "x",
  cubeSize = 200,
  rotationSpeed = 1,
  followSpeed = 0.08,
  density = 20,
  fontSize = 16,
  fontWeight = 100,
  fontFamily = "'Inter', sans-serif",
  color = "#1a1a1a",
  backgroundColor = "#ffffff",
  offsetX = 0,
  offsetY = 0,
  breathe = 0.1,
  breatheSpeed = 2,
  depthFade = 0.3,
  perspective = 500,
  autoRotateX = 0.3,
  autoRotateY = 0.3,
  opacity = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    posX: 0,
    posY: 0,
    frameW: 0,
    frameH: 0,
    dpr: 1,
    entered: false,
  });
  const cfgRef = useRef({
    word,
    cubeSize,
    rotationSpeed,
    followSpeed,
    density,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    backgroundColor,
    offsetX,
    offsetY,
    breathe,
    breatheSpeed,
    depthFade,
    perspective,
    autoRotateX,
    autoRotateY,
    opacity,
  });

  useEffect(() => {
    cfgRef.current = {
      word,
      cubeSize,
      rotationSpeed,
      followSpeed,
      density,
      fontSize,
      fontWeight,
      fontFamily,
      color,
      backgroundColor,
      offsetX,
      offsetY,
      breathe,
      breatheSpeed,
      depthFade,
      perspective,
      autoRotateX,
      autoRotateY,
      opacity,
    };
  }, [
    word,
    cubeSize,
    rotationSpeed,
    followSpeed,
    density,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    backgroundColor,
    offsetX,
    offsetY,
    breathe,
    breatheSpeed,
    depthFade,
    perspective,
    autoRotateX,
    autoRotateY,
    opacity,
  ]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 2;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    const st = stateRef.current;
    st.frameW = rect.width;
    st.frameH = rect.height;
    st.dpr = dpr;
    if (!st.entered) {
      st.mouseX = rect.width / 2;
      st.mouseY = rect.height / 2;
      st.posX = rect.width / 2;
      st.posY = rect.height / 2;
    }
  }, []);

  useEffect(() => {
    handleResize();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new ResizeObserver(() => handleResize());
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [handleResize]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onMove = (cx: number, cy: number) => {
      const rect = wrap.getBoundingClientRect();
      const st = stateRef.current;
      st.mouseX = cx - rect.left;
      st.mouseY = cy - rect.top;
      st.entered = true;
    };

    const onLeave = () => {
      const st = stateRef.current;
      st.mouseX = st.frameW / 2;
      st.mouseY = st.frameH / 2;
      st.entered = false;
    };

    const mm = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const ts = (e: TouchEvent) => {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const tm = (e: TouchEvent) => {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    wrap.addEventListener("mousemove", mm);
    wrap.addEventListener("mouseleave", onLeave);
    wrap.addEventListener("touchstart", ts, { passive: false });
    wrap.addEventListener("touchmove", tm, { passive: false });
    wrap.addEventListener("touchend", onLeave);

    return () => {
      wrap.removeEventListener("mousemove", mm);
      wrap.removeEventListener("mouseleave", onLeave);
      wrap.removeEventListener("touchstart", ts);
      wrap.removeEventListener("touchmove", tm);
      wrap.removeEventListener("touchend", onLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frameId = 0;
    const t0 = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - t0) * 0.001;
      const st = stateRef.current;
      const cfg = cfgRef.current;

      const targetX = st.mouseX + cfg.offsetX;
      const targetY = st.mouseY + cfg.offsetY;
      st.posX += (targetX - st.posX) * cfg.followSpeed;
      st.posY += (targetY - st.posY) * cfg.followSpeed;

      ctx.setTransform(st.dpr, 0, 0, st.dpr, 0, 0);
      ctx.clearRect(0, 0, st.frameW, st.frameH);
      ctx.globalAlpha = cfg.opacity;

      const angX = elapsed * cfg.autoRotateX * cfg.rotationSpeed;
      const angY = elapsed * cfg.autoRotateY * cfg.rotationSpeed;
      const angZ = elapsed * 0.15 * cfg.rotationSpeed;

      const half = cfg.cubeSize * 0.5;
      const breathScale =
        1 + Math.sin(elapsed * cfg.breatheSpeed) * cfg.breathe;
      const side = half * breathScale;

      const items: {
        sx: number;
        sy: number;
        depth: number;
        alpha: number;
        fs: number;
      }[] = [];

      const perFace = Math.max(1, Math.round(cfg.density));
      const grid = Math.ceil(Math.sqrt(perFace));
      const step = (side * 2) / (grid + 1);

      for (let fi = 0; fi < 6; fi++) {
        let center: Vec3 = {
          x: FACE_CENTERS[fi].x * side,
          y: FACE_CENTERS[fi].y * side,
          z: FACE_CENTERS[fi].z * side,
        };
        let up = { ...FACE_UP[fi] };
        let right = { ...FACE_RIGHT[fi] };
        let normal = { ...FACE_NORMALS[fi] };

        center = rotZ(rotY(rotX(center, angX), angY), angZ);
        up = rotZ(rotY(rotX(up, angX), angY), angZ);
        right = rotZ(rotY(rotX(right, angX), angY), angZ);
        normal = rotZ(rotY(rotX(normal, angX), angY), angZ);

        for (let gi = 0; gi < grid; gi++) {
          for (let gj = 0; gj < grid; gj++) {
            const u = -side + step * (gi + 1);
            const v = -side + step * (gj + 1);

            const pt: Vec3 = {
              x: center.x + right.x * u + up.x * v,
              y: center.y + right.y * u + up.y * v,
              z: center.z + right.z * u + up.z * v,
            };

            const proj = projectPoint(pt, cfg.perspective);
            const depthNorm = (pt.z + side) / (side * 2);
            const alpha = 1 - depthNorm * cfg.depthFade;
            const fs = cfg.fontSize * proj.depth;

            items.push({
              sx: st.posX + proj.sx,
              sy: st.posY + proj.sy,
              depth: pt.z,
              alpha: Math.max(0.05, alpha),
              fs,
            });
          }
        }
      }

      items.sort((a, b) => b.depth - a.depth);

      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = cfg.color;

      for (const item of items) {
        ctx.globalAlpha = item.alpha * cfg.opacity;
        ctx.font = `${cfg.fontWeight} ${item.fs}px ${cfg.fontFamily}`;
        ctx.fillText(cfg.word, item.sx, item.sy);
      }

      ctx.globalAlpha = 1;
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden", className)}
      style={{ width, height, backgroundColor }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      {children && (
        <div className="pointer-events-none relative z-10">{children}</div>
      )}
    </div>
  );
};

TextCube.displayName = "TextCube";

export default TextCube;
