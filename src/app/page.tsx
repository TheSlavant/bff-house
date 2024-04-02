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
    <div className="bg-white min-h-screen flex flex-col items-center mt-4">
      <nav className="bg-white w-full">
        <div className="container mx-auto py-2 max-w-4xl font-playfair text-4xl font-bold border-b-2 border-gray-200">
          BFF
        </div>
      </nav>
      <div className="container py-8 max-w-4xl w-full">
        <h1 className="mb-2 text-gray-800 font-lato font-extrabold">
          High-quality AI character cards, batch of 2024-04-01
        </h1>
        <div className="space-y-4 font-lato">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
      {/* Adjust the footer structure here */}
      <div className="container mx-auto max-w-4xl w-full">
        <footer className="flex justify-between border-t-2 border-gray-200 font-lato text-gray-400 text-sm py-4">
          <div className="font-bold text-left">
            2024 THE BFF GROUP
          </div>
          <div className="text-right">
            Feel the difference
          </div>
        </footer>
      </div>
    </div>
  );
}