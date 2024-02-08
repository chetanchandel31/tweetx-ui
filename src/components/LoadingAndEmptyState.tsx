import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";

type Props = {
  itemsCount: number;
  isLoading: boolean;
  loadingText: string | React.ReactNode;
  emptyText: string;
  emptyStateImageClassName?: string;
};

export default function LoadingAndEmptyState({
  isLoading,
  itemsCount,
  emptyText,
  loadingText,
  emptyStateImageClassName,
}: Props) {
  const theme = useTheme();

  let _loadingText;
  if (typeof loadingText === "string") {
    _loadingText = (
      <Typography
        style={{
          color: theme.palette.text.secondary,
          textAlign: "center",
          padding: theme.spacing(8, 0),
        }}
        variant="body2"
      >
        {loadingText}
      </Typography>
    );
  } else {
    _loadingText = loadingText;
  }

  let emptyState: React.ReactNode = null;
  if (itemsCount === 0) {
    emptyState = isLoading ? (
      _loadingText
    ) : (
      <div
        style={{
          padding: emptyStateImageClassName
            ? theme.spacing(1, 0, 4)
            : theme.spacing(8, 0),
        }}
      >
        <Grid item xs={12} container>
          <Grid item xs={12} container justifyContent={"center"}>
            {emptyStateImageClassName ? (
              <div className={emptyStateImageClassName} />
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{
                color: theme.palette.text.secondary,
                textAlign: "center",
              }}
              variant="body2"
            >
              {emptyText}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }

  return <>{emptyState}</>;
}
