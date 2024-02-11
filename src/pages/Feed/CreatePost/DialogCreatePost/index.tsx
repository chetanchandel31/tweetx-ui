import usePostCreate from "@/API/react-query/post/usePostCreate";
import { config } from "@/config";
import { CloseRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import WordLimitIndicator from "./WordLimitIndicator";

type Props = {
  onClose: () => void;
};

export default function DialogCreatePost({ onClose }: Props) {
  const snackbar = useSnackbar();

  const [content, setContent] = useState("");

  const postCreate = usePostCreate({});
  const isDisabled = !content || content.length > config.postContentMaxLength;

  const onPostCreate = async () => {
    if (isDisabled) return;

    const createRes = await postCreate.mutateAsync({
      content,
    });

    if (createRes.isSuccess) {
      onClose();
      snackbar.enqueueSnackbar(`Your post is live 🎉`, {
        variant: "success",
      });
    }
  };

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
            <TextField
              placeholder="What's on your mind?"
              multiline
              minRows={5}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              justifyContent={"end"}
            >
              <Grid item>
                <WordLimitIndicator charsCount={content.length} />
              </Grid>

              <Grid item>
                <LoadingButton
                  disabled={isDisabled}
                  loading={postCreate.isPending}
                  onClick={onPostCreate}
                  style={{ minWidth: 100 }}
                  variant="contained"
                >
                  Post
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
