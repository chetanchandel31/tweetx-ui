import { Box, Container, Grid } from "@mui/material";
import BtnCreatePost from "./CreatePost/BtnCreatePost";
import usePostListInfinite from "@/API/react-query/post/usePostListInfinite";
import PostCard from "@/components/PostCard";
import LoadingAndEmptyState from "@/components/LoadingAndEmptyState";
import ButtonRefresh from "@/components/ButtonRefresh";
import useUserGetProfile from "@/API/react-query/user/useUserGetProfile";
import InfiniteLoader from "@/components/InfiniteLoader";

type Props = {};

export default function Feed({}: Props) {
  const userProfile = useUserGetProfile({}, { staleTime: Infinity });
  const postedByUserIds: string[] = [];
  if (userProfile.data?.isSuccess) {
    postedByUserIds.push(
      userProfile.data.result.userId,
      ...userProfile.data.result.followedUserIds
    );
  }

  const postList = usePostListInfinite(
    {
      page: 1,
      perPage: 5,
      postedByUserIds,
    },
    {
      refetchInterval: 5000,
      enabled: userProfile.isFetched,
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

          {postList.isFetched ? (
            <Grid item xs={12}>
              <InfiniteLoader
                infiniteQuery={postList}
                fetchedPagesCount={postList.data?.pages.length || 0}
              />
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </Container>
  );
}
