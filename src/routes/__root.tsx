import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen bg-black">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
