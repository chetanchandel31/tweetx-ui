import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSnackbar } from "notistack";
import { ReactNode } from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      // onSuccess: (data, variables, context, mutation) => {
      //   // could make this single place to listen to mutations and fire june events
      //   // but atm can't identify "which mutation happened" w/o update to generated RQ hooks
      // },
    }),

    defaultOptions: {
      queries: {
        // w/o this api requests keep firing each time we click on UI after inspecting any browser dev tools
        refetchOnWindowFocus: import.meta.env.PROD,
        // `onError` never runs and it just keeps re-firing requests if this is `true`
        retry: false,
      },
      mutations: {
        // if need to overwrite it for a particular instance, just pass custom `onSettled` function while calling useMutation
        onSettled: (res: any) => {
          if (res?.errorMessages?.[0]) {
            enqueueSnackbar(
              res?.errorMessages?.[0] ||
                "Something went wrong. Try again. Ref: EA5T4SJ",
              {
                variant: "error",
              }
            );
          }
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
