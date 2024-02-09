import { useTheme } from "@mui/material";
import HeaderContentMobile from "./HeaderContentMobile";
import useIsMdDown from "@/hooks/useIsMdDown";
import HeaderContentDesktop from "./HeaderContentDesktop";

type Props = {};

export default function Header({}: Props) {
  const theme = useTheme();

  const isMdDown = useIsMdDown();

  return (
    <div
      style={{
        minHeight: 55,
        borderBottom: `solid 1px ${theme.palette.divider}`,
        padding: theme.spacing(0, 2),
        display: "flex",
        justifyContent: "stretch",
        alignItems: "center",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.25)",
      }}
    >
      {isMdDown ? <HeaderContentMobile /> : <HeaderContentDesktop />}
    </div>
  );
}
