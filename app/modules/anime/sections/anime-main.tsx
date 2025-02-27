import { NotFound } from "@/components/NotFound";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  animeByIdQueryOptions,
  animeCharactersQueryOptions,
} from "@/server/anime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, Users } from "lucide-react";
import { Play, Share2, Star } from "lucide-react";
import Characters from "./characters";

type AnimeMainProps = {
  animeId: string;
};

export default function AnimeMain({ animeId }: AnimeMainProps) {
  const animeQuery = useSuspenseQuery(animeByIdQueryOptions(animeId));
  const anime = animeQuery.data.data;
  const charactersQuery = useSuspenseQuery(
    animeCharactersQueryOptions(animeId)
  );
  const characters = charactersQuery.data.data;

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent" />
          <img
            src={anime.images.webp.large_image_url}
            alt="Anime Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 space-y-4">
          <div className="flex items-center gap-4">
            <Badge
              variant="secondary"
              //   className="text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {anime.type}
            </Badge>
            <Badge
              variant="secondary"
              //   className="text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {anime.episodes} Episodes
            </Badge>
            <Badge
              variant="secondary"
              className="text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Fantasy
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {anime.title}
          </h1>
          <div className="flex items-center gap-4 text-primary-foreground">
            <div className="flex items-center bg-primary/10 px-2 py-1 rounded-md">
              <Star className="w-5 h-5 fill-yellow-500 stroke-yellow-500 mr-1" />
              <span className="font-medium text-white">4.8</span>
            </div>
            <span className="text-white">•</span>
            <span className="text-white">{anime.year}</span>
            <span className="text-white">•</span>
            <span className="text-white">{anime.rating}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-3/4 space-y-8">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2 bg-pink-500 hover:bg-pink-500/90"
              >
                <Play className="w-5 h-5" /> Watch Trailer
              </Button>
              <Button size="lg" variant="secondary" className="gap-2">
                <Share2 className="w-5 h-5" /> Share
              </Button>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-muted">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="characters"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Characters
                </TabsTrigger>
                <TabsTrigger
                  value="episodes"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Episodes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6 space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold text-white">Synopsis</h2>
                  <p className="text-muted">
                    In a world where magic and technology intertwine, follow the
                    journey of our protagonist as they discover their hidden
                    powers and face unprecedented challenges. With friends and
                    rivals alike, they must navigate through complex
                    relationships and battle against dark forces threatening
                    their world.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm text-muted">Duration</span>
                    </div>
                    <p className="font-medium text-white">24 min per ep</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm text-muted">Aired</span>
                    </div>
                    <p className="font-medium text-white">Jan 2024 - Present</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm text-muted">Studios</span>
                    </div>
                    <p className="font-medium text-white">Studio Name</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="characters" className="mt-6">
                <Characters characters={characters} />
              </TabsContent>
              <TabsContent value="episodes" className="mt-6">
                {/* <ScrollArea className="h-[400px] rounded-md border p-4 bg-card/50"> */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 pb-4 mb-4 border-b last:border-0 hover:bg-muted/50 rounded-lg p-2 transition-colors"
                  >
                    <img
                      src="/placeholder.svg?height=120&width=200"
                      alt={`Episode ${i + 1}`}
                      className="w-32 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-card-foreground">
                        Episode {i + 1}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        A brief description of what happens in this episode...
                      </p>
                    </div>
                  </div>
                ))}
                {/* </ScrollArea> */}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Related Anime */}
          <div className="lg:w-1/4">
            <h2 className="text-xl font-bold mb-4 text-primary-foreground">
              Related Anime
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex gap-4 group hover:bg-muted/50 p-2 rounded-lg transition-colors"
                >
                  <img
                    src="/placeholder.svg?height=150&width=100"
                    alt={`Related Anime ${i}`}
                    className="w-20 h-28 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-medium text-primary-foreground group-hover:text-primary transition-colors">
                      Related Anime Title
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      TV Series • 12 Episodes
                    </p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
                      <span className="text-sm ml-1 text-muted-foreground">
                        4.5
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
