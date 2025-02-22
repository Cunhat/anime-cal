import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/weekly/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/weekly/"!</div>;
}
