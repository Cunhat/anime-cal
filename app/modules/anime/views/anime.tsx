import React, { Suspense } from "react";
import AnimeMain from "../sections/anime-main";

type AnimeProps = {
  animeId: string;
};

export const Anime = ({ animeId }: AnimeProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimeSuspense animeId={animeId} />
    </Suspense>
  );
};

function AnimeSuspense({ animeId }: AnimeProps) {
  return <AnimeMain animeId={animeId} />;
}
