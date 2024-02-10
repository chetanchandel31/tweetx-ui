import { Skeleton } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
};

export default function SkeletonLoader({ children, isLoading }: Props) {
  return isLoading ? <Skeleton>{children}</Skeleton> : <>{children}</>;
}
