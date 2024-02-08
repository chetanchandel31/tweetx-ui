import { createTheme, ThemeProvider } from "@mui/material";
import { red } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode, useState } from "react";
import { ThemeModeContext } from "./ThemeModeContext";

const THEME_MODE_KEY = "ht-theme-mode";

export default function MuiThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isDarkMode, _setIsDarkMode] = useState(
    localStorage.getItem(THEME_MODE_KEY) === "dark"
  );
  const setIsDarkMode = (_isDarkMode: boolean) => {
    _setIsDarkMode(_isDarkMode);
    localStorage.setItem(THEME_MODE_KEY, _isDarkMode ? "dark" : "light");
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: red["A200"],
      },
      background: {
        default: isDarkMode ? "#20232A" : "#FAFBFB",
        paper: isDarkMode ? "#282C34" : "#FFFFFF",
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          color: "text.primary",
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            boxShadow: "none",
            borderRadius: "8px",
          },
        },
        defaultProps: {
          size: "medium",
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          size: "small",
          variant: "filled",
        },
      },
      MuiDialog: {
        defaultProps: { disableRestoreFocus: true },
      },
      MuiTooltip: {
        defaultProps: { arrow: true, placement: "top" },
      },
    },
  });

  return (
    <ThemeModeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
