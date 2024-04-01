'use client';
import React, { useState } from 'react';
import { Character } from './character';

function ExpandedContent({ character }: { character: Character }) {
  return (
    <>
      <div className="mt-2">
        <p className="text-gray-600">Description: {character.description}</p>
        <p className="text-gray-600">Example dialogue: {character.example_dialogue}</p>
        <p className="text-gray-600">First message: {character.first_mes}</p>
      </div>
    </>
  );
}

export default function CharacterCard({ character }: { character: Character }) {
  const [expanded, setExpanded] = useState(false);

  const handleDownload = async () => {
    console.log('Download button clicked');
    console.log('Character ID:', character.id);
    const apiUrl = `/api/characters?id=${character.id}`;
    console.log('API URL:', apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${character.id}.json`;
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link); 
        URL.revokeObjectURL(url);
      } else {
        console.error('Error downloading character:', response.status);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error calling the API:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="font-bold mb-3 text-gray-800">{character.name}</h2>
      <div className="text-gray-600">
        <p>Personality: {character.personality}</p>
        <p>Recommended models: {character.recommended_models}</p>
        <p>Use cases: {character.use_cases}</p>
      </div>
      <div className="flex items-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          onClick={handleDownload}
        >
          Download
        </button>
        <button
          className="text-blue-500 hover:text-blue-600 underline ml-2"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
      {expanded && <ExpandedContent character={character} />}
    </div>
  );
}