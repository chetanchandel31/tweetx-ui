import { Grid, TextField } from "@mui/material";
import PasswordTextfield from "../PasswordTextField";
import getStateMutater from "@/utils/getStateMutater";
import { LoadingButton } from "@mui/lab";
import FormFieldError from "@/components/FormFieldError";
import useLoginForm from "./useLoginForm";

type Props = {};

export default function AuthLoginForm({}: Props) {
  const {
    formData,
    setFormData,
    isSubmitDisabled,
    formattedErrors,
    isLoading,
    onSubmit,
  } = useLoginForm({});

  const mutateState = getStateMutater({ setState: setFormData });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Email"
          name="email"
          type="email"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
          onChange={(e) =>
            mutateState((state) => {
              state.email = e.target.value;
            })
          }
          value={formData.email}
        />

        <FormFieldError fieldErrors={formattedErrors?.email} />
      </Grid>

      <Grid item xs={12}>
        <PasswordTextfield
          onChange={(e) =>
            mutateState((state) => {
              state.password = e.target.value;
            })
          }
          value={formData.password}
          textFieldProps={{
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            },
          }}
        />

        <FormFieldError fieldErrors={formattedErrors?.password} />
      </Grid>

      <Grid item xs={12} textAlign={"right"}>
        <LoadingButton
          disabled={isSubmitDisabled}
          loading={isLoading}
          onClick={onSubmit}
          sx={{ minWidth: 100 }}
          variant="contained"
        >
          Login
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
