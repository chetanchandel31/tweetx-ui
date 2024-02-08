import { Outlet } from "react-router-dom";
import useIsMdDown from "../../../hooks/useIsMdDown";
import { Drawer } from "@mui/material";
import SideMenuContent from "./SideMenuContent";
import Header from "./Header";

type Props = {};

const drawerWidth = 260;

export default function NavigationLayout({}: Props) {
  const isMdDown = useIsMdDown();

  return (
    <>
      {isMdDown ? null : (
        <Drawer
          variant="persistent"
          anchor={"left"}
          open={true}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          <SideMenuContent />
        </Drawer>
      )}

      <div
        style={{
          marginLeft: !isMdDown ? drawerWidth : undefined,
        }}
      >
        {isMdDown ? (
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1100,
            }}
          >
            <Header />
          </div>
        ) : null}

        <Outlet />
      </div>
    </>
  );
}
