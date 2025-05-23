"use client";

import { useRef, useEffect } from "react"
import { motion } from "framer-motion";
import { createIcons, icons } from "lucide";
import Link from "next/link";
import Image from "next/image";

const MotionLink = motion(Link);

export default function Footer() {
    useEffect(() => {
        createIcons({ icons })
      }, [])

    return (
        <footer className="bg-zinc-900 py-12 px-4 md:px-8 mt-auto">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
                <Link href="/" className="text-xl font-bold text-blue-500">
                    <Image 
                        src="/company logo/midas-logo-rmono-st_FA.png"
                        width={105} 
                        height={25} 
                        alt="Company Logo"
                    />
                </Link>
                <p className="text-gray-400">Asia's leading live entertainment company</p>
            </div>
          <div key={0}>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li key={0}>
                <MotionLink
                  href="/about"
                  className="text-gray-400 hover:text-blue-500 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  About Us
                </MotionLink>
              </li>
              {/* <li key={1}>
                <MotionLink
                  href="/releases"
                  className="text-gray-400 hover:text-blue-500 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Releases
                </MotionLink>
              </li> */}
              {/* <li key={2}>
                <MotionLink
                  href="/gallery"
                  className="text-gray-400 hover:text-blue-500 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Gallery
                </MotionLink>
              </li> */}
              <li key={3}>
                <MotionLink
                  href="/contact-with-map"
                  className="text-gray-400 hover:text-blue-500 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Contact
                </MotionLink>
              </li>
            </ul>
          </div>
            {[
                {
                title: "Events",
                links: [
                    { name: "Upcoming Shows", url: "/#upcoming-events" },
                    { name: "Past Events", url: "/gallery-masonry-grid" },
                    // { name: "Venues", url: "#" },
                  ],
                },
                {
                title: "Connect",
                links: [
                    { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/midaspromotions" },
                    { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/midaspromotions/#" },
                    { name: "Twitter", icon: "twitter", url: "https://x.com/midaspromotions" },
                    { name: "Youtube", icon: "youtube", url: "https://www.youtube.com/@MidasPromotionsAsiaTV" },
                ],
                },
            ].map((section, index) => (
                <div key={index}>
                <h4 className="font-bold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                    {section.links.map((link, i) => (
                    <li key={i}>
                        <MotionLink
                            href={link.url || "#"}
                            className="text-gray-400 hover:text-blue-600 flex items-center gap-2"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                        {typeof link === "object" && link.icon && <i data-lucide={link.icon} className="h-4 w-4"></i>}
                        {typeof link === "string" ? link : link.name}
                        </MotionLink>
                    </li>
                    ))}
                </ul>
                </div>
            ))}
            </div>
        </footer>
    )

}