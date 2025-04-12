import { URL_PREFIX } from "@/constants";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

import type { TrpcTypes } from "../api-types";
import { sessionTokenKey } from "@/auth/auth-provider";

export const trpcApiClient = createTRPCReact<TrpcTypes["Router"]>();

export const trpcApiClientProvider = trpcApiClient.createClient({
  links: [
    httpBatchLink({
      url: `${URL_PREFIX}/trpc`,
      headers: () => {
        const token = localStorage.getItem(sessionTokenKey);
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
    }),
  ],
});
