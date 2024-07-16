"use client"
import React, { useEffect, useState } from 'react'
import CardComponent from '../components/card/Card';
import { Character, CharacterList } from '../types/types';
import { useRouter } from 'next/navigation';

const CharacterListPage = () => {
  const [characterData, setCharacterData] = useState<Character[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const responseCharacter = await fetch('https://rickandmortyapi.com/api/character');
      const jsonResponseCharacter = await responseCharacter.json();
      setCharacterData(jsonResponseCharacter.results);

      if(localStorage.getItem('characters_data') === null) {
        const savedCharacterData = jsonResponseCharacter.results.map((character: Character) => {
          return {
            id: character.id,
            name: character.name,
            status: character.status,
            species: character.species,
            type: character.type,
            image: character.image,
            gender: character.gender,
            location: []
          }
        });
        localStorage.setItem('characters_data', JSON.stringify(savedCharacterData));
      }
    };

    fetchData();
  }, []);

  const cardOnClick = (character: Character) => {
    router.push(`/detailCharacterPage/${character.id}`)
  }

  return (
    <main className='flex flex-col w-full min-h-screen items-center'>
      <h1 className='font-bold text-2xl p-4'>Rick and Morty's Collection Card</h1>
      <div className='gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4'>
        {characterData.map((character) => (
          <CardComponent
            key={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            type={character.type}
            gender={character.gender}
            image={character.image}
            onClick={() => cardOnClick(character)}
          />
        ))}
      </div>
    </main>
  )
}

export default CharacterListPage;