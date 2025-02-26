import { AnimeServerRequest } from "@/schemas/main";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";

const fetchTopSeasonsAnime = createServerFn({ method: "GET" }).handler(
  async () => {
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

const fetchTopAnime = createServerFn({ method: "GET" }).handler(async () => {
  const response = await fetch(
    "https://api.jikan.moe/v4/top/anime?type=tv&sfw=true"
  );
  const data = await response.json();
  return data as AnimeServerRequest;
});

export const topAnimeQueryOptions = queryOptions({
  queryKey: ["topAnime"],
  queryFn: () => fetchTopAnime(),
});

const fetchAnimeById = createServerFn({
  method: "GET",
})
  .validator((animeId: string) => animeId)
  .handler(async ({ data }) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${data}`);

    return (await response.json()) as AnimeServerRequest;
  });

export const animeByIdQueryOptions = (animeId: string) =>
  queryOptions({
    queryKey: ["animeById", animeId],
    queryFn: () => fetchAnimeById({ data: animeId }),
  });
