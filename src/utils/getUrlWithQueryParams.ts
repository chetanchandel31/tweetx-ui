export default function getUrlWithQueryParams(
  queryParams: {
    [key: string]: string | null;
  },
  options?: {
    mergeWithExistingUrl?: boolean;
    /** something like `/contacts` */
    pathName?: string;
  }
) {
  const params = options?.mergeWithExistingUrl
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams();
  Object.entries(queryParams).forEach(([name, value]) => {
    if (value) params.set(name, value);
  });

  return `${
    options?.pathName || window.location.pathname
  }?${params.toString()}`;
}

export const removeQueryParamsFromUrl = (queryParams: string[]) => {
  const params = new URLSearchParams(window.location.search);

  queryParams.forEach((param) => {
    params.delete(param);
  });

  return `${window.location.pathname}?${params.toString()}`;
};
