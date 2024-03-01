import React from "react";

const EventCardComponent = ({ event }) => {
  return (
    <div className="bg-amber shadow-lg mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20">
      <div className="p-6">
        <h3 className="text-2xl font-bold tracking-tight text-cognac">
          {event[0]["name"]}
        </h3>
        <p className="text-base font-semibold text-darkblue">
          {event[0]["eventCategory"]}
        </p>
        <div className="mt-4 flex items-center gap-x-4">
          <h4 className="flex-none text-sm font-semibold leading-6 text-whitesmoke">
            Informations
          </h4>
          <div className="h-px flex-auto bg-gray-100" />
        </div>
        <p
          className="mt-6 text-base leading-7 text-darkblue max-h-28 overflow-hidden overflow-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            whiteSpace: "pre-line",
            WebkitLineClamp: 5,
            lineHeight: "1.4em",
          }}
        >
          {event[0]["description"]}
        </p>
        <div className="flex flex-row mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 my-auto mr-3 text-charcoal"
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
          <p className="text-base leading-7 text-charcoal">
            {event[0]["place"]}, {event[0]["location"]}
          </p>
        </div>
      </div>
      <div className="mt-2 p-2 lg:mt-0 w-full lg:flex-shrink-0">
        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center py-4">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-darkblue">
              {event[0]["dateStart"] === event[0]["dateEnd"]
                ? event[0]["dateStart"]
                : `${event[0]["dateStart"]} - ${event[0]["dateEnd"]}`}
              , {event[0]["year"]}
            </p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                {event[0]["price"][0]} €
              </span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                EUR
              </span>
            </p>
            <a
              href={`/events/${event[0]["id"]}`}
              className="mt-10 block w-full animation-hover rounded-full bg-darkblue px-3 py-2 text-center text-sm font-semibold uppercase text-white shadow-sm hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <button
                type="button"
                className="uppercase text-white font-medium rounded-full text-sm text-center"
              >
                Register now
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardComponent;
