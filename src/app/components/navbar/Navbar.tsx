"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation';

export default function NavbarComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: "Character List", path: "/" },
    { label: "Location List", path: "/locationListPage" },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    setIsMenuOpen(false); // Close the menu after navigation
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">CALVIN.</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index} isActive={isActive(item.path)}>
            <Link 
              onPress={() => handleMenuItemClick(item.path)} 
              aria-current={isActive(item.path) ? "page" : undefined}
              color={isActive(item.path) ? "primary" : "foreground"}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            {/* <Link
              color={index === 0 ? "primary" : index === 1 ? "danger" : "foreground"}
              className="w-full"
              href={item.path}
              onClick={() => setIsMenuOpen(false)} // Close the menu after navigation
            >
              {item.label}
            </Link> */}
            <Link
              color={isActive(item.path) ? "primary" : "foreground"}
              onPress={() => {
                handleMenuItemClick(item.path);
                setIsMenuOpen(false);
              }} 
              aria-current={isActive(item.path) ? "page" : undefined}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}