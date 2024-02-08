import { Card, Container, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAuthForm from "./useAuthForm";
import PasswordTextfield from "./PasswordTextField";
import getStateMutater from "@/utils/getStateMutater";
import FormFieldError from "../FormFieldError";
import AuthFormBottomText from "./AuthFormBottomText";

type Props = {};

export default function AuthForm({}: Props) {
  const {
    isSignUp,
    formData,
    setFormData,
    formattedErrors,
    isLoading,
    isSubmitDisabled,
    onSubmit,
  } = useAuthForm({});

  const mutateFormData = getStateMutater({ setState: setFormData });

  return (
    <Container sx={{ py: 5 }}>
      <Card
        sx={{ maxWidth: 500, margin: "auto", px: 2, py: 4 }}
        variant="outlined"
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography fontWeight={700} textAlign={"center"} variant="h6">
              {isSignUp ? "Create an account" : "Welcome back"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Username"
                  onChange={(e) => {
                    mutateFormData((_state) => {
                      _state.userName = e.target.value;
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSubmit();
                    }
                  }}
                  value={formData.userName}
                />

                <FormFieldError fieldErrors={formattedErrors?.userName} />
              </Grid>

              <Grid item xs={12}>
                <PasswordTextfield
                  onChange={(e) => {
                    mutateFormData((_state) => {
                      _state.password = e.target.value;
                    });
                  }}
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

              {isSignUp ? (
                <Grid item xs={12}>
                  <PasswordTextfield
                    onChange={(e) => {
                      mutateFormData((_state) => {
                        _state.confirmPassword = e.target.value;
                      });
                    }}
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

                  <FormFieldError
                    fieldErrors={formattedErrors?.confirmPassword}
                  />
                </Grid>
              ) : null}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              disabled={isSubmitDisabled}
              loading={isLoading}
              onClick={onSubmit}
              variant="contained"
            >
              {isSignUp ? "Continue" : "Log In"}
            </LoadingButton>
          </Grid>

          <Grid item xs={12}>
            <AuthFormBottomText isSignUp={isSignUp} />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
