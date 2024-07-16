"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation';

export default function NavbarBackOnly() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="" justify="start">
        <NavbarItem>
          <Link 
            onPress={() => router.back()}
          >
            <p className="text-lg hover:cursor-pointer">{'< Back'}</p>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="center">
        <h1 className="text-xl font-bold">Detail Character</h1>
      </NavbarContent>

      <NavbarContent justify="end">
      </NavbarContent>
    </Navbar>
  );
}