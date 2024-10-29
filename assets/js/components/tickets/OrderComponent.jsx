import React from "react";
import Ticket from "./TicketComponent";
import { useNavigate } from "react-router-dom";

const OrderComponent = ({ ticketsData, index, ordersData }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(
      `/account/events/${ticketsData[0]["eventId"]}/logistics_informations/${ordersData[index]["order_id"]}`
    );
  };

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
        <div className="flex flex-col w-full mb-4 md:w-auto md:mb-0">
          <button
            data-tooltip-target="tooltip-refund"
            type="button"
            onClick={handleNavigation}
            className="animation-hover flex items-center uppercase text-darkblue hover:text-bordeau font-medium rounded-full text-sm px-4 py-2 text-center"
          >
            Edit Logistics
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </button>
        </div>
        <div className="w-full md:w-auto md:text-right">
          {/* {ordersData[index]["status"] !== "REFUND" ||
            (new Date() > ordersData[index]["refund_expire_at"] && ( */}
          <button
            data-tooltip-target="tooltip-refund"
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
                d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z"
              />
            </svg>
          </button>
          {/* ))} */}
        </div>
      </div>
      {ticketsData.map((ticket, index) => (
        <Ticket key={index} TicketData={ticket} />
      ))}
    </div>
  );
};

export default OrderComponent;
