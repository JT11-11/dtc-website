"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type OverlayMode = "loading" | "modal" | null;

interface OverlayContextType {
  mode: OverlayMode;
  isOverlayOpen: boolean;
  showLoading: () => void;
  hideOverlay: () => void;
  /** @deprecated Use mode / hideOverlay */
  setIsOverlayOpen: (value: boolean) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<OverlayMode>(null);

  const showLoading = useCallback(() => setMode("loading"), []);
  const hideOverlay = useCallback(() => setMode(null), []);

  const value = useMemo(
    () => ({
      mode,
      isOverlayOpen: mode !== null,
      showLoading,
      hideOverlay,
      setIsOverlayOpen: (open: boolean) => setMode(open ? "modal" : null),
    }),
    [mode, showLoading, hideOverlay],
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
