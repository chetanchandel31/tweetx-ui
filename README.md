## Tech stack

- [Typescript](https://www.typescriptlang.org/) for type-safety
- [Tanstack query](https://tanstack.com/query/latest/docs/framework/react/overview) to efficient data-fetching, caching and cache invalidation
- [Zod](https://zod.dev/) for data validation and for type-safe interaction with external-data (eg data fetched from an API) which is otherwise of unknown type
- [Material UI](https://mui.com/) for accessible and easy to use UI components
- [use-query-params](https://www.npmjs.com/package/use-query-params) for managing state in URL query parameters (eg: to persist selected tab even after page refresh)
- [Notistack](https://notistack.com/) to display notifications upon important user-interactions
- [React Router](https://reactrouter.com/en/main) for client side routing

## API layer

Throughout the app, there's no fetcher function written manually like so, because this way, we have no way to know the type of fetched data

```ts
const postCreate = async () => {
  const res = await axios.post("https://api.com/post/create", {
    content: "foo",
  });

  return res;
};
```

Instead, there's a `generateEndpointCaller` function in `src/API/index.ts` which takes zod schemas for payload and response and generates a fetcher function with proper payload and response types.

The usage looks like this

```ts
const schemaPostCreatePayload = z.object({
  content: z.string({ required_error: "Content is required" }),
});
const schemaPostCreateResponse = z.object({ postId: z.string() });

const postCreate = generateEndpointCaller({
  payloadSchema: schemaPostCreatePayload,
  responseSchema: schemaPostCreateResponse,
  url: "/post/create",
});
```

The fetcher function(i.e. `postCreate` in this case) generated like this is guaranteed to return data of below type

```ts
type TypeResult<T> =
  | { isSuccess: true; result: T }
  | { isSuccess: false; errorMessages: string[]; details?: any };
```

This way we don't have to add an if-check before trying to access each property on fetched data or write try-catch blocks throughout the app because each API request can potentially blow up the app.

We just have to check for `isSuccess`

1. Either `isSuccess` would be `true` and we can safely access any property defined via our response schema
2. or `isSuccess` would be `false` and we can show error messages elegantly
