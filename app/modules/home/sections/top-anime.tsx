import { AnimeCard } from "@/components/anime/anime-card";
import { Title } from "@/components/typography";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { topSeasonsAnimeQueryOptions } from "@/routes/(dashboard)/_dashboard.home";
import { topAnimeQueryOptions } from "@/server/anime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

export function TopAnime() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopAnimeSuspense />
    </Suspense>
  );
}

function TopAnimeSuspense() {
  const topAnimeQuery = useSuspenseQuery(topAnimeQueryOptions);
  const topAnime = topAnimeQuery.data;

  return (
    <div className="flex flex-col gap-4">
      <Title>Top Anime</Title>
      <Carousel
        opts={{
          align: "start",
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselContent className="">
          {topAnime.data.map((anime, index) => (
            <CarouselItem
              key={anime.mal_id + index}
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
