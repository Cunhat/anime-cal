import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

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

export const Route = createFileRoute("/weekly/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(weeklyAnimeQueryOptions),
  component: RouteComponent,
});

function RouteComponent() {
  const weeklyAnimeQuery = useSuspenseQuery(weeklyAnimeQueryOptions);
  const weeklyAnime = weeklyAnimeQuery.data;

  console.log(weeklyAnime);
  return (
    <div className="container mx-auto px-4 py-8 text-white overflow-auto h-screen">
      <h1 className="text-2xl font-bold">Weekly Anime</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 h-[300px]">
        {weeklyAnime.data.map((anime) => (
          <div key={anime.mal_id} className="flex flex-col items-center">
            <img
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              className="w-full h-full object-contain rounded-md"
            />
            <h2 className="text-lg font-bold">{anime.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
