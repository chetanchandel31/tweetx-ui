import { Drawer, Grid, IconButton, useTheme } from "@mui/material";
import MenuRounded from "@mui/icons-material/MenuRounded";
import { useState } from "react";
import SideMenuContent from "./SideMenuContent";

type Props = {};

const drawerWidth = 260;

export default function Header({}: Props) {
  const theme = useTheme();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      <div
        style={{
          minHeight: 55,
          borderBottom: `solid 1px ${theme.palette.divider}`,
          padding: theme.spacing(0, 1),
          display: "flex",
          justifyContent: "stretch",
          alignItems: "center",
        }}
      >
        <Grid container spacing={1} alignItems={"center"}>
          <Grid item>
            <IconButton onClick={handleDrawerToggle}>
              <MenuRounded />
            </IconButton>
          </Grid>
        </Grid>
      </div>

      <Drawer
        anchor="left"
        variant="temporary"
        open={isMobileSidebarOpen}
        onClose={handleDrawerToggle}
        onClick={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            maxWidth: "95%",
          },
        }}
      >
        <SideMenuContent />
      </Drawer>
    </>
  );
}
