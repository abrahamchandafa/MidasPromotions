'use client'

import { createContext, useState, useEffect, useContext } from "react";

const EventsContext = createContext();

export function EventProvider({ children}){
    const [ events, setEvents ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const [ media, setMedia ] = useState([]);
    const [ mediaLoading, setMediaLoading ] = useState(true);
    const [ mediaError, setMediaError ] = useState(null);

    // get all event metadata
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/all_events");
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setEvents(data.events);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    // get all media metadata
    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await fetch("/api/all_media");
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setMedia(data);
            } catch (error) {
                setMediaError(error);
            } finally {
                setMediaLoading(false);
            }
        }

        fetchMedia();
    }, []);

    return (
        <EventsContext.Provider value={{ events, loading, error, media, mediaLoading, mediaError}}>
            { children }
        </EventsContext.Provider>
    );
}

export function useEvents() {
    return useContext(EventsContext);
}