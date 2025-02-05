"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { createIcons, icons } from "lucide"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import Footer from "@/components/footer"
import StarBackground from "@/components/star-background"
import Navigation from "@/components/navbar"

// all events context
import { useEvents } from "@/context/EventsContext"

const eventImageBaseURL = process.env.NEXT_PUBLIC_EVENTS_BASE_URL;

const TruncatedTitle = ({ title }) => {
    const [isTruncated, setIsTruncated] = useState(false)
    const titleRef = useRef(null)
  
    useEffect(() => {
      const checkTruncation = () => {
        if (titleRef.current) {
          setIsTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth)
        }
      }
  
      checkTruncation()
      window.addEventListener("resize", checkTruncation)
  
      return () => window.removeEventListener("resize", checkTruncation)
    }, []) // Removed unnecessary dependency: title
  
    return (
      <div className="relative group">
        <h2 ref={titleRef} className="text-xl font-bold mb-2 text-blue-500 truncate" title={isTruncated ? title : ""}>
          {title}
        </h2>
        {isTruncated && (
          <div className="absolute z-10 w-full p-2 bg-zinc-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
            {title}
          </div>
        )}
      </div>
    )
  }

export default function EventReleasesPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { events, loading, error } = useEvents();

  useEffect(() => {
    createIcons({ icons })
  }, [])

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const releaseEvents = events.filter(event => event.releaseEvent);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <StarBackground />
      <Navigation />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-12 text-center text-blue-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Upcoming Event Releases
          </motion.h1>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-80 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {releaseEvents.map((event, index) => (
                    <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300"
                    >
                    <div className="relative h-48 cursor-pointer" onClick={() => handleEventClick(event)}>
                        <Image
                        src={`${eventImageBaseURL}${event.bucketImages.large}`}
                        alt={event.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute top-2 right-2">
                        <Badge className="bg-blue-500 text-black">{event.genre || 'release'}</Badge>
                        </div>
                    </div>
                    <div className="p-4">
                        <TruncatedTitle title={event.title} />
                        {/* <h2 className="text-xl font-bold mb-2 text-blue-500">{event.title}</h2> */}
                        <p className="text-sm mb-2 text-gray-300">{event.timezone || 'human'}</p>
                        <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{event.date}</span>
                        <Button
                            size="sm"
                            className="bg-blue-500 text-black hover:bg-blue-600"
                            onClick={() => handleEventClick(event)}
                        >
                            Details
                        </Button>
                        </div>
                    </div>
                    </motion.div>
                ))}
            </div>
          )}

          <AnimatePresence>
            {selectedEvent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                onClick={() => setSelectedEvent(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-zinc-900 p-8 rounded-lg max-w-2xl w-full mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-3xl font-bold mb-4 text-blue-500">{selectedEvent.title}</h2>
                  <p className="text-xl mb-4 truncate">{selectedEvent.artist || selectedEvent.venue?.city}</p>
                  <p className="mb-4 truncate" dangerouslySetInnerHTML={{ __html: selectedEvent.description }}></p>
                  <div className="flex items-center justify-between mb-6">
                    <Badge className="bg-blue-500 text-black">{selectedEvent.genre || 'Event'}</Badge>
                    <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-black"
                      onClick={() => setSelectedEvent(null)}
                    >
                      Close
                    </Button>
                    <Link href={`/events/${selectedEvent.id}`}>
                      <Button className="bg-blue-500 text-black hover:bg-blue-600">More Details</Button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  )
}
