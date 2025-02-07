"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createIcons, icons } from "lucide";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import Footer from "@/components/footer";
import StarBackground from "@/components/star-background";
import Navigation from "@/components/navbar";

import { useEvents } from "@/context/EventsContext";

const mediaImageBaseURL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;

const YearPagination = ({ years, currentYear, onYearChange }) => {
  const currentIndex = years.indexOf(currentYear)
  const totalPages = years.length
  const showEllipsis = totalPages > 7

  const getVisibleYears = () => {
    if (totalPages <= 7) return years
    if (currentIndex < 3) return [...years.slice(0, 5), "...", years[totalPages - 1]]
    if (currentIndex > totalPages - 4) return [years[0], "...", ...years.slice(-5)]
    return [years[0], "...", ...years.slice(currentIndex - 1, currentIndex + 2), "...", years[totalPages - 1]]
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              const prevIndex = Math.max(0, currentIndex - 1)
              onYearChange(years[prevIndex])
            }}
          />
        </PaginationItem>
        {getVisibleYears().map((year, index) => (
          <PaginationItem key={index}>
            {year === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={year === currentYear}
                onClick={(e) => {
                  e.preventDefault()
                  onYearChange(year)
                }}
              >
                {year}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              const nextIndex = Math.min(totalPages - 1, currentIndex + 1)
              onYearChange(years[nextIndex])
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default function GalleryPage() {
  const { media, mediaLoading } = useEvents();
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12); // Initial load: 12 images

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

  const years = ["All", ...new Set(mediaToUse.map((img) => img.year))].sort((a, b) => b - a)


  const filteredImages =
    filter === "All"
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

        <div className="mb-12">
          <YearPagination years={years} currentYear={filter} onYearChange={setFilter} />
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
                  {/* <h3 className="text-xl font-bold text-white mb-2">{image.id}</h3> */}
                  <Badge className="bg-blue-500 text-black">{image.year}</Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {visibleCount < filteredImages.length && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setVisibleCount((prev) => prev + 12)}
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
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-zinc-900 rounded-lg relative overflow-hidden"
                style={{ width: "90vw", height: "90vh", maxWidth: "1200px", maxHeight: "800px" }}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  className="absolute top-2 right-2 bg-blue-500 text-black hover:bg-blue-600"
                  onClick={() => setSelectedImage(null)}
                >
                  {/* <i data-lucide="x" className="w-5 h-5"></i> */}
                  <X />
                </Button>
                <Image
                  src={selectedImage.large || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  layout="fill"
                  objectFit="contain"
                  className="absolute top-0 left-0 w-full h-full"
                />
                <div className="mt-4">
                  {/* <h3 className="text-2xl font-bold text-blue-500 mb-2">
                    {selectedImage.id}
                  </h3> */}
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
