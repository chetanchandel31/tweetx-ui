import useUserFollow from "@/API/react-query/user/useUserFollow";
import { TypeUserListResponse } from "@/API/react-query/user/useUserListInfinite";
import useUserUnfollow from "@/API/react-query/user/useUserUnfollow";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { SnackbarAction, useSnackbar } from "notistack";

type Props = {
  user: TypeUserListResponse["items"][number];
};

export default function UserCard({ user }: Props) {
  const snackbar = useSnackbar();

  const userFollow = useUserFollow({});
  const userUnfollow = useUserUnfollow({});

  const follow = async (userId: string, isUndo: boolean = false) => {
    const res = await userFollow.mutateAsync({
      userToFollowId: userId,
    });

    if (res.isSuccess) {
      snackbar.enqueueSnackbar(
        isUndo ? `Restored follow` : `Followed ${user.name}`,
        { variant: "success" }
      );
    }
  };

  const undoUnfollowAction: SnackbarAction = (snackbarId) => (
    <>
      <Button
        color="inherit"
        onClick={() => {
          follow(user.userId, true);
          snackbar.closeSnackbar(snackbarId);
        }}
      >
        Undo
      </Button>
    </>
  );

  const unfollow = async () => {
    const res = await userUnfollow.mutateAsync({
      userToUnFollowId: user.userId,
    });

    if (res.isSuccess) {
      snackbar.enqueueSnackbar(`Un-followed ${user.name}`, {
        variant: "info",
        action: undoUnfollowAction,
      });
    }
  };

  const handleBtnClick = () => {
    if (user.isFollowed) {
      unfollow();
    } else {
      follow(user.userId);
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

          <Grid container spacing={2}>
            <Grid item>
              <Typography
                component={"div"}
                color="text.secondary"
                variant="caption"
              >
                Posts: {user.postsCount}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                component={"div"}
                color="text.secondary"
                variant="caption"
              >
                Followers: {user.followersCount}
              </Typography>
            </Grid>
          </Grid>
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
