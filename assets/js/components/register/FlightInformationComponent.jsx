import React, { useState } from "react";

const FlightInformationComponent = ({ ticketKey, onTicketsDataChange }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
    country: "",
    healthcare: "",
    expectation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    onTicketsDataChange(ticketKey, formData);
  };

  return (
    <div className="mt-6 space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Ticket {ticketKey}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Register informations of the attendee(s).
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-4 md:col-span-4 lg:col-span-4">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Lastname*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-4 md:col-span-4 lg:col-span-4">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Firstname*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-2 md:col-span-2 lg:col-span-2">
            <label
              htmlFor="number-age"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Age*
            </label>
            <div className="mt-2">
              <input
                type="number"
                min="1"
                max="100"
                id="number-age"
                aria-describedby="helper-text-explanation"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-2 md:col-span-2 lg:col-span-2">
            <label
              htmlFor="gender"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Gender*
            </label>
            <div className="mt-2">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                required
              >
                <option disabled value="">
                  Choose a gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonBinary">Non binary</option>
              </select>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email*
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6">
            <label
              htmlFor="phone-input"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone number*
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 19 18"
                >
                  <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                </svg>
              </div>
              <input
                type="text"
                id="phone-input"
                name="phone"
                autoComplete="phone"
                value={formData.phone}
                onChange={handleInputChange}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}+"
                placeholder="123-456-7890"
                required
              />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Country*
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="country"
                id="country"
                autoComplete="country-name"
                value={formData.country}
                onChange={handleInputChange}
                className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-12">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Healthcare
            </label>
            <div className="mt-2">
              <textarea
                id="message"
                rows="4"
                name="healthcare"
                value={formData.healthcare}
                onChange={handleInputChange}
                className="bg-gray-50 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write if you have any heath issues (exemple: diet / allergies)."
              />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-12">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              The expectation*
            </label>
            <div className="mt-2">
              <textarea
                id="message"
                rows="4"
                name="expectation"
                value={formData.expectation}
                onChange={handleInputChange}
                className="bg-gray-50 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your thoughts here..."
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightInformationComponent;
