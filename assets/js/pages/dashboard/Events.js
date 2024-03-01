import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/LoaderComponent";

const Events = () => {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);

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
    <section className="p-0 sm:ml-64">
      <div className="p-4 mt-16">
        <div className="rounded-lg shadow-lg">
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Event name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Year
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  events.length > 0 ? (
                    events.map((event, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {event.eventCategory}
                        </th>
                        <td className="px-6 py-4">{event.name}</td>
                        <td className="px-6 py-4">{event.year}</td>
                        <td className="px-6 py-4">{event.location}</td>
                        <td className="px-6 py-4">
                          <a
                            href={`events/${event.id}`}
                            className="font-medium text-darkblue hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-white border-b">
                      <td colSpan="4" className="px-6 py-4 text-center">
                        No events available at the moment.
                      </td>
                    </tr>
                  )
                ) : (
                  <Loader />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
