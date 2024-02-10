import { Outlet } from "react-router-dom";
import Header from "./Header";

type Props = {};

export default function NavigationLayout({}: Props) {
  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
        }}
      >
        <Header />
      </div>

      <Outlet />
    </>
  );
}
