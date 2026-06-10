"use client";

import "@/lib/dotlottie-init";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-web";
import { AnimatePresence, motion } from "motion/react";
import { flushSync } from "react-dom";
import { useOverlay } from "@/lib/overlay-context";

const WELCOME_ANIMATION = "/logo/246003ce-1185-11ee-a1fb-b35ad4109460.lottie";
const LOADING_ANIMATION = "/logo/8fd5ec48-1150-11ee-b762-3f6010496ba0.lottie";
const WELCOME_STORAGE_KEY = "dtc-welcome-shown";
const ROUTE_LOADING_KEY = "dtc-route-loading-pending";

function isInternalPageNavigation(anchor: HTMLAnchorElement) {
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const url = new URL(anchor.href);
  if (url.origin !== window.location.origin) return false;
  if (url.protocol !== window.location.protocol) return false;
  if (url.pathname === window.location.pathname && url.search === window.location.search) {
    return false;
  }

  return true;
}

export function AppOverlays() {
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);
  const bootedRef = useRef(false);
  const [isBooting, setIsBooting] = useState(true);
  const [welcomePlayer, setWelcomePlayer] = useState<DotLottie | null>(null);
  const { mode, showWelcome, showLoading, hideOverlay } = useOverlay();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isInternalPageNavigation(anchor)) return;

      sessionStorage.setItem(ROUTE_LOADING_KEY, "true");
      flushSync(() => {
        showLoading();
      });
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [showLoading]);

  useEffect(() => {
    if (!bootedRef.current) {
      bootedRef.current = true;
      previousPathRef.current = pathname;

      if (sessionStorage.getItem(ROUTE_LOADING_KEY) === "true") {
        sessionStorage.removeItem(ROUTE_LOADING_KEY);
        showLoading();
        setIsBooting(false);
        const timeout = window.setTimeout(hideOverlay, 900);
        return () => window.clearTimeout(timeout);
      }

      if (pathname === "/" && sessionStorage.getItem(WELCOME_STORAGE_KEY) !== "true") {
        sessionStorage.setItem(WELCOME_STORAGE_KEY, "true");
        showWelcome();
        setIsBooting(false);
        return;
      }

      setIsBooting(false);
      return;
    }

    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;

    showLoading();
    const timeout = window.setTimeout(hideOverlay, 850);
    return () => window.clearTimeout(timeout);
  }, [hideOverlay, pathname, showLoading, showWelcome]);

  useEffect(() => {
    if (mode !== "welcome" || !welcomePlayer) return;

    let started = false;
    const startWelcome = () => {
      if (started) return;
      started = true;
      welcomePlayer.stop();
      welcomePlayer.setFrame(0);
      welcomePlayer.play();
    };

    const completeWelcome = () => {
      hideOverlay();
    };

    welcomePlayer.addEventListener("ready", startWelcome);
    welcomePlayer.addEventListener("load", startWelcome);
    welcomePlayer.addEventListener("complete", completeWelcome);

    if (welcomePlayer.isLoaded) startWelcome();

    const fallback = window.setTimeout(hideOverlay, 8000);

    return () => {
      welcomePlayer.removeEventListener("ready", startWelcome);
      welcomePlayer.removeEventListener("load", startWelcome);
      welcomePlayer.removeEventListener("complete", completeWelcome);
      window.clearTimeout(fallback);
    };
  }, [hideOverlay, mode, welcomePlayer]);

  useEffect(() => {
    if (mode !== "welcome" && mode !== "loading") return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const previous = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      overflow: style.overflow,
      width: style.width,
    };

    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";

    const blockScroll = (event: Event) => event.preventDefault();
    document.addEventListener("wheel", blockScroll, { passive: false });
    document.addEventListener("touchmove", blockScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", blockScroll);
      document.removeEventListener("touchmove", blockScroll);
      style.position = previous.position;
      style.top = previous.top;
      style.left = previous.left;
      style.right = previous.right;
      style.overflow = previous.overflow;
      style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [mode]);

  const visibleMode = mode === "welcome" || mode === "loading" ? mode : null;
  const shouldShowOverlay = isBooting || visibleMode;

  return (
    <AnimatePresence>
      {shouldShowOverlay && (
        <motion.div
          key={visibleMode ?? "boot"}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden overscroll-none touch-none text-foreground"
          style={{ backgroundColor: visibleMode === "loading" ? "#f2f2f2" : "#ffffff" }}
          aria-live="polite"
          aria-label={visibleMode === "welcome" ? "Welcome" : "Loading"}
        >
          {visibleMode && (
            <div className="flex flex-col items-center justify-center px-6 text-center">
              <div className={visibleMode === "welcome" ? "relative h-40 w-[min(82vw,42rem)] sm:h-52" : "h-28 w-28 sm:h-36 sm:w-36"}>
                <DotLottieReact
                  src={visibleMode === "welcome" ? WELCOME_ANIMATION : LOADING_ANIMATION}
                  autoplay
                  loop={visibleMode === "loading"}
                  useFrameInterpolation
                  renderConfig={{ autoResize: true }}
                  className="relative h-full w-full"
                  dotLottieRefCallback={
                    visibleMode === "welcome" ? setWelcomePlayer : undefined
                  }
                />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
