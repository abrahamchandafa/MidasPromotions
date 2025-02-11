"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  Ticket,
  Music,
  Globe,
} from "lucide-react"
import { createIcons, icons } from "lucide";
import VideoHero from "@/components/video-hero"
import StarBackground from "@/components/star-background"
import Navigation from "@/components/navbar"
import Footer from "@/components/footer"
import PastEventsList from "@/components/past-events";
import UpcomingEvents from "@/components/upcoming-events"

// all events context
import { useEvents } from "@/context/EventsContext"

const MotionLink = motion(Link);

export default function Home() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    createIcons({ icons })
  }, [])

  const { events, loading, error } = useEvents();

  console.log(events);

  return (
    <div className="min-h-screen bg-black text-white" ref={targetRef}>
      <StarBackground />
      
      <Navigation />

      {/* Hero Section with Video */}
      <section className="relative h-screen">
        <VideoHero />
        <div className="relative min-h-screen bg-transparent overflow-hidden">
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-white">
            {/* Main heading with staggered animation */}
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-wider text-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="block transform hover:scale-105 transition-transform duration-300 text-zinc-100">
                CREATING
              </span>
              <span className="block transform hover:scale-105 transition-transform duration-300 text-blue-600">
                UNFORGETTABLE
              </span>
              <span className="block transform hover:scale-105 transition-transform duration-300 text-zinc-100">
                LIVE EXPERIENCES
              </span>
            </motion.h1>
            
            {/* Subheading with fade-in animation */}
            <motion.p 
              className="text-lg md:text-xl text-zinc-400 font-light text-center max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Your premier entertainment partner in Asia
            </motion.p>
            
            {/* Animated underline effect */}
            <motion.div
              className="w-16 h-1 bg-blue-600 mt-6"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </div>
        </div>

      </section>

      {/* Featured Events Section */}
      <motion.section
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-zinc-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="upcoming-events"
      >
        <UpcomingEvents />
      </motion.section>

      {/* Past Events */}
      {/* <motion.section
        className="py-20 px-4 md:px-8 bg-zinc-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="past-events"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-blue-600">Past Events</h2>
          <PastEventsList />
        </div>
      </motion.section> */}

      {/* Stats Section */}
      <motion.section
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-zinc-900 to-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-blue-600">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "100+", label: "Events Produced", icon: Music },
              { number: "2.5M+", label: "Tickets Sold", icon: Ticket },
              { number: "10+", label: "Asian Countries", icon: Globe },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  className="inline-block mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: index * 0.2 }}
                >
                  <stat.icon className="w-12 h-12 text-blue-600" />
                </motion.div>
                <motion.h3
                  className="text-4xl md:text-5xl font-bold mb-2 text-white"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: index * 0.2 + 0.1 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

