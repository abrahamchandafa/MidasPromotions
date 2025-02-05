"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { createIcons, icons } from "lucide"
import { Star, TrendingUp, Music, BarChart, Award, Users, Theater, Globe } from "lucide-react"

import Footer from "@/components/footer"
import StarBackground from "@/components/star-background"
import Navigation from "@/components/navbar"

export default function AboutPage() {
  useEffect(() => {
    createIcons({ icons })
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <div className="min-h-screen bg-black text-white">
        <StarBackground />
      
        <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-12 text-center text-blue-600"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          The Midas Story
        </motion.h1>

        <div className="space-y-24">
          {[
            {
              title: "The Beginning",
              content:
                "Midas Promotions was founded by Michael Hosking in Bahrain in 1978, marking the start of a journey that would reshape the entertainment landscape across Asia and the Middle East.",
              year: "1978",
              icon: Star,
            },
            {
              title: "Expanding Horizons",
              content:
                "Over 40 years, Midas has grown into one of the leading international events companies in Asia and the Middle East. We've promoted global icons like Michael Jackson, Taylor Swift, and Sir Elton John, while also producing world-class corporate events.",
              year: "1980s-2000s",
              icon: TrendingUp,
            },
            {
              title: "SINGfest Launch",
              content:
                "In 2007, we launched SINGfest, Singapore's premier music festival. The 2008 and 2010 editions featured international stars like Jason Mraz, Alicia Keys, Katy Perry, and Kanye West, cementing our reputation for bringing world-class entertainment to Asia.",
              year: "2007",
              icon: Music,
            },
            {
              title: "Continued Growth",
              content:
                "Our portfolio expanded to include more diverse acts: Robbie Williams, Take That, Rod Stewart, Christina Perri, Russell Peters, Swedish House Mafia, and many more. Each show reinforced our position as a leading promoter in the region.",
              year: "2010s",
              icon: BarChart,
            },
            {
              title: "Recent Achievements",
              content:
                "We've continued to bring top-tier talent to Asia, including Charlie Puth, Selena Gomez, and Sam Smith. Even post-COVID, we've successfully promoted shows for The Script and Simple Plan across the region.",
              year: "2016-Present",
              icon: Award,
            },
            {
              title: "MLTR Management",
              content:
                "We manage and book shows for Michael Learns To Rock (MLTR) outside Europe and the US. Recent tours have seen audiences exceeding 100,000 in India alone.",
              year: "Ongoing",
              icon: Users,
            },
            {
              title: "Diverse Expertise",
              content:
                "Beyond concerts, we promote theatre productions and offer consulting services in talent procurement, marketing, and promotion strategies for the live international entertainment market.",
              year: "Present",
              icon: Theater,
            },
            {
              title: "Global Reach",
              content:
                "Today, Midas Promotions works with strategic partners throughout Asia and the Middle East, continuing to bring unforgettable live experiences to audiences across the region.",
              year: "Present & Future",
              icon: Globe,
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              className="relative flex items-start"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="mr-8 mt-1">
                <section.icon className="w-12 h-12 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 text-blue-600">{section.title}</h2>
                <p className="text-lg mb-2 text-blue-300">{section.year}</p>
                <p className="text-gray-300">{section.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

