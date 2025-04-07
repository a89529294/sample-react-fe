import { QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "../auth/use-auth.js";
import { queryClient, router } from "../constants";
import { RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export function InnerApp() {
  const auth = useAuth();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ queryClient, auth }} />
      </QueryClientProvider>
      <TanStackRouterDevtools router={router} />
    </>
  );
}
