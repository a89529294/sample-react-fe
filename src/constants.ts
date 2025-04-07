import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const URL_PREFIX = import.meta.env.PROD
  ? "https://awstesthonobe.zapto.org"
  : "http://localhost:3000";

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: { queryClient, auth: undefined! },
});
