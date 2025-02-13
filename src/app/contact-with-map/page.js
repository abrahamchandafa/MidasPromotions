"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { createIcons, icons } from "lucide"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false })

import Footer from "@/components/footer"
import StarBackground from "@/components/star-background"
import Navigation from "@/components/navbar"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  reason: z.string({
    required_error: "Please select a reason for contact.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

const contactReasons = [
  "Partnership and Collaboration",
  "Event Details and Concerns",
  "Internships and Job inquiries",
  "Payment Procedures",
  "Ticketing and Refund",
  "Others",
]

const locations = [
  { name: "Vietnam", lat: 14.0583, lng: 108.2772 },
  { name: "Thailand", lat: 15.87, lng: 100.9925 },
  { name: "Philippines", lat: 12.8797, lng: 121.774 },
  { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
]

// Calculate the center point of all locations
const centerLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length
const centerLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [globeReady, setGlobeReady] = useState(false)
  const globeRef = useRef()
  const [windowWidth, setWindowWidth] = useState(1024)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWidth = () => setWindowWidth(window.innerWidth);
      updateWidth(); // Set initial width
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  const width = windowWidth < 640 ? 280 : windowWidth < 1024 ? 400 : 550;
  const height = windowWidth < 640 ? 280 : windowWidth < 1024 ? 400 : 550;

  useEffect(() => {
    createIcons({ icons })
  }, [])

  // Function to center the globe
  const centerGlobe = () => {
    if (globeRef.current) {
      setTimeout(() => {
        globeRef.current.pointOfView(
          {
            lat: centerLat,
            lng: centerLng,
            altitude: 2.5,
          },
          0,
        ) // Added 0 ms transition time
      }, 100) // Small delay to ensure globe is ready
    }
  }

  useEffect(() => {
    // Initial center attempt
    centerGlobe()

    // Additional center attempts with delays
    const timer1 = setTimeout(centerGlobe, 100)
    const timer2 = setTimeout(centerGlobe, 500)
    const timer3 = setTimeout(centerGlobe, 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [globeReady])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/send_contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.reason,
          message: values.message,
        }),
      })

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
        })
        form.reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <StarBackground />
      <Navigation />
      <div className="w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] mx-auto px-4 pt-20 pb-6 sm:py-10 md:py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-gray-400 text-lg">Have a question or need assistance? We're here to help!</p>
            </motion.div>

        {/* Form & Globe Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-zinc-900 p-5 sm:p-6 md:p-8 rounded-lg border border-blue-600/20"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="bg-zinc-800 border-zinc-700" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            {...field}
                            className="bg-zinc-800 border-zinc-700"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Contact</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          {contactReasons.map((reason) => (
                            <SelectItem
                              key={reason}
                              value={reason}
                              className="text-white hover:bg-blue-600 hover:text-black transition-colors duration-200"
                            >
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can we help you?"
                          className="bg-zinc-800 border-zinc-700 min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" className="bg-blue-600 text-black hover:bg-yellow-600" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <i data-lucide="loader-2" className="mr-2 h-4 w-4 animate-spin"></i>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>

          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            // className="bg-zinc-900 rounded-lg p-4 sm:p-6 border border-blue-500/20"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-blue-500">Where We Are</h2>
            <div className="h-[280px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full flex items-center justify-center">
              {/* <Globe
                ref={globeRef}
                width={width}
                height={height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                backgroundColor="rgba(0,0,0,0)"
                labelsData={locations}
                labelLat={(d) => d.lat}
                labelLng={(d) => d.lng}
                labelText={(d) => d.name}
                labelSize={1.2}
                labelColor={() => "rgba(255, 255, 255, 1)"}
                labelAltitude={0.05}
                pointsData={locations}
                pointLat={(d) => d.lat}
                pointLng={(d) => d.lng}
                pointColor={() => "#FFFFFF"}
                pointAltitude={0.05}
                pointRadius={0.06}
                atmosphereColor="#2563EB"
                atmosphereAltitude={0.15}
                onGlobeReady={() => setGlobeReady(true)}
              /> */}
              <Image
                src="/contact map image/map.jpeg"
                alt="Location Map"
                width={width - 60}
                height={height - 50}
                className="rounded-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Contact Info Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-0"
        >
          {[
            {
              icon: "phone",
              title: "Phone",
              description: "+65 6324 2521",
            },
            {
              icon: "mail",
              title: "Email",
              description: "info@midaspromotions.com",
            },
            {
              icon: "map-pin",
              title: "Address",
              description: "123 Entertainment Drive, Singapore",
            },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 flex flex-col items-start">
              <div className="mb-2">
                <i data-lucide={item.icon} className="h-6 w-6 text-blue-600"></i>
              </div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 text-blue-400">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-300">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
            :global(nav) {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 50;
            background-color: rgba(0, 0, 0, 0.8);
            height: 90px; /* Ensures enough space for the logo */
            display: flex;
            align-items: center; /* Centers the logo vertically */
            padding: 0 1rem; /* Ensures padding inside the navbar */
            }
        }
        `}</style>

      <Toaster />
      <Footer />
    </div>
  )
}

