import React from "react";
import Ticket from "./TicketComponent";

const OrderComponent = ({ ticketsData, index, ordersData }) => {
  return (
    <div className="w-full bg-cream border border-gray-200 rounded-lg shadow mt-4 mb-4">
      <div className="py-2 px-4 gap-0 sm:gap-8 lg:gap-8 flex flex-col md:flex-row md:justify-between md:items-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50">
        <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0 md:w-auto">
          <span className="text-sm font-medium text-darkblue">Order</span>
          <span className="text-sm font-medium">
            {ordersData[index]["order_id"]}
          </span>
        </div>
        <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0 md:w-auto">
          <span className="text-sm font-medium text-darkblue">Date</span>
          <span className="text-sm font-medium">
            {ordersData[index]["created_at"]}
          </span>
        </div>
        {/* <div className="flex flex-col w-full mb-4 md:w-auto md:mb-0">
          <span className="text-sm font-medium text-darkblue">Amount</span>
          <span className="text-sm font-medium">200 €</span>
        </div> */}
        <div className="w-full md:w-auto md:text-right">
          <button
            type="button"
            className="animation-hover flex items-center uppercase text-darkblue hover:text-bordeau font-medium rounded-full text-sm px-4 py-2 text-center"
          >
            Refund
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
        </div>
      </div>
      {ticketsData.map((ticket, index) => (
        <Ticket key={index} TicketData={ticket} />
      ))}
    </div>
  );
};

export default OrderComponent;
