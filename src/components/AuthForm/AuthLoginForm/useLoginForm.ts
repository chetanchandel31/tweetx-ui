import useAuthSignIn from "@/API/react-query/auth/useAuthSignIn";
import useForm from "@/hooks/useForm";
import { useAuth } from "@/providers/AuthProvider/useAuth";
import { useSnackbar } from "notistack";
import { z } from "zod";

type Params = {};

const schemaLoginForm = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Password should be of atleast 8 characters" }),
});

export default function useLoginForm({}: Params) {
  const snackbar = useSnackbar();
  const {
    formData,
    setFormData,
    formattedErrors,
    isSubmitDisabled,
    isLoading,
    getSubmitHandler,
  } = useForm({
    zodValidator: schemaLoginForm,
    initialData: {
      email: "",
      password: "",
    },
    showErrorSnackbarOnSubmit: true,
  });

  const authSignIn = useAuthSignIn({});

  const auth = useAuth();

  const handleSignin = async () => {
    const res = { isSuccess: true };
    const { email, password } = formData;

    const result = await authSignIn.mutateAsync({
      email,
      password,
    });

    if (!result.isSuccess) {
      res.isSuccess = false;
    } else {
      auth.setAuthorizedUser({
        accessToken: result.result.authToken,
        accessTokenExpiresAt: result.result.authTokenExpiresAtMs / 1000,
      });
      snackbar.enqueueSnackbar("Welcome back 🎉", { variant: "success" });
    }

    return res;
  };

  const onSubmit = getSubmitHandler(async (_formData) => {
    const result = await handleSignin();

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
