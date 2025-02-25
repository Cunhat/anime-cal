import Navbar from "@/components/navbar";
import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/_dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen flex flex-col bg-black">
      <Navbar />
      <div className="container mx-auto p-4 overflow-auto h-full">
        <Outlet />
      </div>
    </div>
  );
}
