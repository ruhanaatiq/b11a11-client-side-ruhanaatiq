import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const THEME_KEY = "app-theme";
const FALLBACK =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || FALLBACK);

  useEffect(() => {
    // apply to <html>
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      // optional: cycle through more themes
      cycle: () => {
        const order = ["light", "corporate", "dark"];
        const idx = order.indexOf(theme);
        setTheme(order[(idx + 1) % order.length]);
      },
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
