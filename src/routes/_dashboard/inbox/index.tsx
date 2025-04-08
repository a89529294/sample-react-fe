import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/inbox/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_dashboard/inbox/"!</div>;
}
