"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, 
         NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink 
       } from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const MotionLink = motion(Link);

const Navigation = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden md:flex items-center justify-between px-4 py-2 fixed w-full z-50 transition-all duration-300 ${
        scrolling ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
      }`}>
        <Link href="/" className="text-2xl font-bold text-yellow-500">
          <Image 
            src="/company logo/midas-logo-rmono-st_FA.png"
            width={100} 
            height={50} 
            alt="Company Logo"
          />
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-8">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <MotionLink
                  href={"/about"}
                  className="text-white-400 hover:text-blue-600 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  About Us
                </MotionLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            {/* <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <MotionLink
                  href={"/releases"}
                  className="text-white-400 hover:text-blue-600 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Releases
                </MotionLink>
              </NavigationMenuLink>
            </NavigationMenuItem> */}

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <MotionLink
                  href={"/gallery"}
                  className="text-white-400 hover:text-blue-600 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Past events
                </MotionLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <MotionLink
                  href={"/gallery-masonry-grid"}
                  className="text-white-400 hover:text-blue-600 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Past events (masonry)
                </MotionLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <MotionLink
                  href={"/contact-with-map"}
                  className="text-white-400 hover:text-blue-600 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Contact
                </MotionLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`md:hidden flex items-center justify-between px-4 py-4 fixed w-full z-50 transition-all duration-300 ${
        scrolling ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
      }`}>
        <Link href="/" className="text-xl font-bold text-yellow-500">
          <Image 
            src="/company logo/midas-logo-rmono-st_FA.png"
            width={105} 
            height={25} 
            alt="Company Logo"
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-black text-white">
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Link href="/about" className="text-lg">
                About Us
              </Link>
              {/* <Link href="/releases" className="text-lg">
                Releases
              </Link> */}
              <Link href="/gallery" className="text-lg">
                Past events
              </Link>
              <Link href="/contact-with-map" className="text-lg">
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
};

export default Navigation;
