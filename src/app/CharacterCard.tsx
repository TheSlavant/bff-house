'use client';
import React, { useState } from 'react';
import { Character } from './character';

function ExpandedContent({ character }: { character: Character }) {
  return (
    <>
      <div className="mt-4 font-lato text-sm">
        <p className="text-gray-600"><b>Description:</b> {character.description}</p>
        <p className="text-gray-600"><b>Example dialogue:</b> {character.example_dialogue}</p>
        <p className="text-gray-600"><b>First message:</b> {character.first_mes}</p>
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
    <div className="bg-white border border-gray-800 rounded-none p-4 mb-4 flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-between flex-grow">
          <h2 className="font-bold font-lato font-extrabold text-gray-800 mb-2">{character.name}</h2>
          <div className="text-gray-600 font-lato text-sm">
            <p><b>Creator:</b> {character.creator}</p>
            <p><b>Personality:</b> {character.personality}</p>
            <p><b>Character:</b> {character.char_details}</p>
            <p><b>Use cases:</b> {character.use_cases}</p>
            <p><b>Recommended models:</b> {character.recommended_models}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            className="bg-blue-600 hover:bg-black border border-gray-800 text-white font-bold font-lato text-sm py-0.5 px-2 rounded-none transition duration-150 ease-in-out w-full text-center"
            onClick={handleDownload}
          >
            DOWNLOAD
          </button>
          <button
            className={`bg-red-600 ${character.creator_link ? 'hover:bg-black' : 'opacity-50'} border border-gray-800 text-white font-bold font-lato text-sm py-0.5 px-2 rounded-none transition duration-150 ease-in-out w-full text-center`}
            onClick={() => character.creator_link && window.open(character.creator_link)}
            disabled={!character.creator_link}
          >
            CREATOR
          </button>
          <div className="flex-grow"></div> {/* This div pushes the buttons to the bottom */}
          <button
              className="bg-gray-100 hover:bg-black border border-gray-800 text-gray-800 hover:text-white font-bold font-lato text-sm py-0.5 px-2 rounded-none transition duration-150 ease-in-out"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'hide details' : 'show details'}
            </button>
        </div>
      </div>
      {expanded && <ExpandedContent character={character} />}
    </div>
  );  
}
