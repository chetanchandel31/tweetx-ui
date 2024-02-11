import { useAuth } from "@/providers/AuthProvider/useAuth";
import { ErrorOutlineRounded, LogoutRounded } from "@mui/icons-material";
import { Button, Typography, useTheme } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useConfirm } from "material-ui-confirm";

type Props = {};

export default function ButtonLogout({}: Props) {
  const theme = useTheme();
  const confirm = useConfirm();

  const queryClient = useQueryClient();

  const { removeAuthorizedUser } = useAuth();

  const onLogout = () => {
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
          Log out?
        </Typography>
      ),
      description: <>Are you sure you want to log out?</>,
      confirmationText: "Log out",
    })
      .then(() => {
        removeAuthorizedUser();
        queryClient.clear();
      })
      .catch(() => console.log("#kla3892798829"));
  };

  return (
    <Button
      color="error"
      fullWidth
      endIcon={<LogoutRounded />}
      onClick={onLogout}
    >
      Log out
    </Button>
  );
}
