import { ListItemIcon, MenuItem, Typography } from "@mui/material";
import ThreeDotMenu from "../ThreeDotMenu";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import useConfirmPostDelete from "./useConfirmPostDelete";
import { TypePostListResponse } from "@/API/react-query/post/usePostListInfinite";
import useAppQueryParams from "@/hooks/useAppQueryParams";
import DialogEditPost from "@/pages/Feed/DialogEditPost";

type Props = { post: TypePostListResponse["items"][number] };

export default function PostMenu({ post }: Props) {
  const [queryParams, setQueryParams] = useAppQueryParams();
  const confirmPostDelete = useConfirmPostDelete();

  return (
    <span onClick={(e) => e.stopPropagation()}>
      <ThreeDotMenu
        IconButtonProps={{
          size: "small",
          disabled: confirmPostDelete.isLoading,
        }}
      >
        <MenuItem
          onClick={() => setQueryParams({ "edit-post-id": post.postId })}
        >
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

      {queryParams["edit-post-id"] === post.postId ? (
        <DialogEditPost
          onClose={() => setQueryParams({ "edit-post-id": null })}
        />
      ) : null}
    </span>
  );
}
