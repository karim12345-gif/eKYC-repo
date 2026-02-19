import { useThemeStore } from "../store/themeStore";
import { lightTheme, darkTheme, Theme } from "./tokens";

/**
 * useTheme Hook
 *
 * Returns the current theme object based on the global theme state.
 * Allows components and styles to react to theme changes.
 */
export const useTheme = (): Theme => {
  const { theme } = useThemeStore();

  return theme === "dark" ? darkTheme : lightTheme;
};
