import usePostDelete from "@/API/react-query/post/usePostDelete";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";

export default function useConfirmPostDelete() {
  const theme = useTheme();
  const confirm = useConfirm();

  const snackbar = useSnackbar();

  const postDelete = usePostDelete({
    doWaitForDependentQueries: true,
  });

  const onDelete = ({ postId }: { postId: string }) => {
    confirm({
      title: (
        <Typography
          component="div"
          style={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(1),
          }}
          variant="h6"
        >
          <ErrorOutlineRounded />
          Delete post?
        </Typography>
      ),
      description: <>Are you sure you want to delete {"this post"}?</>,
      confirmationText: "Delete post",
    })
      .then(async () => {
        const deleteResult = await postDelete.mutateAsync({
          postId,
        });

        if (deleteResult.isSuccess) {
          snackbar.enqueueSnackbar("Post deleted", {
            variant: "info",
          });
        }
      })
      .catch(() => console.log("#shu1707742871878"));
  };

  return { onDelete, isLoading: postDelete.isPending };
}
