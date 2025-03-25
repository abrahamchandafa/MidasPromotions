"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { createIcons, icons } from "lucide"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import Footer from "@/components/footer"
import StarBackground from "@/components/star-background"
import Navigation from "@/components/navbar"

import { useEvents } from "@/context/EventsContext"

const eventImageBaseURL = process.env.NEXT_PUBLIC_EVENTS_BASE_URL

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
      <PaginationContent className="flex flex-wrap justify-center">
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
  <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-4 break-inside-avoid">
    <Skeleton className="h-40 w-full rounded-md" /> {/* Image Skeleton */}
    <div className="mt-4 space-y-2">
      <Skeleton className="h-6 w-3/4" /> {/* Title Skeleton */}
      <Skeleton className="h-4 w-5/6" /> {/* Description Skeleton */}
    </div>
  </div>
);

export default function GalleryPage() {
  const { events, loading } = useEvents()
  const [filter, setFilter] = useState("All")
  const [visibleCount, setVisibleCount] = useState(12)

  useEffect(() => {
    createIcons({ icons })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <StarBackground />
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-20 overflow-x-hidden">
          {/* 🔥 Masonry Grid Layout */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
        <Footer className="mt-auto" />
      </div>
    );
  }

  const eventsToUse =
    events.length > 0
      ? events
          .filter((item) => new Date(item.start_date) < new Date())
          .map((item) => ({
              id: item.id,
              title: item.title,
              start_date: new Date(item.start_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }),
              filter_year: new Date(item.start_date).getFullYear(),
              venue: item.venue.city,
              large: item.bucketImages?.large ? `${eventImageBaseURL}${item.bucketImages.large}` : null,
              alt: "Event poster",
            }))
            .sort((a, b) => b.filter_year - a.filter_year)
          : []

  const years = ["All", ...new Set(eventsToUse.map((img) => img.filter_year))].sort((a, b) => b - a)
  const filteredImages =
    filter === "All" ? eventsToUse : eventsToUse.filter((img) => img.filter_year === Number(filter))
  const displayedImages = filteredImages.slice(0, visibleCount)

  return (
    <div className="min-h-screen bg-black text-white">
      <StarBackground />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 pt-32 pb-20">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 text-center text-blue-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Event Posters
        </motion.h1>

        <div className="mb-8 sm:mb-12 overflow-x-auto">
          <YearPagination years={years} currentYear={filter} onYearChange={setFilter} />
        </div>

        <motion.div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {displayedImages.map((event) => (
            <motion.div key={event.id} className="break-inside-avoid mb-4">
              <div className="relative w-full overflow-hidden rounded-lg">
                <Image
                  src={event.large || "/placeholder.svg"}
                  alt={event.title}
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="mt-2">
                <h2 className="text-lg sm:text-xl font-bold text-blue-300">{event.title}</h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  {event.start_date} • {event.venue}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {visibleCount < filteredImages.length && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="bg-blue-500 text-black px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-blue-600 transition"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

