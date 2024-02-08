import { MoreVertRounded } from "@mui/icons-material";
import { IconButton, IconButtonProps, Menu } from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  IconButtonProps?: IconButtonProps;
};

export default function ThreeDotMenu({ children, IconButtonProps }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        {...IconButtonProps}
        onClick={(e) => handleClick(e)}
      >
        <MoreVertRounded />
      </IconButton>

      <Menu
        elevation={9}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClick={handleClose}
      >
        <div style={{ minWidth: 100 }}>{children}</div>
      </Menu>
    </>
  );
}
