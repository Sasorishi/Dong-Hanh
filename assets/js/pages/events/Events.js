import React, { useEffect, useState } from "react";
import axios from "../../../api";
import EventCard from "../../components/events/EventCardComponent";
import Loader from "../../components/LoaderComponent";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get("/api/events/getEvents");

        if (response.status === 200) {
          const data = response.data;
          setEvents(data.events);
        } else {
          console.error("Erreur lors de requête api");
          setEvents([]);
        }
      } catch (error) {
        console.error("Erreur lors de requête api", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  return (
    <div className="bg-whitesmoke py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-1xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore Diverse Community, Social, and Educational Events
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Immerse yourself in a vibrant community that celebrates diversity
            through a rich tapestry of events. Our platform is a hub of
            meaningful experiences. Join us for engaging sessions where you can
            connect with others, expand your knowledge, and contribute to the
            collective growth. Every event is an opportunity to participate in
            something extraordinary.
          </p>
        </div>
        {!loading ? (
          events ? (
            events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))
          ) : (
            <div className="mx-auto max-w-2xl sm:text-center mt-12">
              <p>No events available at the moment.</p>
            </div>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Events;
