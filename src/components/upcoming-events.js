"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, Ticket, CalendarRange } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"

import { useEvents } from "@/context/EventsContext";

const eventImageBaseURL = process.env.NEXT_PUBLIC_EVENTS_BASE_URL;

export default function UpcomingEvents() {
    const { events, loading, error } = useEvents();
    const today = new Date();

    const upcomingEvents = events?.filter((event) => {
        const eventEndDate = new Date(event.end_date);
        return eventEndDate > today;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="p-4 border border-gray-700 rounded-lg shadow-md w-full">
                            {/* Image Skeleton */}
                            <Skeleton className="w-full h-48 rounded-lg mb-4" />
                            
                            {/* Title Skeleton */}
                            <Skeleton className="w-3/4 h-6 mb-3" />
    
                            {/* Meta Info Skeleton */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Skeleton className="w-1/3 h-5" />
                                <Skeleton className="w-1/4 h-5" />
                            </div>
    
                            {/* Button Skeletons */}
                            <div className="flex justify-between">
                                <Skeleton className="w-24 h-10 rounded" />
                                <Skeleton className="w-24 h-10 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    if (error) return <p>Error loading events.</p>;

    return (
        <>
            <h2 className="text-4xl font-bold mb-12 text-center text-blue-600">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, zIndex: 1 }}
                        className="relative"
                    >
                        <Link href={`/events/${event.id}`}>
                            <Card className="bg-zinc-800 border-2 border-blue-600 overflow-hidden h-full shadow-lg shadow-blue-600/20">
                                <CardContent className="p-0 flex flex-col h-full">
                                    <div className="relative h-48">
                                        <Image 
                                            src={`${eventImageBaseURL}${event.bucketImages.large}`} 
                                            alt={event.title} 
                                            fill 
                                            className="object-cover" 
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold mb-2 text-blue-600">{event.title}</h3>
                                        <div className="flex items-center text-sm text-gray-300 mb-2">
                                            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                                            <span>{new Date(event.start_date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-300 mb-2">
                                            <Clock className="w-4 h-4 mr-2 text-blue-600" />
                                            <span>{new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-300 mb-4">
                                            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                                            <span>{event.venue?.city}, {event.venue?.country}</span>
                                        </div>
                                        <p className="text-gray-300 mb-4 flex-grow" dangerouslySetInnerHTML={{ __html: event.description.slice(0, 100) + '...' }} />
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center text-blue-600">
                                                <Ticket className="w-5 h-5 mr-2" />
                                                <span className="font-bold">TBC</span>
                                            </div>
                                            <Button className="bg-blue-600 text-black hover:bg-yellow-600">View</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                )) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="col-span-full text-center"
                        >
                        <p className="text-2xl text-blue-500 font-semibold">More events are coming up... stay tuned!</p>
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                            className="mt-8"
                        >
                            <CalendarRange className="w-16 h-16 mx-auto text-blue-500"/>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </>
    );
}
