import { NotFound } from "@/components/NotFound";
import { Anime } from "@/modules/anime/views/anime";

import {
  animeByIdQueryOptions,
  animeCharactersQueryOptions,
  animeEpisodesQueryOptions,
} from "@/server/anime";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/_dashboard/anime/$animeId")({
  loader: async ({ params: { animeId }, context }) => {
    await context.queryClient.ensureQueryData(
      animeCharactersQueryOptions(animeId)
    );
    await context.queryClient.ensureQueryData(animeByIdQueryOptions(animeId));
    await context.queryClient.ensureQueryData(
      animeEpisodesQueryOptions(animeId)
    );
  },
  //   head: ({ loaderData }) => ({
  //     meta: loaderData ? [{ title: loaderData.title }] : undefined,
  //   }),
  errorComponent: () => <div>Not Found...</div>,
  notFoundComponent: () => {
    return <NotFound>Anime not found</NotFound>;
  },
  component: AnimePage,
});

function AnimePage() {
  const { animeId } = Route.useParams();

  return <Anime animeId={animeId} />;
}
