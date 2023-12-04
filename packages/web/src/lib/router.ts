import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { createServerSideHelpers } from "@trpc/react-query/server";

import superjson from "superjson";
import { AppRouter } from "api";

const proxyClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:5000/trpc",
    }),
  ],
  transformer: superjson,
});

export const trpc = createServerSideHelpers({
  client: proxyClient,
});
