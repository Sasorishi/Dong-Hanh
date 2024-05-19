import React, { useState, useEffect } from "react";
import Connection from "@icons/connection.svg";
import SmallEventCard from "@components/events/SmallEventCardComponent";
import axios from "axios";

const IntroductionSection = () => {
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get("/api/events/getNearestEvent");

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
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  return (
    <div className="bg-hero">
      <div className="bg-trong">
        <section className="backdrop-blur bg-cream-filter">
          <div className="relative">
            <div className="container m-auto">
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-5/12 self-center">
                  <div className="hero-content" data-aos="fade-up">
                    <span className="text-darkblue">Vietnamese community</span>
                    <h1 className="text-4xl">Đồng Hành Network</h1>
                    <hr />
                    <p className="mb-8 max-w-[480px]">
                      Our Vietnamese community welcomes individuals worldwide,
                      dedicated to fostering meaningful connections and social
                      interactions.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-5 mb-5">
                      <a href="/introduction">
                        <button
                          type="button"
                          className="animation-hover uppercase text-white bg-darkblue hover:bg-bordeau font-medium rounded-full text-sm px-4 py-2 text-center"
                        >
                          Learn more
                        </button>
                      </a>
                      <a href="/events">
                        <button
                          type="button"
                          className="animation-hover flex items-center uppercase text-darkblue hover:text-bordeau font-medium rounded-full text-sm px-4 py-2 text-center"
                        >
                          more events
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 ml-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                            />
                          </svg>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="hidden px-4 lg:block lg:w-1/12" />
                <div className="w-full px-4 lg:w-6/12">
                  <div className="lg:ml-auto">
                    <div className="relative w-full rounded z-10 inline-block pt-11 lg:pt-0">
                      {event ? (
                        <SmallEventCard event={event} />
                      ) : (
                        <div
                          className="rounded-ss-2xl rounded-ee-2xl bg-cream shadow-lg"
                          data-aos="fade-up-left"
                        >
                          <img
                            src={Connection}
                            alt="img-connection"
                            className="lg:ml-auto shadow-lg"
                          />
                        </div>
                      )}
                      <span className="absolute -bottom-8 -left-8 z-[-1]">
                        <svg
                          width="93"
                          height="93"
                          viewBox="0 0 93 93"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="2.5" cy="2.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="2.5" cy="24.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="2.5" cy="46.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="2.5" cy="68.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="2.5" cy="90.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="24.5" cy="2.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="24.5" cy="24.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="24.5" cy="46.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="24.5" cy="68.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="24.5" cy="90.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="46.5" cy="2.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="46.5" cy="24.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="46.5" cy="46.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="46.5" cy="68.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="46.5" cy="90.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="68.5" cy="2.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="68.5" cy="24.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="68.5" cy="46.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="68.5" cy="68.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="68.5" cy="90.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="90.5" cy="2.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="90.5" cy="24.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="90.5" cy="46.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="90.5" cy="68.5" r="2.5" fill="#6b1d1c" />
                          <circle cx="90.5" cy="90.5" r="2.5" fill="#6b1d1c" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IntroductionSection;
