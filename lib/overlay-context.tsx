"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface OverlayContextType {
  isOverlayOpen: boolean;
  setIsOverlayOpen: (value: boolean) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <OverlayContext.Provider value={{ isOverlayOpen, setIsOverlayOpen }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
}
