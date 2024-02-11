import { Box, Container, Grid } from "@mui/material";
import BtnCreatePost from "./CreatePost/BtnCreatePost";
import usePostListInfinite from "@/API/react-query/post/usePostListInfinite";
import PostCard from "@/components/PostCard";
import LoadingAndEmptyState from "@/components/LoadingAndEmptyState";
import ButtonRefresh from "@/components/ButtonRefresh";
import ButtonLoadMore from "@/components/ButtonLoadMore";

type Props = {};

export default function Feed({}: Props) {
  const postList = usePostListInfinite(
    {
      page: 1,
      perPage: 5,
      postedByUserIds: [],
    },
    {
      refetchInterval: 5000,
    }
  );

  const items: React.ReactNode[] = [];
  postList.data?.pages?.forEach((page) => {
    if (page.isSuccess) {
      page.result.items.forEach((post) => {
        items.push(
          <Grid item xs={12} key={post.postId}>
            <PostCard post={post} />
          </Grid>
        );
      });
    }
  });

  if (items.length === 0) {
    items.push(
      <Grid item xs={12} key="no-posts">
        <LoadingAndEmptyState
          emptyText="No posts yet"
          isLoading={postList.isPending}
          itemsCount={items.length}
          loadingText="Loading posts..."
        />
      </Grid>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BtnCreatePost />

        <ButtonRefresh
          onClick={postList.refetch}
          isLoading={postList.isFetching}
          tooltipText="Refresh posts"
        />
      </Box>

      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          {items}

          {postList.hasNextPage ? (
            <Grid item xs={12}>
              <ButtonLoadMore
                infiniteQuery={postList}
                tableItemsCount={items.length}
              />
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </Container>
  );
}
