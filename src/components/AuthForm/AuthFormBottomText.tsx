import { routes } from "@/routes/routes";
import { Link as MuiLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  isSignUp: boolean;
};

export default function AuthFormBottomText({ isSignUp }: Props) {
  return (
    <Typography color="text.secondary" textAlign={"center"}>
      {isSignUp ? (
        <>
          Already have an account?{" "}
          <MuiLink component={Link} to={routes.auth_login.path}>
            Log in
          </MuiLink>
        </>
      ) : (
        <>
          Need an account?{" "}
          <MuiLink component={Link} to={routes.auth_signup.path}>
            Register
          </MuiLink>
        </>
      )}
    </Typography>
  );
}
