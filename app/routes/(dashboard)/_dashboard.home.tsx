import Home from "@/modules/home/views/home";
import {
  topAnimeQueryOptions,
  topSeasonsAnimeQueryOptions,
} from "@/server/anime";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/_dashboard/home")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(topSeasonsAnimeQueryOptions);
    queryClient.ensureQueryData(topAnimeQueryOptions);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4">
      <Home />
    </div>
  );
}
