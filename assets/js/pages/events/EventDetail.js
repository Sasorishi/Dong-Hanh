import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import Loader from "../../components/LoaderComponent";
import { getCurrencySymbol } from "../../functions/functions";

const EventDetail = () => {
  const [tickets, setTickets] = useState(1);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleIncrement = () => {
    if (tickets < 15) {
      setTickets(tickets + 1);
    }
  };

  const handleDecrement = () => {
    if (tickets > 1) {
      setTickets(tickets - 1);
    }
  };

  const handleChange = (event) => {
    setValeur(event.target.value);
  };

  const handleRegister = () => {
    navigate(`/register/${id}/${tickets}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/events/${id}/getData`);

        if (response.status === 200) {
          const data = response.data;
          setEvent(data.event);
        } else {
          console.error("Erreur lors de requête api");
          setEvent([]);
        }
      } catch (error) {
        console.error("Erreur lors de requête api", error);
        setEvent([]);
      }
    };

    getEvent();
    setLoading(false);
  }, []);

  const currencySymbol = event?.currency
    ? getCurrencySymbol(event.currency)
    : "";

  return (
    <div className="bg-whitesmoke">
      {!loading && event ? (
        <div className="pt-6">
          {event["images"] !== null && (
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg shadow-md lg:block">
                <img
                  src="https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
                  alt="https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg shadow-md">
                  <img
                    src="https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
                    alt="https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg shadow-md">
                  <img
                    src="https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
                    alt="https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg shadow-md">
                <img
                  src="https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
                  alt="https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          )}

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <p
                id="helper-text-explanation"
                className="mt-2 text-sm text-gray-500"
              >
                {event["eventCategory"]}
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-darkblue sm:text-3xl">
                {event["name"]}
              </h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-darkblue">
                {event["price"][0]} {currencySymbol}
              </p>
              <p
                id="helper-text-explanation"
                className="mt-2 text-sm text-gray-500"
              >
                {event["currency"]}
              </p>

              <div className="max-w-full mx-auto mt-10">
                <label
                  htmlFor="bedrooms-input"
                  className="block mb-2 text-sm font-medium text-darkblue"
                >
                  Choose quantity:
                </label>
                <div className="relative flex items-center max-w-full">
                  <button
                    type="button"
                    id="decrement-button"
                    onClick={handleDecrement}
                    className="bg-gray-100 text-white hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3 text-darkblue"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id="bedrooms-input"
                    data-input-counter
                    data-input-counter-min="1"
                    data-input-counter-max="5"
                    aria-describedby="helper-text-explanation"
                    className="bg-darkblue border-x-0 border-gray-300 h-11 font-medium text-center text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6"
                    value={tickets}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                    <svg
                      className="w-2.5 h-2.5 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"
                      />
                    </svg>
                    <span className="text-white">Tickets</span>
                  </div>
                  <button
                    type="button"
                    id="increment-button"
                    onClick={handleIncrement}
                    className="bg-gray-100 text-white hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3 text-darkblue"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
                <p
                  id="helper-text-explanation"
                  className="mt-2 text-sm text-gray-500"
                >
                  Please select the number of tickets.
                </p>
              </div>

              {event && event.features ? (
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-darkblue">
                    Features
                  </h3>
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      {event.features
                        .slice(0, Math.ceil(event.features.length / 2) * 2)
                        .map((feature, index) => (
                          <div key={index} className="text-gray-400">
                            <span className="text-sm text-gray-600 lowercase">
                              • {feature}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-10">
                <h2 className="text-sm font-medium text-darkblue items-center">
                  Location
                </h2>
                <div className="mt-4 flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 my-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600 my-auto ml-5">
                    {event["place"]} - {event["location"]}
                  </span>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-darkblue">Date</h2>
                <div className="mt-4 flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 my-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                  <p className="text-sm text-gray-600 my-auto ml-5">
                    {`Start : ${event.dateStart} / End : ${event.dateEnd}`}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleRegister}
                className="mt-10 uppercase flex w-full items-center justify-center rounded-md border border-transparent bg-darkblue px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-darkblue disabled:opacity-25"
                disabled={!event["isRegistrable"]}
              >
                {!event["isRegistrable"]
                  ? "Registration closed"
                  : "get a ticket"}
              </button>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-darkblue whitespace-pre-line">
                    {event["description"]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EventDetail;
