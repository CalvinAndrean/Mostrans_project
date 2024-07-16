import Image from "next/image";
import CardComponent from "./components/card/Card";
import CharacterListPage from "./characterListPage/page";
import NavbarComponent from "./components/navbar/Navbar";
import {NextUIProvider} from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <NavbarComponent />
      <CharacterListPage />
    </NextUIProvider>
  );
}
