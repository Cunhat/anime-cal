import { Card, CardContent } from "@/components/ui/card";
import { CharactersInfo } from "@/schemas/main";

type CharactersProps = {
  characters: CharactersInfo[];
};

export default function Characters({ characters }: CharactersProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {characters.map((character, i) => (
        <Card key={i} className="overflow-hidden group transition-colors ">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={character.character.images.webp.image_url}
              alt={character.character.name}
              className="w-full h-72 object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <CardContent className="p-4 bg-black">
            <h3 className="font-semibold text-muted">
              {character.character.name}
            </h3>
            <p className="text-sm text-muted">Main Character</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
