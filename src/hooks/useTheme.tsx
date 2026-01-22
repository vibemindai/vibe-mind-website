import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isAutoMode: boolean;
  setIsAutoMode: (auto: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): Theme => {
  const hour = new Date().getHours();
  // Dark mode from 6 PM (18:00) to 6 AM (06:00)
  return hour >= 18 || hour < 6 ? "dark" : "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    const isAuto = localStorage.getItem("theme-auto") !== "false";
    
    if (isAuto) {
      return getSystemTheme();
    }
    return (stored as Theme) || getSystemTheme();
  });

  const [isAutoMode, setIsAutoModeState] = useState(() => {
    return localStorage.getItem("theme-auto") !== "false";
  });

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // Auto-switch theme based on time
  useEffect(() => {
    if (!isAutoMode) return;

    const checkAndUpdateTheme = () => {
      const newTheme = getSystemTheme();
      setThemeState(newTheme);
    };

    // Check every minute
    const interval = setInterval(checkAndUpdateTheme, 60000);
    
    // Initial check
    checkAndUpdateTheme();

    return () => clearInterval(interval);
  }, [isAutoMode]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setIsAutoModeState(false);
    localStorage.setItem("theme-auto", "false");
  };

  const setIsAutoMode = (auto: boolean) => {
    setIsAutoModeState(auto);
    localStorage.setItem("theme-auto", String(auto));
    if (auto) {
      const newTheme = getSystemTheme();
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isAutoMode, setIsAutoMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
