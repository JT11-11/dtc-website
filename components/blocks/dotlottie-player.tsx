"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-web";

interface DotLottiePlayerProps {
  src: string;
  /** Element used to measure scroll progress */
  scrollClassName?: string;
  /** Optional external element for scroll measurement (e.g. shared column) */
  scrollMeasureRef?: RefObject<HTMLElement | null>;
  /** Visual wrapper around the canvas */
  className?: string;
  /** Higher = animation completes over less scroll distance. Default 1.6 */
  scrollSpeed?: number;
}

function getScrollProgress(
  rect: DOMRect,
  viewportHeight: number,
  scrollSpeed: number,
) {
  // Off-screen — reset to start (frame 0)
  if (rect.bottom <= 0 || rect.top >= viewportHeight) return 0;

  const center = rect.top + rect.height / 2;
  const start = viewportHeight * 0.92;
  const end = viewportHeight * 0.08;
  const range = start - end;
  if (range <= 0) return 0;

  const raw = (start - center) / range;
  return Math.min(1, Math.max(0, raw * scrollSpeed));
}

export function DotLottieLoop({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <DotLottieReact
      src={src}
      loop
      autoplay
      useFrameInterpolation
      renderConfig={{ autoResize: true }}
      className={className ?? "h-full w-full"}
    />
  );
}

export function DotLottiePlayer({
  src,
  scrollClassName,
  scrollMeasureRef,
  className,
  scrollSpeed = 0.4,
}: DotLottiePlayerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const getScrollElement = () =>
    scrollMeasureRef?.current ?? scrollRef.current;
  const playerRef = useRef<DotLottie | null>(null);
  const readyRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    playerRef.current = dotLottie;
  }, [dotLottie]);

  useEffect(() => {
    const scrub = () => {
      const scrollEl = getScrollElement();
      const player = playerRef.current;
      if (!scrollEl || !player || !readyRef.current) return;

      const total = player.totalFrames;
      if (!total || total <= 1) return;

      const progress = getScrollProgress(
        scrollEl.getBoundingClientRect(),
        window.innerHeight,
        scrollSpeed,
      );

      player.setFrame(Math.round(progress * (total - 1)));
    };

    const scheduleScrub = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(scrub);
    };

    window.addEventListener("scroll", scheduleScrub, { passive: true });
    window.addEventListener("resize", scheduleScrub, { passive: true });
    scheduleScrub();

    return () => {
      window.removeEventListener("scroll", scheduleScrub);
      window.removeEventListener("resize", scheduleScrub);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollSpeed]);

  useEffect(() => {
    if (!dotLottie) return;

    const markReady = () => {
      if (!dotLottie.totalFrames || dotLottie.totalFrames <= 1) return;
      readyRef.current = true;
      dotLottie.stop();
      dotLottie.setFrame(0);

      const scrollEl = getScrollElement();
      if (!scrollEl) return;

      const progress = getScrollProgress(
        scrollEl.getBoundingClientRect(),
        window.innerHeight,
        scrollSpeed,
      );
      dotLottie.setFrame(Math.round(progress * (dotLottie.totalFrames - 1)));
    };

    dotLottie.addEventListener("ready", markReady);
    dotLottie.addEventListener("load", markReady);

    if (dotLottie.isLoaded) markReady();

    return () => {
      dotLottie.removeEventListener("ready", markReady);
      dotLottie.removeEventListener("load", markReady);
      readyRef.current = false;
    };
  }, [dotLottie, scrollSpeed]);

  const lottie = (
    <DotLottieReact
      src={src}
      loop={false}
      autoplay={false}
      useFrameInterpolation
      renderConfig={{ autoResize: true }}
      className="h-full w-full"
      dotLottieRefCallback={setDotLottie}
    />
  );

  if (scrollMeasureRef) {
    return <div className={className}>{lottie}</div>;
  }

  return (
    <div ref={scrollRef} className={scrollClassName}>
      <div className={className}>{lottie}</div>
    </div>
  );
}
