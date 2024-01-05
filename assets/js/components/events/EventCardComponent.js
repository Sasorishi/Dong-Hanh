import React from "react";

const EventCardComponent = ({ event }) => {
  return (
    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
      <div className="p-8 sm:p-10 lg:flex-auto">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">
          {event.name}
        </h3>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {event.description}
        </p>

        <div className="flex flex-row mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 my-auto mr-3"
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
          <p className="text-base leading-7 text-gray-600">
            {event.place}, {event.location}
          </p>
        </div>
        {event.features && (
          <>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {event.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-grey-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-gray-600">
              {event.dateStart.date === event.dateEnd.date ? (
                new Date(event.dateStart.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })
              ) : (
                <>
                  {new Date(event.dateStart.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(event.dateEnd.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </>
              )}
              , {event.year}
            </p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                {event.price[0]} €
              </span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                EUR
              </span>
            </p>
            <a
              href="#"
              className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get your ticket
            </a>
            <p className="mt-6 text-xs leading-5 text-gray-600">
              Invoices and receipts available for easy reimbursement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardComponent;
