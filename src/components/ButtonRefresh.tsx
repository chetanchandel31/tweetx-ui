import { RefreshRounded } from "@mui/icons-material";
import { CircularProgress, IconButton, Tooltip, useTheme } from "@mui/material";
import React from "react";

export default function ButtonRefresh({
  onClick,
  isLoading,
  tooltipText,
}: {
  isLoading?: boolean;
  onClick: () => void;
  tooltipText?: React.ReactNode;
}) {
  const theme = useTheme();

  const btn = (
    <IconButton
      disabled={isLoading}
      style={{ height: 30, width: 30 }}
      onClick={onClick}
      size="small"
    >
      {isLoading ? (
        <CircularProgress
          style={{ color: theme.palette.text.secondary }}
          size={15}
        />
      ) : (
        <RefreshRounded fontSize="small" />
      )}
    </IconButton>
  );

  return tooltipText ? (
    <Tooltip arrow placement="top" title={tooltipText ? tooltipText : ""}>
      <span>{btn}</span>
    </Tooltip>
  ) : (
    btn
  );
}
