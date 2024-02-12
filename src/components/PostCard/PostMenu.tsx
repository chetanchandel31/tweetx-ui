import { ListItemIcon, MenuItem, Typography } from "@mui/material";
import ThreeDotMenu from "../ThreeDotMenu";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import useConfirmPostDelete from "./useConfirmPostDelete";
import { TypePostListResponse } from "@/API/react-query/post/usePostListInfinite";

type Props = { post: TypePostListResponse["items"][number] };

export default function PostMenu({ post }: Props) {
  const confirmPostDelete = useConfirmPostDelete();

  return (
    <span onClick={(e) => e.stopPropagation()}>
      <ThreeDotMenu
        IconButtonProps={{
          size: "small",
          disabled: confirmPostDelete.isLoading,
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <EditRounded />
          </ListItemIcon>
          <Typography variant="body2">Edit</Typography>
        </MenuItem>

        <MenuItem
          onClick={() =>
            confirmPostDelete.onDelete({
              postId: post.postId,
            })
          }
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
