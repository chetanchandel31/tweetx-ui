import { Alert } from "@mui/material";

type Props = {
  fieldErrors:
    | {
        _errors: string[];
      }
    | undefined;
};

export default function FormFieldError({ fieldErrors }: Props) {
  return (
    <>
      {fieldErrors?._errors?.[0] ? (
        <Alert severity="error" sx={{ mt: 1 }}>
          {fieldErrors?._errors?.[0]}
        </Alert>
      ) : null}
    </>
  );
}
