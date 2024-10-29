import { id } from "postcss-selector-parser";
import React, { useState } from "react";

const LogisticInformationComponent = ({
  ticketKey,
  lastname,
  firstname,
  logisticData,
  onLogisticDataChange,
}) => {
  const [formData, setFormData] = useState({
    id: logisticData?.id || "",
    firstname: logisticData?.firstname || "",
    lastname: logisticData?.lastname || "",
    need_logistic: logisticData?.need_logistic || "",
    order_id: logisticData?.order_id || "",
    participant_id: logisticData?.participant_id || "",
    arrival_transport: logisticData?.arrival_transport || "",
    arrival_datetime: logisticData?.arrival_datetime || "",
    arrival_airline: logisticData?.arrival_airline || "",
    arrival_flight_number: logisticData?.arrival_flight_number || "",
    departure_transport: logisticData?.departure_transport || "",
    departure_datetime: logisticData?.departure_datetime || "",
    departure_airline: logisticData?.departure_airline || "",
    departure_flight_number: logisticData?.departure_flight_number || "",
    comments: logisticData?.comments || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
    onLogisticDataChange(ticketKey, updatedFormData);
  };

  const getMinDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date.toISOString().slice(0, 16); // format 'YYYY-MM-DDTHH:MM'
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 10);
    return date.toISOString().slice(0, 16); // format 'YYYY-MM-DDTHH:MM'
  };

  return (
    <div className="mt-6 space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Logistic information {ticketKey + 1} - {firstname} {lastname}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Your logistic details help us coordinate transportation and logistics
          for a seamless event experience.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-4 md:col-span-4 lg:col-span-4">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Arrival Transport*
            </label>
            <div className="mt-2">
              <select
                id="arrival_transport"
                name="arrival_transport"
                value={formData.arrival_transport}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                required
              >
                <option disabled value="">
                  Choose a transportation
                </option>
                <option value="train">Train</option>
                <option value="plane">Plane</option>
              </select>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-8 md:col-span-8 lg:col-span-8">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Arrival datetime*
            </label>
            <div className="mt-2">
              <input
                className="bg-gray-50 block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="datetime-local"
                id="arrival_datetime"
                name="arrival_datetime"
                min={getMinDate()}
                max={getMaxDate()}
                value={
                  formData.arrival_datetime
                    ? formData.arrival_datetime.slice(0, 16)
                    : ""
                }
                onClick={(e) => e.currentTarget.showPicker()}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div
            className={`col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 ${
              formData.arrival_transport !== "plane" ? "hidden" : ""
            }`}
          >
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Arrival Airline*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="arrival_airline"
                id="arrival_airline"
                value={formData.arrival_airline}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                disabled={formData.arrival_transport !== "plane"}
              />
            </div>
          </div>
          <div
            className={`col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 ${
              formData.arrival_transport !== "plane" ? "hidden" : ""
            }`}
          >
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Arrival Flight number*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="arrival_flight_number"
                id="arrival_flight_number"
                value={formData.arrival_flight_number}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                disabled={formData.arrival_transport !== "plane"}
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-4 md:col-span-4 lg:col-span-4">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Departure Transport*
            </label>
            <div className="mt-2">
              <select
                id="departure_transport"
                name="departure_transport"
                value={formData.departure_transport}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                required
              >
                <option disabled value="">
                  Choose a transportation
                </option>
                <option value="train">Train</option>
                <option value="plane">Plane</option>
              </select>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-8 md:col-span-8 lg:col-span-8">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Departure datetime*
            </label>
            <div className="mt-2">
              <input
                className="bg-gray-50 block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="datetime-local"
                id="departure_datetime"
                name="departure_datetime"
                min={getMinDate()}
                max={getMaxDate()}
                value={
                  formData.departure_datetime
                    ? formData.departure_datetime.slice(0, 16)
                    : ""
                }
                onClick={(e) => e.currentTarget.showPicker()}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div
            className={`col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 ${
              formData.departure_transport !== "plane" ? "hidden" : ""
            }`}
          >
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Departure Airline*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="departure_airline"
                id="departure_airline"
                value={formData.departure_airline}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                disabled={formData.departure_transport !== "plane"}
              />
            </div>
          </div>
          <div
            className={`col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 ${
              formData.departure_transport !== "plane" ? "hidden" : ""
            }`}
          >
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Departure Flight number*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="departure_flight_number"
                id="departure_flight_number"
                value={formData.departure_flight_number}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                disabled={formData.departure_transport !== "plane"}
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-12">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Comments (Optional)
            </label>
            <div className="mt-2">
              <textarea
                id="comments"
                rows="4"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                className="bg-gray-50 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write more informations here..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticInformationComponent;
