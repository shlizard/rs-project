import { useContext } from "react";
import { themeContext } from "../contexts/themeContext";

export default function useTheme() {
  const { theme, toggleTheme } = useContext(themeContext);

  return { theme, toggleTheme };
}
