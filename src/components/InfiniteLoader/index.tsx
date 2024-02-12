import { useIntersectionObserver } from "@/components/InfiniteLoader/useIntersectionObserver";
import { Box, CircularProgress, Typography } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

type Props = {
  infiniteQuery: UseInfiniteQueryResult<unknown, unknown>;
  fetchedPagesCount: number;
};

export default function InfiniteLoader({
  infiniteQuery,
  fetchedPagesCount,
}: Props) {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  if (isIntersecting && infiniteQuery.hasNextPage) {
    infiniteQuery.fetchNextPage();
  }

  let content: React.ReactNode = null;
  if (infiniteQuery.isFetchingNextPage) {
    content = <CircularProgress />;
  } else if (fetchedPagesCount > 1 && infiniteQuery.hasNextPage === false) {
    content = (
      <Typography fontWeight={700} textAlign={"center"} variant="body2">
        You are all caught up 🥳
      </Typography>
    );
  }

  return (
    <Box sx={{ textAlign: "center" }} ref={ref}>
      {content}
    </Box>
  );
}
