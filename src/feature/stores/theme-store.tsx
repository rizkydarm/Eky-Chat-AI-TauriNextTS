"use client";

import { createContext, useContext, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeStoreValue = {
  mode: ThemeMode;
  toggleMode: () => void;
};

type ThemeStoreProviderProps = {
  children: React.ReactNode;
};

const ThemeStoreContext = createContext<ThemeStoreValue | null>(null);

export function ThemeStoreProvider({ children }: ThemeStoreProviderProps) {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const toggleMode = () =>
    setMode((previous) => (previous === "light" ? "dark" : "light"));
  return (
    <ThemeStoreContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeStoreContext.Provider>
  );
}

export function useThemeStore(): ThemeStoreValue {
  const context = useContext(ThemeStoreContext);
  if (!context)
    throw new Error("useThemeStore must be used within ThemeStoreProvider");
  return context;
}
