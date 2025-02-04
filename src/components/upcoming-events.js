"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useEvents } from "@/context/EventsContext";

const eventImageBaseURL = process.env.NEXT_PUBLIC_EVENTS_BASE_URL;

export default function UpcomingEvents() {
    const { events, loading, error } = useEvents();
    const today = new Date();

    const upcomingEvents = events?.filter((event) => {
        const eventEndDate = new Date(event.end_date);
        return eventEndDate > today;
    });

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error loading events.</p>;

    return (
        <>
            <h2 className="text-4xl font-bold mb-12 text-center text-blue-600">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {upcomingEvents.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, zIndex: 1 }}
                        className="relative"
                    >
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
                                        <Button className="bg-blue-600 text-black hover:bg-yellow-600">Get Tickets</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </>
    );
}
