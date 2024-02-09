import { useThemeMode } from "@/providers/MuiThemeProvider/ThemeModeContext";
import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type Props = {};

export default function BtnSwitchThemeMode({}: Props) {
  const themeMode = useThemeMode();

  return (
    <IconButton
      onClick={() => themeMode.setIsDarkMode(!themeMode.isDarkMode)}
      size="small"
    >
      {themeMode.isDarkMode ? <LightModeRounded /> : <DarkModeRounded />}
    </IconButton>
  );
}
