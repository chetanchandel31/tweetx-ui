import { routes } from "@/routes/routes";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import useForm from "@/hooks/useForm";
import useAuthSignIn from "@/API/react-query/auth/useAuthSignIn";
import useAuthSignUp from "@/API/react-query/auth/useAuthSignUp";
import { useAuth } from "@/providers/AuthProvider/useAuth";
import { useSnackbar } from "notistack";

type Params = {};

export default function useAuthForm({}: Params) {
  const location = useLocation();
  const isSignUp = location.pathname === routes.auth_signup.path;
  const snackbar = useSnackbar();

  const auth = useAuth();

  const authSignIn = useAuthSignIn({});
  const authSignUp = useAuthSignUp({});

  const schemaAuthForm = z
    .object({
      userName: z
        .string({
          required_error: "Username is required",
        })
        .min(3, { message: "Username should be of 3 characters atleast" }),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(8, { message: "Password should be of atleast 8 characters" }),
      confirmPassword: z.string(),
    })
    .superRefine((schema, ctx) => {
      if (isSignUp && schema.password !== schema.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords don't match",
          path: ["confirmPassword"],
        });
      }
    });

  const {
    formData,
    setFormData,
    formattedErrors,
    isSubmitDisabled,
    getSubmitHandler,
    isLoading,
  } = useForm({
    zodValidator: schemaAuthForm,
    initialData: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
    showErrorSnackbarOnSubmit: true,
  });

  const handleSignup = async () => {
    const res = { isSuccess: true };
    const { userName, password } = formData;

    const result = await authSignUp.mutateAsync({ name: userName, password });

    if (!result.isSuccess) {
      res.isSuccess = false;
    } else {
      auth.setAuthorizedUser({
        accessToken: result.result.authToken,
        accessTokenExpiresAt: result.result.authTokenExpiresAtMs / 1000,
      });
      snackbar.enqueueSnackbar("Sign up successful", { variant: "success" });
    }

    return res;
  };

  const handleLogin = async () => {
    const res = { isSuccess: true };
    const { userName, password } = formData;

    const result = await authSignIn.mutateAsync({ name: userName, password });

    if (!result.isSuccess) {
      res.isSuccess = false;
    } else {
      auth.setAuthorizedUser({
        accessToken: result.result.authToken,
        accessTokenExpiresAt: result.result.authTokenExpiresAtMs / 1000,
      });
      snackbar.enqueueSnackbar("Welcome back", { variant: "success" });
    }

    return res;
  };

  const onSubmit = getSubmitHandler(async (_formData) => {
    if (isSignUp) {
      const result = await handleSignup();

      return result;
    } else {
      const result = await handleLogin();

      return result;
    }
  });

  return {
    formData,
    setFormData,
    formattedErrors,
    isSubmitDisabled,
    onSubmit,
    isLoading,
    isSignUp,
  };
}
