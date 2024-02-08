import { StringParam, useQueryParams } from "use-query-params";

export default function useAppQueryParams() {
  return useQueryParams({
    "expanded-habit-id": StringParam,
    "calendar-date": StringParam,
  });
}
