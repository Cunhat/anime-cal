import { NotFound } from "@/components/NotFound";
import { Anime } from "@/modules/anime/views/anime";

import {
  animeByIdQueryOptions,
  animeCharactersQueryOptions,
} from "@/server/anime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/_dashboard/anime/$animeId")({
  loader: async ({ params: { animeId }, context }) => {
    context.queryClient.ensureQueryData(animeCharactersQueryOptions(animeId));
    await context.queryClient.ensureQueryData(animeByIdQueryOptions(animeId));
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
