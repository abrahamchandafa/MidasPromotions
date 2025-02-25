"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { createIcons, icons } from "lucide"
import { Star, TrendingUp, Music, BarChart, Award, Users, Theater, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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

  const services = [
    {
      title: "Consultancy Services",
      description:
        "Expert guidance on all facets of international entertainment events, including marketing and promotional strategies.",
      icon: "lightbulb",
    },
    {
      title: "Local Production Services",
      description: "Seamless execution of concepts with professional, on-the-ground support.",
      icon: "video",
    },
    {
      title: "Artist Booking Services",
      description: "Securing top-tier talent to enhance the impact and memorability of events.",
      icon: "users",
    },
    {
      title: "Exceptional Experiences",
      description:
        "Delivering other world-class experiences such as theatre-based productions, conventions, and exhibits.",
      icon: "star",
    },
  ]

  const artists = [
    "Muse",
    "Blur",
    "Wonder Girls",
    "Chippendales",
    "Russell Peters",
    "Engelbert Humperdinck",
    "Kanye West",
    "Justin Bieber",
    "Michael Jackson",
    "Sir Elton John",
  ]

  return (
    <div className="min-h-screen bg-black text-white">
        <StarBackground />
      
        <Navigation />
        <div className="max-w-7xl w-full mx-auto px-4 pt-32 pb-20 overflow-x-hidden">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-500">ABOUT US</h1>
          <p className="text-xl md:text-2xl text-gray-400">
            The Pioneer in Concert Promotion in Asia and the Middle East
          </p>
        </motion.div>

        {/* History Section */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="bg-zinc-900/50 border-blue-500/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-blue-500">Our Legacy</h2>
              <div className="prose prose-invert max-w-none text-white">
                <p className="text-lg leading-relaxed mb-6">
                  Midas Promotions, founded in 1978 by Michael Hosking in Bahrain, is a distinguished concert promotion
                  company known for curating and delivering exceptional live music experiences throughout Asia and the
                  Middle East. With a legacy spanning decades, Midas Promotions has become a leading force in the music
                  event industry, dedicated to bringing both legendary artists and rising stars to audiences across the
                  region.
                </p>
                <p className="text-lg leading-relaxed">
                  The company's approach to concert promotion is fueled by a deep passion for connecting fans with
                  artists, facilitating unforgettable experiences that resonate long after the final note. From hosting
                  major global acts to emerging talent across various music genres, Midas Promotions has always sought
                  to curate a diverse array of events that speak to the evolving tastes of music lovers.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Artists Grid */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-500">Featured Artists</h2>
          <p className="text-gray-400 mb-8">
            A glimpse of the legendary artists who have performed under the Midas banner
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {artists.map((artist, index) => (
              <motion.div
                key={artist}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 border border-blue-500/20 rounded-lg p-4 text-center hover:bg-zinc-800/50 transition-colors"
              >
                <p className="text-lg font-medium">{artist}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-400 italic">And many more world-class artists...</p>
          </div>
        </motion.section>

        {/* More Than Gold Section */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 border-blue-500/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-blue-500">More Than Gold</h2>
              <div className="prose prose-invert max-w-none space-y-6 text-white">
                <p className="text-lg leading-relaxed">
                  Midas Promotions' established presence in key Asian cities positions the company as a true expert in
                  understanding the cultural and musical preferences of diverse audiences across the region. Their
                  extensive network and deep-rooted connections provide valuable, first-hand insights into the unique
                  tastes and energy of local music fans.
                </p>
                <p className="text-lg leading-relaxed">
                  For artists who choose to perform under the Midas banner, the experience goes beyond just the music.
                  Midas Promotions is known for offering a rich and welcoming atmosphere, ensuring that visiting artists
                  are treated with warmth and appreciation.
                </p>
                <p className="text-lg leading-relaxed">
                  By bringing together diverse groups of people for unforgettable live experiences, Midas Promotions
                  helps nurture and strengthen the cultural ties that bind communities together. This not only deepens
                  the relationship between artist and fan but also enhances the broader cultural fabric of the regions
                  they serve.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Services Section */}
        <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-8 text-blue-500">Beyond Concerts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 border border-blue-500/20 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <i data-lucide={service.icon} className="w-6 h-6 text-blue-500"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-blue-500">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
      <Footer />
    </div>
  )
}

