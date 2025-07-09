import { createContext, useEffect, useState } from "react";

export const themeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(window.localStorage.getItem("theme"));

  useEffect(() => {
    if (!theme || theme === "system") {
      window.localStorage.setItem("theme", "system");
      setTheme("system");
    }
  }, [theme]);

  function toggleTheme(theme) {
    setTheme(theme);
    window.localStorage.setItem("theme", theme);
  }

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
}
