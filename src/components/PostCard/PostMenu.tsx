import { ListItemIcon, MenuItem, Typography } from "@mui/material";
import ThreeDotMenu from "../ThreeDotMenu";
import { DeleteRounded, EditRounded } from "@mui/icons-material";

type Props = {};

export default function PostMenu({}: Props) {
  return (
    <span onClick={(e) => e.stopPropagation()}>
      <ThreeDotMenu
        IconButtonProps={{
          size: "small",
          // disabled: confirmDelete.isLoading,
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <EditRounded />
          </ListItemIcon>
          <Typography variant="body2">Edit</Typography>
        </MenuItem>

        <MenuItem
        // onClick={() =>
        //   confirmDelete.onDelete({
        //     dataImportId,
        //     title: dataImportTitle,
        //   })
        // }
        >
          <ListItemIcon>
            <DeleteRounded color="error" />
          </ListItemIcon>
          <Typography color="error" variant="body2">
            Delete
          </Typography>
        </MenuItem>
      </ThreeDotMenu>
    </span>
  );
}
