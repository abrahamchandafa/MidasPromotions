"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createIcons, icons } from "lucide";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Footer from "@/components/footer";
import StarBackground from "@/components/star-background";
import Navigation from "@/components/navbar";

import { useEvents } from "@/context/EventsContext";

const mediaImageBaseURL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;

export default function GalleryPage() {
  const { media, mediaLoading } = useEvents();
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12); // Initial load: 10 images

  useEffect(() => {
    createIcons({ icons });
  }, []);

  if (mediaLoading) {
    return <p>Loading...</p>;
  }

  console.log(media);

  const mediaToUse = media.length > 0
    ? media.map((item) => ({
        id: item.id,
        year: new Date(item.date).getFullYear(),
        large: item.bucketImages?.large ? `${mediaImageBaseURL}${item.bucketImages.large}` : null,
        medium: item.bucketImages?.medium ? `${mediaImageBaseURL}${item.bucketImages.medium}` : null,
        small: item.bucketImages?.small ? `${mediaImageBaseURL}${item.bucketImages.small}` : null,
        alt: "Concert photo",
      }))
    : [];

  const filteredImages =
    filter === "all"
      ? mediaToUse
      : mediaToUse.filter((img) => img.year === Number(filter));

  const displayedImages = filteredImages.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-black text-white">
      <StarBackground />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-12 text-center text-blue-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Event Gallery
        </motion.h1>

        <div className="flex justify-center mb-8">
          {["all", "2019", "2020", "2021", "2022", "2023", "2024"].map((year) => (
            <Button
              key={year}
              onClick={() => {
                setFilter(year);
                setVisibleCount(12); // Reset pagination when filtering
              }}
              className={`mx-2 ${
                filter === year ? "bg-blue-500 text-black" : "bg-zinc-800 text-white"
              }`}
            >
              {year === "all" ? "All" : year}
            </Button>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {displayedImages.map((image) => (
            <motion.div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(image)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image.large || "/placeholder.svg"}
                alt={image.alt}
                width={400}
                height={300}
                className="object-cover w-full h-64"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{image.id}</h3>
                  <Badge className="bg-blue-500 text-black">{image.year}</Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {visibleCount < filteredImages.length && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setVisibleCount((prev) => prev + 10)}
              className="bg-blue-500 text-black px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Load More
            </Button>
          </div>
        )}

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-zinc-900 p-4 rounded-lg max-w-4xl w-full mx-4 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  className="absolute top-2 right-2 bg-blue-500 text-black hover:bg-blue-600"
                  onClick={() => setSelectedImage(null)}
                >
                  <i data-lucide="x" className="w-5 h-5"></i>
                </Button>
                <Image
                  src={selectedImage.large || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-blue-500 mb-2">
                    {selectedImage.id}
                  </h3>
                  <p className="text-gray-300">{selectedImage.alt}</p>
                  <Badge className="mt-2 bg-blue-500 text-black">
                    {selectedImage.year}
                  </Badge>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}
