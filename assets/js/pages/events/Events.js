import React, { useEffect, useState } from "react";
import axios from "../../../api";
import EventCard from "../../components/events/EventCardComponent";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get("/api/events/getEvents");

        if (response.status === 200) {
          const data = response.data;
          setEvents(data.events);
          console.log(data.events);
        } else {
          console.error("Erreur lors de requête api");
          setEvents([]);
        }
      } catch (error) {
        console.error("Erreur lors de requête api", error);
        setEvents([]);
      }
    };

    getEvents();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple no-tricks pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
            quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.
          </p>
        </div>
        {events ? (
          events.map((event, index) => <EventCard key={index} event={event} />)
        ) : (
          <div className="mx-auto max-w-2xl sm:text-center mt-12">
            <p>No events available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
