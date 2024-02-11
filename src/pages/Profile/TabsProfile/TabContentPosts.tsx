import usePostListInfinite from "@/API/react-query/post/usePostListInfinite";
import ButtonLoadMore from "@/components/ButtonLoadMore";
import HelperText from "@/components/HelperText";
import PostCard from "@/components/PostCard";
import useActiveUserId from "@/hooks/useActiveUserId";
import BtnCreatePost from "@/pages/Feed/CreatePost/BtnCreatePost";
import { Box, Grid, Typography } from "@mui/material";

type Props = {};

export default function TabContentPosts({}: Props) {
  const userId = useActiveUserId();
  const postedByUserIds: string[] = [];
  if (userId) {
    postedByUserIds.push(userId);
  }

  const postList = usePostListInfinite(
    {
      page: 1,
      perPage: 5,
      postedByUserIds,
    },
    {
      refetchInterval: 5000,
      enabled: userId !== null,
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
    if (postList.isPending) {
      items.push(
        <Grid item xs={12} key="loading-posts">
          <HelperText text="Loading your posts" minHeight={200} />
        </Grid>
      );
    } else {
      items.push(
        <Grid item xs={12} textAlign={"center"}>
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography color="text.secondary" sx={{ mb: 2 }} variant="body2">
              You haven't posted anything yet
            </Typography>
            <BtnCreatePost />
          </Box>
        </Grid>
      );
    }
  }

  return (
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
  );
}
