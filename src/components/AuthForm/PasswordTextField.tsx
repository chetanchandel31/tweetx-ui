import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, { useState } from "react";

type Props = {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
  textFieldProps?: TextFieldProps;
};

export default function PasswordTextfield({
  onChange,
  value,
  textFieldProps,
}: Props) {
  const [doShowPassword, setDoShowPassword] = useState(false);

  return (
    <TextField
      label="Password"
      type={doShowPassword ? "text" : "password"}
      name="password"
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setDoShowPassword((_doShow) => !_doShow)}
            >
              {!doShowPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={value}
      {...textFieldProps}
    />
  );
}
