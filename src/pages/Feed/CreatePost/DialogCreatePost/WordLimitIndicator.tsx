import { config } from "@/config";
import { CheckRounded } from "@mui/icons-material";
import {
  CircularProgress,
  Box,
  Typography,
  CircularProgressProps,
} from "@mui/material";

type Params = { charsCount: number };

export default function WordLimitIndicator({ charsCount }: Params) {
  const limitUsedPercent = Math.round(
    (charsCount / config.postContentMaxLength) * 100
  );
  const value = Math.min(limitUsedPercent, 100);

  const charsLimitLeftCount = config.postContentMaxLength - charsCount;

  let color: CircularProgressProps["color"] = "success";
  let content: React.ReactNode = (
    <CheckRounded color="success" fontSize="small" />
  );
  let size = 28;

  if (charsLimitLeftCount <= config.postContentMaxLength / 2) {
    color = "warning";
    size = 30;
    content = (
      <Typography variant="caption" component="div">{`${
        config.postContentMaxLength - charsCount
      }`}</Typography>
    );
  }
  if (charsLimitLeftCount < 0) {
    color = "error";
  }

  return charsCount > 0 ? (
    <Box sx={{ position: "relative", display: "flex" }}>
      <CircularProgress
        color={color}
        size={size}
        variant="determinate"
        value={value}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {content}
      </Box>
    </Box>
  ) : null;
}
