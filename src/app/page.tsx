import fs from 'fs';
import path from 'path';
import CharacterCard from './CharacterCard';
import { Character } from './character';

async function getCharacters(): Promise<Character[]> {
  try {
    const charactersDir = path.join(process.cwd(), 'src/app/characters');
    const files = await fs.promises.readdir(charactersDir, { withFileTypes: true });
    const characters = await Promise.all(
      files
        .filter((file) => file.isFile() && file.name.endsWith('.json'))
        .map(async (file) => {
          const data = await fs.promises.readFile(path.join(charactersDir, file.name), 'utf-8');
          return JSON.parse(data);
        })
    );
    return characters;
  } catch (error) {
    console.error('Error reading character files:', error);
    return [];
  }
}

export default async function Home() {
  const characters = await getCharacters();

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <nav className="bg-white w-full">
        <div className="container mx-auto py-2 max-w-4xl font-playfair text-2xl font-bold border-b-2 border-gray-200">
          BFF
        </div>
      </nav>
      <div className="container py-4 max-w-4xl w-full">
        <h1 className="mb-2 text-gray-800 font-lato font-extrabold">
          Great AI character cards, batch of 2024-04-01
        </h1>
        <div className="space-y-4 font-lato">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
}