import { LoadingButton } from "@mui/lab";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

type Props = {
  infiniteQuery: UseInfiniteQueryResult<unknown, unknown>;
  tableItemsCount: number;
};

/** generic load more button to work with any infinite query */
export default function ButtonLoadMore({
  infiniteQuery,
  tableItemsCount,
}: Props) {
  const onLoadMore = infiniteQuery.hasNextPage
    ? () => infiniteQuery.fetchNextPage()
    : undefined;

  return (
    <>
      {tableItemsCount > 0 ? (
        <div style={{ textAlign: "center" }}>
          <LoadingButton
            disabled={
              tableItemsCount === 0 || infiniteQuery.hasNextPage === false
            }
            loading={
              infiniteQuery.isLoading || infiniteQuery.isFetchingNextPage
            }
            onClick={onLoadMore}
            size="small"
            style={{ minWidth: 120 }}
          >
            Load more
          </LoadingButton>
        </div>
      ) : null}
    </>
  );
}
