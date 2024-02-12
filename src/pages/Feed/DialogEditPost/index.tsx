import usePostGet from "@/API/react-query/post/usePostGet";
import HelperText from "@/components/HelperText";
import useAppQueryParams from "@/hooks/useAppQueryParams";
import { CloseRounded } from "@mui/icons-material";
import { Dialog, DialogContent, Grid, IconButton } from "@mui/material";
import EditAfterLoading from "./EditAfterLoading";

type Props = {
  onClose: () => void;
};

export default function DialogEditPost({ onClose }: Props) {
  const [queryParams] = useAppQueryParams();
  const postGet = usePostGet({ postId: queryParams["edit-post-id"] || "" });

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <IconButton onClick={onClose} size="small">
              <CloseRounded />
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            {postGet.isPending || !postGet.isSuccess ? (
              <HelperText text="Loading post..." minHeight={200} />
            ) : (
              <EditAfterLoading onClose={onClose} postGet={postGet} />
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
