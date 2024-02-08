import { TypeSetStateFunction } from "@/types";
import { useSnackbar } from "notistack";
import { useState } from "react";

import { ZodEffects, ZodError, ZodObject, ZodRawShape, z } from "zod";

type Params<ZodObjTypeFormState extends ZodRawShape> = {
  zodValidator:
    | ZodEffects<ZodObject<ZodObjTypeFormState>>
    | ZodObject<ZodObjTypeFormState>;
  initialData: z.infer<ZodObject<ZodObjTypeFormState>>;
  getIsDisabled?: (data: z.infer<ZodObject<ZodObjTypeFormState>>) => boolean;
  showErrorSnackbarOnSubmit?: boolean;
};

export default function useForm<ZodObjTypeFormState extends ZodRawShape>({
  zodValidator,
  initialData,
  getIsDisabled,
  showErrorSnackbarOnSubmit,
}: Params<ZodObjTypeFormState>) {
  type TypeFormState = z.infer<ZodObject<ZodObjTypeFormState>>;

  const snackbar = useSnackbar();

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [formData, _setFormData] = useState<TypeFormState>(initialData);

  const setFormData: TypeSetStateFunction<TypeFormState> = (setStateAction) => {
    _setFormData(setStateAction);
    setHasUnsavedChanges(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  // errors
  const [_errors, setErrors] = useState<ZodError<TypeFormState>>();
  const getErrors = (): ZodError<TypeFormState> | undefined => {
    const parseResult = zodValidator.safeParse(formData);

    if (!parseResult.success) {
      return parseResult.error as unknown as ZodError<TypeFormState>;
    }
  };
  // if _errors are already set, start using dynamically calculated errors so they immediately disappear upon fix
  const errors: ZodError<TypeFormState> | undefined = _errors
    ? getErrors()
    : _errors;

  const isSubmitDisabled =
    (getIsDisabled ? getIsDisabled(formData) : false) ||
    !hasUnsavedChanges ||
    isLoading;

  // get submit handler wrapped in validator
  type TypeOnSubmit = (
    formData: TypeFormState
  ) => Promise<{ isSuccess: boolean }>;

  const handleSubmitHandlerErrors = (_errors: ZodError<TypeFormState>) => {
    if (showErrorSnackbarOnSubmit && _errors?.issues?.[0]?.message) {
      snackbar.enqueueSnackbar(_errors.issues?.[0].message, {
        variant: "warning",
      });
    }
    setErrors(_errors);
  };

  const handleSubmitHandlerSubmission = async ({
    _formData,
    onSubmit,
  }: {
    onSubmit: TypeOnSubmit;
    _formData: TypeFormState;
  }) => {
    setIsLoading(true);
    const submitRes = await onSubmit(_formData);

    if (!submitRes.isSuccess) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
    setIsLoading(false);
  };

  const getSubmitHandler = (onSubmit: TypeOnSubmit) => {
    return () => {
      const _errors = getErrors();

      if (isSubmitDisabled) {
        // do nothing
      } else if (_errors) {
        handleSubmitHandlerErrors(_errors);
      } else {
        handleSubmitHandlerSubmission({
          _formData: formData,
          onSubmit,
        });
      }
    };
  };

  return {
    formData,
    setFormData,
    errors,
    getSubmitHandler,
    isSubmitDisabled,
    formattedErrors: errors?.format(),
    // hasUnsavedChanges,
    isLoading,
  };
}
