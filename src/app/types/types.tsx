export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  locations: string[];
}

export type CharacterList = {
  characters: Character[];
}