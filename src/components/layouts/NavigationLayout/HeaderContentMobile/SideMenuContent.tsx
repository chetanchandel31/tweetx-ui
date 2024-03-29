import { routes } from "@/routes/routes";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import BtnSwitchThemeMode from "../BtnSwitchThemeMode";
import ButtonLogout from "../ButtonLogout";

type Props = {};

export default function SideMenuContent({}: Props) {
  const theme = useTheme();

  const location = useLocation();

  const listItems: React.ReactNode[] = [];
  Object.entries(routes).forEach(([, { path, name, showInTopNav }]) => {
    const isSelected = path === location.pathname;

    if (showInTopNav) {
      listItems.push(
        <ListItem
          key={path}
          component={Link}
          to={path}
          disablePadding
          style={{ marginBottom: theme.spacing(1) }}
        >
          <ListItemButton
            selected={isSelected}
            style={{ borderRadius: theme.spacing(1) }}
          >
            <ListItemText
              primary={
                <Typography
                  fontWeight={isSelected ? 700 : undefined}
                  variant="body2"
                >
                  {name}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      );
    }
  });

  return (
    <div
      style={{
        padding: theme.spacing(2, 1, 5),
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} textAlign={"right"}>
          <BtnSwitchThemeMode />
        </Grid>

        <Grid item xs={12}>
          <List>{listItems}</List>
        </Grid>

        <Grid item xs={12}>
          <ButtonLogout />
        </Grid>
      </Grid>
    </div>
  );
}
