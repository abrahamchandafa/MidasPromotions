"use client"

import { use } from "react";
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { createIcons, icons } from "lucide"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useEvents } from "@/context/EventsContext";
import { cleanHtml } from "@/lib/cleanHtml";

import StarBackground from "@/components/star-background"
import Navigation from "@/components/navbar"
import Footer from "@/components/footer"

const eventImageBaseURL = process.env.NEXT_PUBLIC_EVENTS_BASE_URL;

export default function EventDetails({ params }) {
    const unwrappedParams = use(params);
    const { events, loading, error } = useEvents();
    
    useEffect(() => {
        createIcons({ icons })
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white">
                <StarBackground />
                <Navigation />
                <div className="max-w-4xl mx-auto px-4 py-20">
                    <Skeleton className="w-full h-[400px] rounded-lg mb-8" />
                    <Skeleton className="w-3/4 h-12 mb-4" />
                    <div className="flex flex-wrap gap-4 mb-6">
                        {[...Array(4)].map((_, index) => (
                            <Skeleton key={index} className="w-32 h-6" />
                        ))}
                    </div>
                    {[...Array(5)].map((_, index) => (
                        <Skeleton key={index} className="w-full h-6 mb-2" />
                    ))}
                    <div className="flex justify-between items-center mt-8">
                        <Skeleton className="w-32 h-10" />
                        <Skeleton className="w-32 h-10" />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const selectedEvent = events?.find((event) => event?.id == unwrappedParams?.id);
    const cleanedDescription = cleanHtml(selectedEvent?.description);

    if(selectedEvent == null){
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-4xl font-bold mb-4 text-blue-500">Event not found</h1>
                <p className="text-xl mb-8">The event you're looking for doesn't exist or has been removed.</p>
                <Link href="/">
                    <Button className="bg-blue-500 text-black hover:bg-blue-600">
                        Return to Home
                    </Button>
                </Link>
              </motion.div>
            </div>
          )
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <StarBackground />
            <Navigation />
            
            <div className="max-w-6xl mx-auto px-4 py-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex flex-col md:flex-row gap-x-12 items-center">
                        {/* Event Image */}
                        <Image
                            src={
                                selectedEvent?.bucketImages?.large
                                    ? `${eventImageBaseURL}${selectedEvent.bucketImages.large}`
                                    : "/placeholder.svg"
                            }
                            alt={selectedEvent?.title || "Event image"}
                            width={800} 
                            height={500} 
                            className="w-full md:w-2/3 h-auto rounded-lg"
                        />

                        {/* Event Details */}
                        <div className="w-full md:w-2/3">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
                                {selectedEvent?.title}
                            </h1>
                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center text-gray-300">
                                    <i data-lucide="calendar" className="w-5 h-5 mr-2 text-blue-600"></i>
                                    <span>{selectedEvent?.date}</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <i data-lucide="clock" className="w-5 h-5 mr-2 text-blue-600"></i>
                                    <span>{selectedEvent?.time}</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <i data-lucide="map-pin" className="w-5 h-5 mr-2 text-blue-600"></i>
                                    <span>{selectedEvent?.venue?.address}</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <i data-lucide="ticket" className="w-5 h-5 mr-2 text-blue-600"></i>
                                    <span>Starting from {selectedEvent?.ticketPrice || 'TBA'}</span>
                                </div>
                            </div>
                            <div
                                className="prose prose-invert max-w-none mb-8"
                                dangerouslySetInnerHTML={{ __html: cleanedDescription }}
                            />
                            <div className="flex justify-between items-center">
                                <Link href="/">
                                    <Button
                                        variant="outline"
                                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-black"
                                    >
                                        Back to Events
                                    </Button>
                                </Link>
                                <Button className="bg-blue-600 text-black hover:bg-yellow-600">
                                    Get Tickets
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>


            <Footer />
        </div>
    );
}