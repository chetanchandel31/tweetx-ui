import useIsMdDown from "@/hooks/useIsMdDown";
import { routes } from "@/routes/routes";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import AuthSignupForm from "./AuthSignupForm";
import AuthLoginForm from "./AuthLoginForm";
import imgLogin from "@/assets/login.svg";

type Props = {};

export default function AuthForm({}: Props) {
  const isMdDown = useIsMdDown();

  const location = useLocation();
  const isSignUp = location.pathname === routes.auth_signup.path;

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography color="primary" variant="h5">
            TweetX
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Button
                color="inherit"
                component={Link}
                to={isSignUp ? routes.auth_login.path : routes.auth_signup.path}
                sx={{ minWidth: 150 }}
                variant="outlined"
              >
                {isSignUp ? "Login" : "Create Account"}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography color="text.secondary" fontWeight={700} variant="h5">
                {isSignUp ? "Create Account" : "Login"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <div style={{ maxWidth: 400 }}>
                {isSignUp ? <AuthSignupForm /> : <AuthLoginForm />}
              </div>
            </Grid>
          </Grid>
        </Grid>

        {isMdDown ? null : (
          <Grid item xs={12} md={6} textAlign={"right"}>
            <img src={imgLogin} alt="not-found" style={{ width: "100%" }} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
