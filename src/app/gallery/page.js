"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createIcons, icons } from "lucide";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

const eventImageBaseURL = process.env.NEXT_PUBLIC_EVENTS_BASE_URL;

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

const SkeletonCard = () => (
  <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
    <Skeleton className="h-40 w-full rounded-md" /> {/* Image Skeleton */}
    <div className="mt-4 space-y-2">
      <Skeleton className="h-6 w-3/4" /> {/* Title Skeleton */}
      <Skeleton className="h-4 w-5/6" /> {/* Description Skeleton */}
    </div>
  </div>
);

export default function GalleryPage() {
  const { events, loading } = useEvents();
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12); // Initial load: 12 images

  useEffect(() => {
    createIcons({ icons });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <StarBackground />
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-20 overflow-x-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
        <Footer className="mt-auto" />
      </div>
    );
  }

  const eventsToUse = events.length > 0
    ? events.map((item) => ({
        id: item.id,
        title: item.title,
        start_date: new Date(item.start_date).toLocaleDateString('en-GB', { 
          day: '2-digit', 
          month: 'long', 
          year: 'numeric' 
        }),
        filter_year: new Date(item.start_date).getFullYear(),
        venue: item.venue.city,
        large: item.bucketImages?.large ? `${eventImageBaseURL}${item.bucketImages.large}` : null,
        medium: item.bucketImages?.medium ? `${eventImageBaseURL}${item.bucketImages.medium}` : null,
        small: item.bucketImages?.small ? `${eventImageBaseURL}${item.bucketImages.small}` : null,
        alt: "Concert photo",
      }))
    : [];

  const years = ["All", ...new Set(eventsToUse.map((img) => img.filter_year))].sort((a, b) => b - a)


  const filteredImages =
    filter === "All"
      ? eventsToUse
      : eventsToUse.filter((img) => img.filter_year === Number(filter));

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
          Event Posters
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
          {displayedImages.map((event, index) => (
            <motion.div
              key={event.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group cursor-pointer overflow-hidden"
              // onClick={() => setSelectedEvent(event)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={event.large || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold mb-2 text-blue-300">{event.title}</h2>
                {/* <p className="text-lg font-semibold mb-2">
                  {event.subtitle} <span className="text-white">{event.details}</span>
                </p> */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <p>{event.start_date}</p>
                  <p>{event.venue}</p>
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


      </div>
      <Footer className="mt-auto" />
    </div>
  );
}
