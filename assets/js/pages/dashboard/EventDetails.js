import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/LoaderComponent";
import Toast from "../../components/ToastComponent";

const EventDetail = () => {
  const [eventCategories, setEventCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edited, setEdit] = useState(null);
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  const closeToast = () => {
    setError(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const responseEvent = await axios.get(`/api/events/${id}/getData`);
        if (responseEvent.status === 200) {
          const eventData = responseEvent.data;
          setFormData({
            category: eventData.event.eventCategory,
            name: eventData.event.name,
            description: eventData.event.description,
            place: eventData.event.place,
            location: eventData.event.location,
            year: eventData.event.year,
            isRegistrable: eventData.event.isRegistrable,
          });
          console.log(eventData.event);
        } else {
          console.error("Erreur lors de la requête api pour les événements");
        }

        const responseCategories = await axios.get("/api/eventCategories");
        if (responseCategories.status === 200) {
          setEventCategories(responseCategories.data.categories);
        } else {
          console.error(
            "Erreur lors de la requête api pour les catégories d'événements"
          );
          setEventCategories([]);
        }
      } catch (error) {
        console.error("Erreur lors de la requête api", error);
        setEventCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(`/api/events/${id}/edit`, formData);

      if (response.data.success !== false) {
        console.log("ok");
        // window.location.reload();
        setEdit(`Success : Data updated.`);

        setTimeout(() => {
          closeToast();
        }, 5000);
      } else {
        setError(`Error : ${response.data.message}.`);

        setTimeout(() => {
          closeToast();
        }, 5000);
      }
    } catch (error) {
      // console.error("Server request fail.", error);
      setError("Error update data");
      setTimeout(() => {
        closeToast();
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-0 sm:ml-64">
      {edited && <Toast message={edited} onClose={closeToast} error={false} />}
      {error && <Toast message={error} onClose={closeToast} error={true} />}
      <div className="p-4 mt-16">
        <div className="rounded-lg shadow-lg bg-whitesmoke p-6">
          <div className="relative rounded-lg">
            {!loading ? (
              <form className="w-full max-w" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                    <div className="mt-2">
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        required
                      >
                        <option disabled value="">
                          Choose a status
                        </option>
                        {eventCategories.map((category) => (
                          <option key={category.id} value={category.label}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Event name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        rows="12"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="bg-gray-50 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write if you have any heath issues (exemple: diet / allergies)."
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Feature 1
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={event["features"] ? event["features"][0] : ""}
                        onChange={(e) =>
                          setFormData["feature1"](e.target.value)
                        }
                        className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Feature 2
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={event["features"] ? event["features"][1] : ""}
                        onChange={(e) =>
                          setFormData["feature2"](e.target.value)
                        }
                        className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Feature 3
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={event["features"] ? event["features"][2] : ""}
                        onChange={(e) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            feature3: e.target.value,
                          }))
                        }
                        className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Feature 4
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.feature4}
                        onChange={(e) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            feature4: e.target.value,
                          }))
                        }
                        className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>
                </div> */}
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      <p>{formData.place} ooko</p>
                      Place
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="place"
                        id="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Location
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Year
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="year"
                        id="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Registration status
                    </label>
                    <div className="mt-2">
                      <select
                        id="gender"
                        name="isRegistrable"
                        value={formData.isRegistrable}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        required
                      >
                        <option disabled value="">
                          Choose a status
                        </option>
                        <option value={true}>Open</option>
                        <option value={false}>Close</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <a href="/">
                    <button
                      type="button"
                      className="animation-hover uppercase flex align-center leading-6 text-gray-900 text-center font-medium hover:text-bordeau"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                        />
                      </svg>
                      Cancel
                    </button>
                  </a>
                  <button
                    type="submit"
                    className="animation-hover flex align-center text-white uppercase rounded-full bg-darkblue px-4 py-2 text-center font-medium shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:hover:bg-darkblue disabled:opacity-25"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
