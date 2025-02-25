import { TopSeasonsAnime } from "@/schemas/main";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AnimeScoreBadge from "../anime-score-badge";
import { Badge } from "../ui/badge";
import { getTimeUntilNextEpisode } from "@/utils/date-utils";
import { Clock } from "lucide-react";

type AnimeCardProps = {
  anime: TopSeasonsAnime["data"][number];
};

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <AnimeCardTooltip anime={anime}>
      <div
        key={anime.mal_id}
        className="aspect-[3/4] relative hover:cursor-pointer flex flex-col gap-2"
      >
        <div className="absolute top-1 right-1">
          <AnimeScoreBadge score={anime.score} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/90 flex flex-col items-start justify-end p-2">
          <div className="flex flex-col h-1/3 justify-end items-center text-left">
            <p className="text-white text-bottom text-sm w-full">
              {anime.title_english || anime.title}
            </p>
          </div>
        </div>
        <img
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
    </AnimeCardTooltip>
  );
}

const AnimeCardTooltip = ({
  children,
  anime,
}: {
  children: React.ReactNode;
  anime: TopSeasonsAnime["data"][number];
}) => {
  const { timeUntil, formattedNextEpisode } = getTimeUntilNextEpisode(
    anime.broadcast
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center justify-between w-full">
              <h1 className="text-white text-sm font-bold">
                {anime.title_english}
              </h1>
              <AnimeScoreBadge score={anime.score} />
            </div>

            {anime.airing && anime.broadcast && anime.broadcast.day && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold">Next episode:</span>
                <div className="flex items-center gap-2 text-xs w-full justify-between">
                  <span className="text-sm">{formattedNextEpisode}</span>
                  <Badge variant="secondary" className="text-xs">
                    {timeUntil}
                  </Badge>
                </div>
              </div>
            )}

            <div className="flex gap-2 wrap">
              {anime.genres.map((genre) => (
                <Badge variant={"secondary"} key={genre.mal_id}>
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export function AnimeCardSkeleton() {
  return (
    <div className="aspect-[3/4] relative animate-pulse">
      <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      <div className="absolute bottom-0 left-0 w-full p-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
      </div>
    </div>
  );
}
