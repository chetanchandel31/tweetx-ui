import useAuthSignUp from "@/API/react-query/auth/useAuthSignUp";
import useForm from "@/hooks/useForm";
import { useAuth } from "@/providers/AuthProvider/useAuth";
import { useSnackbar } from "notistack";
import { z } from "zod";

type Params = {};

const schemaSignupForm = z
  .object({
    name: z
      .string({
        required_error: "Username is required",
      })
      .min(3, { message: "Username should be of 3 characters atleast" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, { message: "Password should be of atleast 8 characters" }),
    confirmPassword: z.string(),
  })
  .superRefine((schema, ctx) => {
    if (schema.password !== schema.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

export default function useSignupForm({}: Params) {
  const snackbar = useSnackbar();
  const {
    formData,
    setFormData,
    formattedErrors,
    isSubmitDisabled,
    isLoading,
    getSubmitHandler,
  } = useForm({
    zodValidator: schemaSignupForm,
    initialData: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    showErrorSnackbarOnSubmit: true,
  });

  const authSignUp = useAuthSignUp({});

  const auth = useAuth();

  const handleSignup = async () => {
    const res = { isSuccess: true };
    const { email, password, name } = formData;

    const result = await authSignUp.mutateAsync({
      name,
      password,
      email,
    });

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

  const onSubmit = getSubmitHandler(async (_formData) => {
    const result = await handleSignup();

    return result;
  });

  return {
    formData,
    setFormData,
    formattedErrors,
    isSubmitDisabled,
    onSubmit,
    isLoading,
  };
}
