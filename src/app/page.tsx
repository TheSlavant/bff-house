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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Character Cards</h1>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}