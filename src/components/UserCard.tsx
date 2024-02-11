import useUserFollow from "@/API/react-query/user/useUserFollow";
import { TypeUserListResponse } from "@/API/react-query/user/useUserListInfinite";
import useUserUnfollow from "@/API/react-query/user/useUserUnfollow";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

type Props = {
  user: TypeUserListResponse["items"][number];
};

export default function UserCard({ user }: Props) {
  const snackbar = useSnackbar();

  const userFollow = useUserFollow({});
  const userUnfollow = useUserUnfollow({});

  const follow = async () => {
    const res = await userFollow.mutateAsync({
      userToFollowId: user.userId,
    });

    if (res.isSuccess) {
      snackbar.enqueueSnackbar(`Followed ${user.name}`, { variant: "success" });
    }
  };

  const unfollow = async () => {
    const res = await userUnfollow.mutateAsync({
      userToUnFollowId: user.userId,
    });

    if (res.isSuccess) {
      snackbar.enqueueSnackbar(`Un-followed ${user.name}`, { variant: "info" });
    }
  };

  const handleBtnClick = () => {
    if (user.isFollowed) {
      unfollow();
    } else {
      follow();
    }
  };

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Grid container spacing={3} alignItems={"center"}>
        <Grid item>
          <Avatar sx={{ height: 44, width: 44 }} />
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
          <LoadingButton
            color={user.isFollowed ? "inherit" : "primary"}
            loading={userFollow.isPending || userUnfollow.isPending}
            onClick={handleBtnClick}
            variant={user.isFollowed ? "outlined" : "contained"}
          >
            {user.isFollowed ? "Following" : "Follow"}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
