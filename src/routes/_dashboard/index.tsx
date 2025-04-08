import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="h-[2000px]">Hello "/dashboard/"!</div>;
}
