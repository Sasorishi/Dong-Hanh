import React from "react";
import Ticket from "./TicketComponent";

const OrderComponent = () => {
  return (
    <div className="w-full bg-cream border border-gray-200 rounded-lg shadow mt-4 mb-4">
      <div className="py-2 px-4 gap-0 sm:gap-8 lg:gap-8 flex flex-col md:flex-row md:justify-between md:items-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50">
        <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0 md:w-auto">
          <span className="text-sm font-medium text-darkblue">Order</span>
          <span className="text-sm font-medium">f818011e064ee</span>
        </div>
        <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0 md:w-auto">
          <span className="text-sm font-medium text-darkblue">Date</span>
          <span className="text-sm font-medium">mm/dd/YYYY</span>
        </div>
        {/* <div className="flex flex-col w-full mb-4 md:w-auto md:mb-0">
          <span className="text-sm font-medium text-darkblue">Amount</span>
          <span className="text-sm font-medium">200 €</span>
        </div> */}
        <div className="w-full md:w-auto md:text-right">
          <button
            type="button"
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Refund
          </button>
        </div>
      </div>

      <Ticket />
    </div>
  );
};

export default OrderComponent;
