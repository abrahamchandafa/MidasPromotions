"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"
import { useEvents } from "@/context/EventsContext";

export default function PastEventsList() {

  const { events, loading, error } = useEvents();

  const today = new Date();

  const pastEvents = events?.filter((event) => {
    const eventEndDate = new Date(event.end_date);
    return eventEndDate < today
  })

  if(loading){
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 w-full max-w-4xl">
              {[...Array(48)].map((_, index) => (
                  <Skeleton key={index} className="h-6 w-full rounded mb-8" />
              ))}
          </div>
      </div>
  );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-6 max-w-7xl mx-auto px-4">
      {(pastEvents && pastEvents.length > 0 ) ? 
          pastEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Link href={`/events/${event.slug}`} className="block group">
                <motion.div className="relative overflow-hidden" whileHover="hover" initial="initial" animate="initial">
                  <motion.div
                    variants={{
                      initial: { y: "100%" },
                      hover: { y: 0 },
                    }}
                    transition={{ type: "tween", ease: "easeInOut" }}
                    className="absolute inset-0 bg-blue-600 z-0"
                  />
                  <motion.h3
                    className="text-lg font-medium relative z-10 group-hover:text-black transition-colors duration-300"
                    variants={{
                      initial: { y: 0 },
                      hover: { y: -30 },
                    }}
                  >
                    {event.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm text-gray-400 group-hover:text-black relative z-10"
                    variants={{
                      initial: { y: 30, opacity: 0 },
                      hover: { y: -30, opacity: 1 },
                    }}
                  >
                    {event.venue.address}
                  </motion.p>
                </motion.div>
              </Link>
            </motion.div>
      )) : 
        null
        // <motion.p
        //   className="text-sm text-gray-400 group-hover:text-black relative z-10"
        //   variants={{
        //     initial: { y: 30, opacity: 0 },
        //     hover: { y: -30, opacity: 1 },
        //   }}
        // >
        //   Wait till you see our past events...
        // </motion.p>
      }
    </div>
  );
}
