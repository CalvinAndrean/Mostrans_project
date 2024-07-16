"use client";
import NavbarBackOnly from '@/app/components/navbar/NavbarBackOnly';
import { Character } from '@/app/types/types';
import { Image } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import React, { useEffect, useState } from 'react';

interface DetailCharacterPageProps {
  params: {
    slug: number;
  };
}

const DetailCharacterPage: React.FC<DetailCharacterPageProps> = ({ params: { slug } }) => {
  const [characterData, setCharacterData] = useState<Character>();
  const [newLocation, setNewLocation] = useState<string>('');
  const [locations, setLocations] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchData = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${slug}`);
    const jsonResponse = await response.json();
    setCharacterData(jsonResponse);
  };

  useEffect(() => {
    fetchData();
    loadLocationsFromLocalStorage();
  }, []);

  const loadLocationsFromLocalStorage = () => {
    const allLocalCharacterData = JSON.parse(localStorage.getItem('characters_data') || '[]');
    const shownCharacterData = allLocalCharacterData.find((character: Character) => character.id == slug);
    if (shownCharacterData) {
      setLocations(shownCharacterData.locations || []);
    }
  };

  const saveLocationsToLocalStorage = (updatedLocations: string[]) => {
    const allLocalCharacterData = JSON.parse(localStorage.getItem('characters_data') || '[]');
    const updatedCharacterData = allLocalCharacterData.map((character: Character) => {
      if (character.id == slug) {
        return { ...character, locations: updatedLocations };
      }
      return character;
    });
    localStorage.setItem('characters_data', JSON.stringify(updatedCharacterData));
  };

  const handleAddLocation = () => {
    if (newLocation.trim() === '') {
      setError('Location cannot be empty');
      return;
    }

    const newLocationLower = newLocation.toLowerCase();
    const isLocationExist = locations.find((location) => location.toLowerCase() === newLocationLower);
    if (isLocationExist) {
      setError('Location already exists');
      return;
    }

    const newLocationCapitalized = newLocation.charAt(0).toUpperCase() + newLocation.slice(1).toLowerCase();

    const updatedLocations = [...locations, newLocationCapitalized];
    setLocations(updatedLocations);
    saveLocationsToLocalStorage(updatedLocations);
    setNewLocation('');
    setError('');
    onClose();
  };

  return (
    <main>
      <NavbarBackOnly />
      <div className='flex w-full min-h-screen mt-[-100px] justify-center items-center'>
        <div className='flex flex-col w-[330px] p-8 border-2 border-gray-700 rounded-lg'>
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={`${characterData ? characterData.image : "https://robohash.org/200"}`}
            width={270}
          />
          <hr className='my-4 border-1 border-black' />
          <div className='flex flex-col space-y-2'>
            <h2 className='text-lg font-semibold'>Name: {characterData ? characterData.name : 'Name'}</h2>
            <p className='text-sm'>Status: {characterData ? characterData.status : 'Status'}</p>
            <p className='text-sm'>Species: {characterData ? characterData.species : 'Species'}</p>
            {characterData?.type && (
              <p className='text-sm'>Type: {characterData ? characterData.type : 'Type'}</p>
            )}
            <p className='text-sm'>Gender: {characterData ? characterData.gender : 'Gender'}</p>
            <div className='flex justify-between items-center'>
              <p className=''>Location</p>
              <button 
                className='text-sm text-white bg-blue-600 hover:bg-blue-800 px-2 py-1 rounded-lg'
                onClick={onOpen}
              >
                + Add Location
              </button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {locations.map((location, index) => (
                <div key={index} className='w-[82px] h-[30px] bg-gray-600 rounded-lg flex justify-center items-center'>
                  <p className='text-xs text-white font-semibold text-center'>{location}</p>
                </div>
              ))}
            </div>
            <Modal 
              isOpen={isOpen} 
              onClose={onClose}
              placement="top-center"
            >
              <ModalContent>
                <ModalHeader>Add Location</ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Location"
                    placeholder="Enter the location"
                    variant="bordered"
                    value={newLocation}
                    onChange={(e) => {
                      setNewLocation(e.target.value);
                      setError('');
                    }}
                    maxLength={20}
                  />
                  <div className={`flex ${error ? "justify-between" : "justify-end"}`}>
                    {error && (
                      <p className='text-red-500 text-sm'>{error}</p>
                    )}
                    <p className={`text-sm ${newLocation.length == 20 ? "text-red-600" : ""}`}>{newLocation.length}/20</p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onClick={handleAddLocation}>
                    Add
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailCharacterPage;