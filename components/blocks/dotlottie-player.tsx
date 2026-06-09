"use client";

import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-web";

interface DotLottiePlayerProps {
  src: string;
  /** Element used to measure scroll progress */
  scrollClassName?: string;
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
  const center = rect.top + rect.height / 2;
  const start = viewportHeight * 0.92;
  const end = viewportHeight * 0.08;
  const range = start - end;
  if (range <= 0) return 0;

  const raw = (start - center) / range;
  return Math.min(1, Math.max(0, raw * scrollSpeed));
}

export function DotLottiePlayer({
  src,
  scrollClassName,
  className,
  scrollSpeed = 1.6,
}: DotLottiePlayerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<DotLottie | null>(null);
  const readyRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    playerRef.current = dotLottie;
  }, [dotLottie]);

  useEffect(() => {
    const scrub = () => {
      const scrollEl = scrollRef.current;
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

      const scrollEl = scrollRef.current;
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

  return (
    <div ref={scrollRef} className={scrollClassName}>
      <div className={className}>
        <DotLottieReact
          src={src}
          loop={false}
          autoplay={false}
          useFrameInterpolation
          renderConfig={{ autoResize: true }}
          className="h-full w-full"
          dotLottieRefCallback={setDotLottie}
        />
      </div>
    </div>
  );
}
