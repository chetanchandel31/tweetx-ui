import { Fade, Typography, useTheme } from "@mui/material";

export default function HelperText({
  minHeight,
  text,
}: {
  minHeight?: number;
  text: string;
}) {
  const theme = useTheme();

  return (
    <div
      style={{
        padding: theme.spacing(2, 0),
        minHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Fade in>
        <Typography
          variant={"caption"}
          style={{ color: theme.palette.text.secondary }}
        >
          {text}
        </Typography>
      </Fade>
    </div>
  );
}
