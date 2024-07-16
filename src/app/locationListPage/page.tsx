"use client";
import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/navbar/Navbar';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Card } from '@nextui-org/react';
import CardComponent from '../components/card/Card';
import { Character } from '../types/types';
import { useRouter } from 'next/navigation';

const LocationListPage = () => {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const allLocalCharacterData = JSON.parse(localStorage.getItem('characters_data') || '[]');
  const allLocations = allLocalCharacterData.flatMap((character: any) => character.locations || []);
  const uniqueLocations = Array.from(new Set(allLocations.map((location: string) => location && location.toLowerCase())))
    .filter((location) => location !== undefined);
  const uniqueLocationsCapitalized = uniqueLocations.map((location) => {
    if (typeof location === 'string') {
      return location.charAt(0).toUpperCase() + location.slice(1);
    }
    return '';
  });
  const filteredCharacters = allLocalCharacterData.filter((character: Character) => {
    return character.locations && character.locations.map((loc) => loc).includes(selectedLocation);
  });

  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location);
  };

  const cardOnClick = (character: Character) => {
    router.push(`/detailCharacterPage/${character.id}`)
  }

  return (
    <div>
      <NavbarComponent />
      <div className='flex flex-col w-full min-h-screen items-center'>
        <h1 className='font-bold text-2xl p-4'>See the Character Based on Location</h1>
        <Dropdown>
          <DropdownTrigger as={Button} variant="outline">
            <Button color="primary" variant="bordered">
              {selectedLocation ? selectedLocation : 'Select Location'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            {uniqueLocationsCapitalized.map((location, index) => (
              <DropdownItem key={index} onClick={() => handleSelectLocation(location)}>
                {location}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {selectedLocation && (
          <div className='gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4'>
            {filteredCharacters.map((character: Character) => (
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
        )}
      </div>
    </div>
  );
};

export default LocationListPage;