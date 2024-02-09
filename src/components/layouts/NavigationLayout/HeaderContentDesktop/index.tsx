import TweetXLogo from "@/components/TweetXLogo";
import { Button, Grid } from "@mui/material";
import ButtonLogout from "../ButtonLogout";
import { routes } from "@/routes/routes";
import { Link, useLocation } from "react-router-dom";
import BtnSwitchThemeMode from "../BtnSwitchThemeMode";

type Props = {};

export default function HeaderContentDesktop({}: Props) {
  const location = useLocation();

  const navItems: React.ReactNode[] = [];
  Object.entries(routes).forEach(([, { path, name, showInTopNav }]) => {
    const isSelected = path === location.pathname;

    if (showInTopNav) {
      navItems.push(
        <Grid item key={path}>
          <Button
            color={isSelected ? "primary" : "inherit"}
            component={Link}
            to={path}
          >
            {name}
          </Button>
        </Grid>
      );
    }
  });

  return (
    <Grid container spacing={1} alignItems={"center"}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={5} alignItems={"center"}>
          <Grid item>
            <TweetXLogo />
          </Grid>

          <Grid item>
            <BtnSwitchThemeMode />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid
          container
          spacing={1}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item>
            <Grid container spacing={1}>
              {navItems}
            </Grid>
          </Grid>

          <Grid item>
            <ButtonLogout />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
