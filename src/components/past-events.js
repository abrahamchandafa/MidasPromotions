"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useEvents } from "@/context/EventsContext";

export default function PastEventsList() {

  const { events, loading, error } = useEvents();

  const today = new Date();

  const pastEvents = events?.filter((event) => {
    const eventEndDate = new Date(event.end_date);
    return eventEndDate < today
  })

  // const events = [
  //   { name: "Summer Beats Festival", artist: "A-Trak", date: "2024", slug: "summer-beats-a-trak" },
  //   { name: "Bass Revolution", artist: "Adam Hall", date: "2024", slug: "bass-revolution" },
  //   { name: "Sonic Waves", artist: "Alan Barnes", date: "2024", slug: "sonic-waves" },
  //   { name: "Electric Dreams", artist: "Alec Benjamin", date: "2024", slug: "electric-dreams" },
  //   { name: "Rhythm Nation", artist: "Alexis Rawkin", date: "2024", slug: "rhythm-nation" },
  //   { name: "Beat Connection", artist: "AlexTBH", date: "2024", slug: "beat-connection" },
  //   { name: "Sound Safari", artist: "Allen Stone", date: "2024", slug: "sound-safari" },
  //   { name: "Groove Garden", artist: "AlunaGeorge", date: "2024", slug: "groove-garden" },
  //   { name: "Bass Drop", artist: "Anderson Paak", date: "2024", slug: "bass-drop" },
  //   { name: "Electronic Empire", artist: "Ari Lennox", date: "2024", slug: "electronic-empire" },
  //   { name: "Future Fusion", artist: "Art Department", date: "2024", slug: "future-fusion" },
  //   { name: "Digital Dreams", artist: "Arthur Baker", date: "2024", slug: "digital-dreams" },
  //   { name: "Neon Nights", artist: "ASAP Mob", date: "2024", slug: "neon-nights" },
  //   { name: "Pulse Festival", artist: "Electrokat", date: "2024", slug: "pulse-festival" },
  //   { name: "Wave Riders", artist: "Eli & Fur", date: "2024", slug: "wave-riders" },
  //   { name: "Bass Brigade", artist: "Ellie Goulding", date: "2024", slug: "bass-brigade" },
  //   { name: "Sound Summit", artist: "Enrico Rava", date: "2024", slug: "sound-summit" },
  //   { name: "Rhythm Rush", artist: "Esperanza Spalding", date: "2024", slug: "rhythm-rush" },
  //   { name: "Beat Blast", artist: "Estelle", date: "2024", slug: "beat-blast" },
  //   { name: "Sonic Sphere", artist: "Eve Speciall", date: "2024", slug: "sonic-sphere" },
  // ];

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
      <motion.p
        className="text-sm text-gray-400 group-hover:text-black relative z-10"
        variants={{
          initial: { y: 30, opacity: 0 },
          hover: { y: -30, opacity: 1 },
        }}
      >
        Wait till you see our past events...
      </motion.p>
      }
    </div>
  );
}
