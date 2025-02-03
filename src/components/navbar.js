import Link from "next/link";
import Image from "next/image";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { motion, useScroll } from "framer-motion";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";


const MotionLink = motion(Link)

const Navigation = () => {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between px-8 py-4 fixed w-full z-50 bg-transparent">
        <Link href="/" className="text-2xl font-bold text-yellow-500">
          <Image 
            src="/company logo/logo_2-removebg-preview.png"
            width={100} 
            height={50} 
            alt="Company Logo"
          />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white bg-transparent focus:ring-0 focus:outline-none">
                WHO WE ARE 
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] bg-black/90 backdrop-blur-sm">
                  <NavigationMenuLink asChild>
                    <MotionLink
                      href="#"
                      className="text-white hover:text-yellow-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      About Us
                    </MotionLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <MotionLink
                      href="#"
                      className="text-white hover:text-yellow-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Our Leadership
                    </MotionLink>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">
                EVENTS
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] bg-black/90 backdrop-blur-sm">
                  <NavigationMenuLink asChild>
                    <MotionLink
                      href="#"
                      className="text-white hover:text-yellow-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Upcoming Shows
                    </MotionLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <MotionLink
                      href="#"
                      className="text-white hover:text-yellow-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Past Events
                    </MotionLink>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-between px-4 py-4 fixed w-full z-50 bg-transparent">
        <Link href="/" className="text-xl font-bold text-yellow-500">
          MIDAS PROMOTIONS
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
              <Link href="#" className="text-lg">
                Who We Are
              </Link>
              <Link href="#" className="text-lg">
                Events
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
};

export default Navigation;
