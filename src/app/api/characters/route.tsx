import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const characterId = searchParams.get('id');

    if (!characterId) {
      return new Response('Character ID not provided', { status: 400 });
    }

    const characterPath = path.join(process.cwd(), 'src/app/characters', `${characterId}.json`);

    console.log('Character path:', characterPath);

    try {
      const characterData = await fs.promises.readFile(characterPath, 'utf-8');
      return new Response(characterData, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${characterId}.json"`,
        },
      });
    } catch (error) {
      console.error('Error reading character file:', error);
      return new Response('Character not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}