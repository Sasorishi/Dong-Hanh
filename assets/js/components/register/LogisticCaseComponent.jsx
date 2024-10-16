import React from "react";

const LogisticCaseComponent = ({ onLogisticCaseChange }) => {
  const handleInputChange = (value) => {
    onLogisticCaseChange(value);
  };

  return (
    <div className="mt-6 space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Logistics
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          To provide you with the best possible experience during your
          participation in the event, we kindly ask you to provide your flight
          information. This helps us plan and organize logistics efficiently,
          such coordinating group logistics at the meeting point.
          <br />
          <br />
          Even if you haven't booked your flight yet, you can always add the
          details later in your personal account. Thank you for helping us make
          your journey as smooth and enjoyable as possible!
        </p>

        <div className="mt-10 flex flex-row gap-4">
          <div className="flex w-full items-center ps-4 border border-gray-200 rounded">
            <input
              id="bordered-radio-1"
              type="radio"
              name="bordered-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              onClick={() => handleInputChange("selfTravel")}
            />
            <label
              htmlFor="bordered-radio-1"
              className="w-full py-4 ms-2 text-xs font-medium text-gray-900"
            >
              I can travel by myself.
            </label>
          </div>
          <div className="flex w-full items-center ps-4 border border-gray-200 rounded">
            <input
              id="bordered-radio-2"
              type="radio"
              name="bordered-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              onClick={() => handleInputChange("logisticInformation")}
            />
            <label
              htmlFor="bordered-radio-2"
              className="w-full py-4 ms-2 text-xs font-medium text-gray-900"
            >
              I can provide the transportation details.
            </label>
          </div>
          <div className="flex w-full items-center ps-4 border border-gray-200 rounded">
            <input
              id="bordered-radio-3"
              type="radio"
              name="bordered-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              onClick={() => handleInputChange("notBooked")}
            />
            <label
              htmlFor="bordered-radio-3"
              className="w-full py-4 ms-2 text-xs font-medium text-gray-900"
            >
              I haven't booked yet.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticCaseComponent;
