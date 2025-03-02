import {
  AnimeByIdServerRequest,
  AnimeServerRequest,
  Characters,
  EpisodeRequest,
} from "@/schemas/main";
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
    const response = await fetch(`https://api.jikan.moe/v4/anime/${data}/full`);

    const resp = await response.json();

    return resp as AnimeByIdServerRequest;
  });

export const animeByIdQueryOptions = (animeId: string) =>
  queryOptions({
    queryKey: ["animeById", animeId],
    queryFn: () => fetchAnimeById({ data: animeId }),
  });

const fetchAnimeCharacters = createServerFn({
  method: "GET",
})
  .validator((animeId: string) => animeId)
  .handler(async ({ data }) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${data}/characters`
    );
    const resp = await response.json();

    return resp as Characters;
  });

export const animeCharactersQueryOptions = (animeId: string) =>
  queryOptions({
    queryKey: ["animeCharacters", animeId],
    queryFn: () => fetchAnimeCharacters({ data: animeId }),
  });

const fetchAnimeEpisodes = createServerFn({
  method: "GET",
})
  .validator((animeId: string) => animeId)
  .handler(async ({ data }) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${data}/episodes`
    );
    const resp = await response.json();

    return resp as EpisodeRequest;
  });

export const animeEpisodesQueryOptions = (animeId: string) =>
  queryOptions({
    queryKey: ["animeEpisodes", animeId],
    queryFn: () => fetchAnimeEpisodes({ data: animeId }),
  });
