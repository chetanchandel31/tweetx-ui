import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import MuiThemeProvider from "./MuiThemeProvider/index.tsx";
import ReactQueryProvider from "./ReactQueryProvider";
import { ConfirmProvider } from "material-ui-confirm";
import AuthProvider from "./AuthProvider";

export default function AllProviders({ children }: { children: ReactNode }) {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={5000}
      preventDuplicate
      maxSnack={6}
    >
      <Router>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <MuiThemeProvider>
            <ConfirmProvider
              defaultOptions={{
                //   cancellationButtonProps: {
                //     color: "primary",
                //     variant: "text",
                //   },
                confirmationButtonProps: {
                  color: "error",
                  variant: "contained",
                },
                dialogActionsProps: {
                  style: {
                    justifyContent: "space-between",
                  },
                },
                dialogProps: {
                  maxWidth: "xs",
                },
                //   confirmationText: "Continue",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <ReactQueryProvider>
                  <AuthProvider>{children}</AuthProvider>
                </ReactQueryProvider>
              </LocalizationProvider>
            </ConfirmProvider>
          </MuiThemeProvider>
        </QueryParamProvider>
      </Router>
    </SnackbarProvider>
  );
}
