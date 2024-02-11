import useUserGetProfile from "@/API/react-query/user/useUserGetProfile";
import HelperText from "@/components/HelperText";
import { Avatar, Container, Divider, Grid, Typography } from "@mui/material";
import TabsProfile from "./TabsProfile";

type Props = {};

export default function Profile({}: Props) {
  const userProfile = useUserGetProfile({});

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      {userProfile.data?.isSuccess ? (
        <Grid container spacing={6}>
          <Grid item xs={12} md="auto">
            <Avatar sx={{ height: 100, width: 100 }} />
          </Grid>

          <Grid item xs={12} md={true}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography
                  color="text.secondary"
                  fontWeight={600}
                  variant="h5"
                >
                  {userProfile.data.result.name}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={{ xs: 3, md: 4 }}>
                  <Grid item>
                    <Typography color="text.secondary">
                      Posts: {userProfile.data.result.postsCount}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography color="text.secondary">
                      Followers: {userProfile.data.result.followersCount}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography color="text.secondary">
                      Following: {userProfile.data.result.followingCount}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <HelperText text="Loading profile..." minHeight={100} />
      )}

      <Divider sx={{ mt: 5 }} />

      <TabsProfile />
    </Container>
  );
}
