import { TypeUserListResponse } from "@/API/react-query/user/useUserListInfinite";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Grid, Typography } from "@mui/material";

type Props = {
  user: TypeUserListResponse["items"][number];
};

export default function UserCard({ user }: Props) {
  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Grid container spacing={3} alignItems={"center"}>
        <Grid item>
          <Avatar />
        </Grid>

        <Grid item xs={true}>
          <Typography color="text.secondary" fontWeight={700}>
            {user.name}
          </Typography>

          <Typography color="text.secondary" variant="caption">
            Followers: {user.followersCount}
          </Typography>
        </Grid>

        <Grid item>
          <LoadingButton>
            {user.isFollowed ? "Following" : "Follow"}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
