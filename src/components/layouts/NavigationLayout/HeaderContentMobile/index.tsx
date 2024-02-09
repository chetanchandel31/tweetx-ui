import MenuRounded from "@mui/icons-material/MenuRounded";
import { Drawer, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import SideMenuContent from "./SideMenuContent";
import TweetXLogo from "@/components/TweetXLogo";

type Props = {};

const drawerWidth = 260;

export default function HeaderContentMobile({}: Props) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Grid item>
          <TweetXLogo />
        </Grid>

        <Grid item>
          <IconButton onClick={handleDrawerToggle}>
            <MenuRounded />
          </IconButton>
        </Grid>
      </Grid>

      <Drawer
        anchor="right"
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
