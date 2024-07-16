import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

interface CardComponentProps {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  onClick: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ name, status, species, type, gender, image, onClick }) => {
  return (
    <Card 
      className="py-4 rounded-lg border-2 border-slate-800 hover:shadow-lg transition-shadow cursor-pointer relative overflow-hidden"
      isPressable
      onPress={onClick}
    >
      <div className="absolute inset-0 bg-transparent hover:bg-gray-100 transition-colors duration-300"></div>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`${image ? image : "https://robohash.org/200"}`}
          width={270}
        />
      </CardHeader>
      <CardBody className="overflow-visible p-4 items-start">
        <div className="flex justify-between w-full">
          <p className="text-tiny uppercase font-bold w-[75%] text-left">{species ? species : "Species"}</p>
          <small className="text-default-500 flex items-center">{status ? status : "Status"}</small>
        </div>
        <h4 className="font-bold text-large">{name ? name : "Name"}</h4>
        <p>{gender ? gender : "Gender"}</p>
        {type && <p className="w-[80%] text-left italic">{type}</p>}
      </CardBody>
    </Card>
  );
}

export default CardComponent;