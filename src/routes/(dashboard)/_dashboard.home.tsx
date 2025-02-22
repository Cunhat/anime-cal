import { Title } from "@/components/typography";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const fetchWeeklyAnime = async () => {
  const response = await fetch(
    "https://api.jikan.moe/v4/top/anime?filter=airing"
  );
  const data = await response.json();
  return data;
};

export const weeklyAnimeQueryOptions = queryOptions({
  queryKey: ["weeklyAnime"],
  queryFn: () => fetchWeeklyAnime(),
});

export const Route = createFileRoute("/(dashboard)/_dashboard/home")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(weeklyAnimeQueryOptions),
  component: RouteComponent,
});

function RouteComponent() {
  const weeklyAnimeQuery = useSuspenseQuery(weeklyAnimeQueryOptions);
  const weeklyAnime = weeklyAnimeQuery.data;

  console.log(weeklyAnime);
  return (
    <div className="flex flex-col gap-4">
      <Title>Top Airing Anime</Title>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-[300px]"
      >
        <CarouselContent>
          {weeklyAnime.data.map((anime) => (
            <CarouselItem key={anime.id} className="h-[300px]">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div key={anime.mal_id} className="h-[300px]">
                      <img
                        src={anime.images.webp.large_image_url}
                        alt={anime.title}
                        className="object-cover"
                      />
                      <h2 className="text-lg font-bold">{anime.title}</h2>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* <div className="flex gap-4 overflow-auto">
        {weeklyAnime.data.map((anime) => (
          <div key={anime.mal_id} className="h-[300px] w-[300px]">
            <img
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              className="w-full h-full object-cover"
            />
            <h2 className="text-lg font-bold">{anime.title}</h2>
          </div>
        ))}
      </div> */}
    </div>
  );
}
