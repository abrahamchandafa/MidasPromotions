'use client'

import { createContext, useState, useEffect, useContext } from "react";

const EventsContext = createContext();

export function EventProvider({ children}){
    const [ events, setEvents ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

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

    return (
        <EventsContext.Provider value={{ events, loading, error}}>
            { children }
        </EventsContext.Provider>
    );
}

export function useEvents() {
    return useContext(EventsContext);
}