import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const applyTheme = () => {
      let actualTheme = theme;

      if (theme === "system") {
        actualTheme = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
          ? "dark"
          : "light";
      }

      document.documentElement.setAttribute(
        "data-theme",
        actualTheme
      );

      localStorage.setItem("theme", theme);
    };

    applyTheme();

    if (theme === "system") {
      const mediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      const handleChange = () => {
        applyTheme();
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside a ThemeProvider"
    );
  }

  return context;
}