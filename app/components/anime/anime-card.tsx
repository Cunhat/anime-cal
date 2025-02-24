import { TopSeasonsAnime } from "@/schemas/main";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AnimeCardProps = {
  anime: TopSeasonsAnime["data"][number];
};

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <AnimeCardTooltip anime={anime}>
      <div
        key={anime.mal_id}
        className="aspect-[3/4] relative hover:cursor-pointer"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/90 flex flex-col items-start justify-end p-4">
          <p className="text-white text-lg bold">{anime.title_english}</p>
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
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{anime.title_english}</p>
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
