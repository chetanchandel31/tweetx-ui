import { useMediaQuery, useTheme } from "@mui/material";

export default function useIsMdDown() {
  const theme = useTheme();
  const isMdDown = useMediaQuery(() => theme.breakpoints.down("md"));

  return isMdDown;
}
