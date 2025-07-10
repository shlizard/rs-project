import { LightMode, DarkMode, Devices } from "@mui/icons-material";
import { useContext, useEffect, useRef } from "react";
import { themeContext } from "../contexts/themeContext";
import Box from "@mui/material/Box";

export const ThemeSelectorButton = () => {
  const { theme, toggleTheme } = useContext(themeContext);
  const themeRef = useRef();

  function toggleThemeButtonOnClick({ currentTarget: button }) {
    const theme = button.name;
    toggleTheme(theme);
  }

  useEffect(() => {
    themeRef.current.removeAttribute("theme");
    if (theme === "system") {
      return;
    }

    themeRef.current.setAttribute("theme", theme);
  }, [theme]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
        className="nav-button"
        ref={themeRef}
      >
        <button
          className={`toggle-theme-button ${theme !== "light" ? "" : "active"}`}
          name="light"
          onClick={toggleThemeButtonOnClick}
        >
          <LightMode
            sx={{
              fontSize: "1.2rem",
            }}
          />
        </button>
        <button
          className={`toggle-theme-button ${theme !== "dark" ? "" : "active"}`}
          name="dark"
          onClick={toggleThemeButtonOnClick}
        >
          <DarkMode
            sx={{
              fontSize: "1.2rem",
            }}
          />
        </button>
        <button
          className={`toggle-theme-button ${
            theme !== "system" ? "" : "active"
          }`}
          name="system"
          onClick={toggleThemeButtonOnClick}
        >
          <Devices
            sx={{
              fontSize: "1.2rem",
            }}
          />
        </button>
      </Box>
    </>
  );
};
