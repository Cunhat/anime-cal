import { AnimeCard } from "@/components/anime/anime-card";
import { Title } from "@/components/typography";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TopSeasonsAnime } from "@/schemas/main";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

const fetchTopSeasonsAnime = createServerFn({ method: "GET" }).handler(
  async () => {
    const response = await fetch(
      "https://api.jikan.moe/v4/seasons/now?sfw=true"
    );
    const data = await response.json();
    return data as TopSeasonsAnime;
  }
);

export const topSeasonsAnimeQueryOptions = queryOptions({
  queryKey: ["topSeasonsAnime"],
  queryFn: () => fetchTopSeasonsAnime(),
});

export const Route = createFileRoute("/(dashboard)/_dashboard/home")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(topSeasonsAnimeQueryOptions),
  component: RouteComponent,
});

function RouteComponent() {
  const topSeasonsAnimeQuery = useSuspenseQuery(topSeasonsAnimeQueryOptions);
  const topSeasonsAnime = topSeasonsAnimeQuery.data;

  console.log(topSeasonsAnime);
  return (
    <div className="flex flex-col gap-4">
      <Title>Seasonal Anime</Title>
      <Carousel
        opts={{
          align: "start",
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselContent className="">
          {topSeasonsAnime.data.map((anime) => (
            <CarouselItem
              key={anime.mal_id}
              className="lg:basis-1/5 basis-1/2 sm:basis-1/3 md:basis-1/4 "
            >
              <AnimeCard anime={anime} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
