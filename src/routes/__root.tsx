import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContext } from "../auth/auth-provider";

type MyRouterContext = {
  queryClient: QueryClient;
  auth: AuthContext;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
});
