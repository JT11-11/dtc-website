"use client";

import { setWasmUrl } from "@lottiefiles/dotlottie-react";

let initialized = false;

/** Self-host WASM so dotlottie works under strict production CSP on Vercel. */
export function initDotLottieWasm() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  setWasmUrl("/static/dotlottie-player.wasm");
}

initDotLottieWasm();
