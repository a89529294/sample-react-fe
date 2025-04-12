import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "../auth/use-auth.js";
import { queryClient, router } from "../constants";

export function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ queryClient, auth }} />;
}
