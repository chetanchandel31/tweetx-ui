import usePostGet from "@/API/react-query/post/usePostGet";
import { Grid, TextField } from "@mui/material";
import WordLimitIndicator from "../CreatePost/DialogCreatePost/WordLimitIndicator";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import usePostUpdate from "@/API/react-query/post/usePostUpdate";
import { config } from "@/config";
import { useSnackbar } from "notistack";
import { SaveRounded } from "@mui/icons-material";

type Props = {
  postGet: ReturnType<typeof usePostGet>;
  onClose: () => void;
};

export default function EditAfterLoading({ onClose, postGet }: Props) {
  const snackbar = useSnackbar();

  const postGetResult = postGet.data?.isSuccess ? postGet.data : undefined;
  const [content, setContent] = useState(postGetResult?.result.content || "");

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const postUpdate = usePostUpdate({});
  const isDisabled =
    !content ||
    content.length > config.postContentMaxLength ||
    !hasUnsavedChanges;

  const onPostUpdate = async () => {
    if (isDisabled) return;

    const updateRes = await postUpdate.mutateAsync({
      content,
      postId: postGetResult?.result.postId || "",
    });

    if (updateRes.isSuccess) {
      onClose();
      snackbar.enqueueSnackbar(`Post updated`, {
        variant: "success",
      });
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          autoFocus
          placeholder="What's on your mind?"
          multiline
          minRows={5}
          onChange={(e) => {
            setContent(e.target.value);
            setHasUnsavedChanges(true);
          }}
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
              loading={postUpdate.isPending}
              onClick={onPostUpdate}
              startIcon={<SaveRounded />}
              style={{ minWidth: 100 }}
              variant="contained"
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
