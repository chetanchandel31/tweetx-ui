import { useIntersectionObserver } from "@/components/InfiniteLoader/useIntersectionObserver";
import { Box, CircularProgress, Typography } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

type Props = {
  infiniteQuery: UseInfiniteQueryResult<unknown, unknown>;
  fetchedPagesCount: number;
};

// can move these to useRef if global level cache causes conflicts
let lastFetchFinishedAtMs: number = 0;
let isFetching = false;

export default function InfiniteLoader({
  infiniteQuery,
  fetchedPagesCount,
}: Props) {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  const allowFetch =
    !isFetching &&
    (lastFetchFinishedAtMs === 0 || Date.now() - lastFetchFinishedAtMs >= 200); // wait for atleast 200ms before fetching next page

  if (isIntersecting && infiniteQuery.hasNextPage && allowFetch) {
    isFetching = true;
    infiniteQuery.fetchNextPage().finally(() => {
      isFetching = false;
      lastFetchFinishedAtMs = Date.now();
    });
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
