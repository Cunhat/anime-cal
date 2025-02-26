import { Suspense } from "react";
import { SeasonalAnime } from "../sections/seasonal-anime";
import { TopAnime } from "../sections/top-anime";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <SeasonalAnime />
      <TopAnime />
    </div>
  );
}
