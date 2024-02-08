import { Grid, TextField } from "@mui/material";
import useSignupForm from "./useSignupForm";
import PasswordTextfield from "../PasswordTextField";
import getStateMutater from "@/utils/getStateMutater";
import { LoadingButton } from "@mui/lab";
import FormFieldError from "@/components/FormFieldError";

type Props = {};

export default function AuthSignupForm({}: Props) {
  const {
    formData,
    setFormData,
    isSubmitDisabled,
    formattedErrors,
    isLoading,
    onSubmit,
  } = useSignupForm({});

  const mutateState = getStateMutater({ setState: setFormData });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          name="name"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
          onChange={(e) =>
            mutateState((state) => {
              state.name = e.target.value;
            })
          }
          value={formData.name}
        />

        <FormFieldError fieldErrors={formattedErrors?.name} />
      </Grid>

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

      <Grid item xs={12}>
        <PasswordTextfield
          onChange={(e) =>
            mutateState((state) => {
              state.confirmPassword = e.target.value;
            })
          }
          value={formData.confirmPassword}
          textFieldProps={{
            label: "Confirm password",
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            },
          }}
        />

        <FormFieldError fieldErrors={formattedErrors?.confirmPassword} />
      </Grid>

      <Grid item xs={12} textAlign={"right"}>
        <LoadingButton
          disabled={isSubmitDisabled}
          loading={isLoading}
          onClick={onSubmit}
          sx={{ minWidth: 100 }}
          variant="contained"
        >
          Sign up
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
