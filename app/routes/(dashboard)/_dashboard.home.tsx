import { AnimeCard } from "@/components/anime/anime-card";
import { Title } from "@/components/typography";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Home from "@/modules/home/views/home";
import { AnimeServerRequest } from "@/schemas/main";
import { topAnimeQueryOptions } from "@/server/anime";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

const fetchTopSeasonsAnime = createServerFn({ method: "GET" }).handler(
  async () => {
    await new Promise((r) => setTimeout(r, 3000));
    const response = await fetch(
      "https://api.jikan.moe/v4/seasons/now?sfw=true&filter=tv"
    );
    const data = await response.json();
    return data as AnimeServerRequest;
  }
);

export const topSeasonsAnimeQueryOptions = queryOptions({
  queryKey: ["topSeasonsAnime"],
  queryFn: () => fetchTopSeasonsAnime(),
});

export const Route = createFileRoute("/(dashboard)/_dashboard/home")({
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(topSeasonsAnimeQueryOptions);
    queryClient.prefetchQuery(topAnimeQueryOptions);
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
