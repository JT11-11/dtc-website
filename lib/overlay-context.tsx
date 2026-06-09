"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type OverlayMode = "welcome" | "loading" | "modal" | null;

interface OverlayContextType {
  mode: OverlayMode;
  isOverlayOpen: boolean;
  showWelcome: () => void;
  showLoading: () => void;
  hideOverlay: () => void;
  /** @deprecated Use mode / hideOverlay */
  setIsOverlayOpen: (value: boolean) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<OverlayMode>(null);

  const showWelcome = useCallback(() => setMode("welcome"), []);
  const showLoading = useCallback(() => setMode("loading"), []);
  const hideOverlay = useCallback(() => setMode(null), []);

  const value = useMemo(
    () => ({
      mode,
      isOverlayOpen: mode !== null,
      showWelcome,
      showLoading,
      hideOverlay,
      setIsOverlayOpen: (open: boolean) => setMode(open ? "modal" : null),
    }),
    [mode, showWelcome, showLoading, hideOverlay],
  );

  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
}
