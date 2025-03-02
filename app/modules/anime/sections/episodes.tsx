import { Episode } from "@/schemas/main";
import dayjs from "dayjs";
import { Star } from "lucide-react";
import React from "react";

type EpisodesProps = {
  episodes: Episode[];
};

export function Episodes({ episodes }: EpisodesProps) {
  return (
    <div>
      {episodes.map((episode, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 pb-4 mb-4 rounded-lg p-2 transition-colors border"
        >
          <div>
            <h3 className="font-semibold text-muted">
              {episode.mal_id} - {episode.title}
            </h3>
            <p className="text-sm text-muted-foreground pl-6">
              {dayjs(episode.aired).format("DD MMMM YYYY")}
            </p>
          </div>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
            <span className="text-sm ml-1 text-muted">{episode.score}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
