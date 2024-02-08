import { createContext, useContext } from "react";

type TypeThemeMode = {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
};
export const ThemeModeContext = createContext<TypeThemeMode>({
  isDarkMode: false,
  setIsDarkMode: () =>
    console.warn(
      "the component probably isn't wrapped within theme-mode-context"
    ),
});

export const useThemeMode = () => useContext(ThemeModeContext);
