import React, { useState } from "react";
import { DatePicker, Space, TimePicker } from "antd";
import dayjs from "dayjs";

const LogisticInformationComponent = ({
  ticketKey,
  lastname,
  firstname,
  onLogisticDataChange,
}) => {
  const [formData, setFormData] = useState({
    arrivalTransportType: "",
    arrivalDatetime: "",
    arrivalAirline: "",
    arrivalFlightNumber: "",
    departureTransportType: "",
    departureDatetime: "",
    departureAirline: "",
    departureFlightNumber: "",
    comments: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    onLogisticDataChange(ticketKey, formData);
  };

  return (
    <div className="mt-6 space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Flight information {ticketKey} - {firstname} {lastname}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Your flight details help us coordinate transportation and logistics
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
                id="arrivalTransportType"
                name="arrivalTransportType"
                value={formData.arrivalTransportType}
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
                id="arrivalDatetime"
                name="arrivalDatetime"
                min="2018-06-07T00:00"
                max="2050-06-14T00:00"
                onClick={(e) => e.currentTarget.showPicker()}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div
            className={`col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 ${
              formData.arrivalTransportType !== "plane" ? "hidden" : ""
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
                name="arrivalAirline"
                id="arrivalAirline"
                value={formData.arrivalAirline}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                disabled={formData.arrivalTransportType !== "plane"}
              />
            </div>
          </div>
          <div
            className={`col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 ${
              formData.arrivalTransportType !== "plane" ? "hidden" : ""
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
                name="arrivalFlightNumber"
                id="arrivalFlightNumber"
                value={formData.arrivalFlightNumber}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                disabled={formData.arrivalTransportType !== "plane"}
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
                id="departureTransportType"
                name="departureTransportType"
                value={formData.departureTransportType}
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
                id="departureDatetime"
                name="departureDatetime"
                min="2018-06-07T00:00"
                max="2050-06-14T00:00"
                onClick={(e) => e.currentTarget.showPicker()}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div
            className={`col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 ${
              formData.departureTransportType !== "plane" ? "hidden" : ""
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
                name="departureAirline"
                id="departureAirline"
                value={formData.departureAirline}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                disabled={formData.departureTransportType !== "plane"}
              />
            </div>
          </div>
          <div
            className={`col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 ${
              formData.departureTransportType !== "plane" ? "hidden" : ""
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
                name="departureFlightNumber"
                id="departureFlightNumber"
                value={formData.departureFlightNumber}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                disabled={formData.departureTransportType !== "plane"}
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
