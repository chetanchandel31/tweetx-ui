import { TypePostListResponse } from "@/API/react-query/post/usePostListInfinite";
import { Avatar, Card, Grid, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import PostMenu from "./PostMenu";
import useActiveUserId from "@/hooks/useActiveUserId";

type Props = {
  post: TypePostListResponse["items"][number];
};

export default function PostCard({ post }: Props) {
  const userId = useActiveUserId();

  return (
    <Card elevation={4} sx={{ py: 2, px: 3, borderRadius: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={"auto"}>
          <Avatar />
        </Grid>

        <Grid item xs={true}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent={"space-between"}>
                <Grid item>
                  <Typography fontWeight={700}>{post.userName}</Typography>

                  <Tooltip
                    title={moment.unix(post.createdAtMs / 1000).format("LLL")}
                  >
                    <Typography
                      component={"div"}
                      color="text.secondary"
                      variant="caption"
                    >
                      {moment.unix(post.createdAtMs / 1000).fromNow()}
                    </Typography>
                  </Tooltip>
                </Grid>

                <Grid item>
                  {post.userId === userId ? <PostMenu post={post} /> : null}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ wordBreak: "break-word" }} variant="body2">
                {post.content}{" "}
                {post.updatedAtMs > post.createdAtMs ? (
                  <Tooltip
                    title={moment.unix(post.updatedAtMs / 1000).format("LLL")}
                  >
                    <Typography color="text.secondary" variant="caption">
                      (edited)
                    </Typography>
                  </Tooltip>
                ) : null}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
