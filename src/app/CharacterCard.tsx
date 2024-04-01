'use client';
import React, { useState } from 'react';
import { Character } from './character';

function ExpandedContent({ character }: { character: Character }) {
  return (
    <>
      <p className="mt-2">Description: {character.description}</p>
      <p className="mt-2">Example dialogue: {character.example_dialogue}</p>
      <p className="mt-2">First message: {character.first_mes}</p>
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
        const url = URL.createObjectURL(blob); // Use URL.createObjectURL instead of window.URL.createObjectURL
        const link = document.createElement('a');
        link.href = url;
        link.download = `${character.id}.json`;
        document.body.appendChild(link); // Append the link to the document body
        link.click();
        document.body.removeChild(link); // Remove the link from the document body
        URL.revokeObjectURL(url); // Use URL.revokeObjectURL instead of window.URL.revokeObjectURL
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
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{character.name}</h2>
      <p className="mb-1">Personality: {character.personality}</p>
      <p className="mb-1">Recommended models: {character.recommended_models}</p>
      <p className="mb-1">Use cases: {character.use_cases}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        onClick={handleDownload}
      >
        Download
      </button>
      <button
        className="text-blue-500 underline"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Show More'}
      </button>
      {expanded && <ExpandedContent character={character} />}
    </div>
  );
}