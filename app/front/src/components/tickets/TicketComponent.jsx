import React from "react";

const TicketComponent = ({ TicketData }) => {
  return (
    <div className="space-y-8 m-1">
      <div className="bg-whitesmoke shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between py-2 px-4">
          <p className="text-sm font-medium text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {TicketData["capture_id"]}
          </p>
          <p className="text-sm font-medium text-gray-900">
            {`Status : ${TicketData["status"]}`}
          </p>
        </div>
        <div className="py-4 px-4 sm:grid md:grid lg:grid grid-cols-12 gap-x-8">
          <div className="col-span-12 sm:flex md:col-span-6 lg:col-span-6">
            <div className="m-auto sm:m-0 md:m-0 lg:m-0 flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg sm:aspect-none sm:w-40 sm:h-40 w-full h-full">
              <img
                src={TicketData["qrcode"]}
                className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                alt={TicketData["qrcode"]}
              />
            </div>

            <div className="mt-6 sm:mt-0 sm:ml-6">
              <dt className="text-sm font-medium text-gray-900">Attendee</dt>
              <p className="mt-3 text-sm text-gray-500">
                {TicketData["lastname"]}
              </p>
              <p className="text-sm text-gray-500">{TicketData["firstname"]}</p>
              <p className="text-sm text-gray-500">
                {TicketData["currency"] == "EUR"
                  ? `${TicketData["price"]} €`
                  : `$${TicketData["price"]}`}
              </p>
            </div>
          </div>

          <div className="mt-2 sm:mt-0 md:mt-0 lg:mt-0 lg:mt-0 col-span-12 sm:col-span-12 sm:col-span-6 lg:col-span-6">
            <dl className="grid grid-cols-12 gap-x-6 text-sm">
              <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6">
                <dt className="font-medium text-gray-900">
                  {TicketData["date_start"]} - {TicketData["date_end"]}
                </dt>
                <dd className="mt-3 text-gray-500">
                  <span className="block text-sm text-gray-500 normal-case">
                    {TicketData["place"]}
                  </span>
                  <span className="block text-sm text-gray-500 normal-case">
                    {TicketData["location"]}
                  </span>
                </dd>
              </div>
              <div className="col-span-12 mt-3 sm:mt-O md:mt-0 lg:mt-0 sm:col-span-6 md:col-span-6 lg:col-span-6">
                <dt className="font-medium text-gray-900">Informations</dt>
                <dd className="mt-3 text-gray-500">
                  <p className="text-sm text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {TicketData["email"]}
                  </p>
                  <p className="text-sm text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {TicketData["phone"]}
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between px-4 py-2">
          <p className="text-sm font-medium text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {TicketData["user_id"]}
          </p>
          <a href={`/events/${TicketData.eventId}`}>
            <p className="text-sm font-medium text-gray-900">
              {TicketData["event_category"]} | {TicketData["event_label"]}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TicketComponent;
