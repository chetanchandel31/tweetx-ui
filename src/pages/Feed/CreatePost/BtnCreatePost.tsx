import { CreateRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import DialogCreatePost from "./DialogCreatePost";

type Props = {};

export default function BtnCreatePost({}: Props) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        startIcon={<CreateRounded />}
        variant="contained"
      >
        Write
      </Button>

      {showDialog ? (
        <DialogCreatePost onClose={() => setShowDialog(false)} />
      ) : null}
    </>
  );
}
