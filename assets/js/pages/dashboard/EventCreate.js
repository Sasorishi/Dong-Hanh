import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/LoaderComponent";
import Toast from "../../components/ToastComponent";

const EventCreate = () => {
  const [eventCategories, setEventCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    category: null,
    name: "",
    description: "",
    place: "",
    location: "",
    year: "",
    isRegistrable: null,
    dateStart: null,
    dateEnd: null,
    expiredRefundDate: null,
    price: null,
    currency: null,
    features: [],
  });

  const closeToast = () => {
    setError(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

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

      const response = await axios.post(`/api/events/create`, formData);
      console.log(formData);

      if (response.data.success !== false) {
        console.log("ok");
        // window.location.reload();
        setEdit(`Success : Data created.`);

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

  const handleRemoveFeature = (index) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1); // Supprimez l'élément à l'index donné
    setFormData((prevData) => ({
      ...prevData,
      features: newFeatures,
    }));
  };

  const handleAddFeature = () => {
    if (formData.features.length < 4) {
      setFormData((prevData) => ({
        ...prevData,
        features: [...prevData.features, ""], // Ajoutez un nouvel élément vide à la liste des fonctionnalités
      }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value; // Met à jour la valeur de la fonctionnalité à l'index donné
    setFormData((prevData) => ({
      ...prevData,
      features: newFeatures,
    }));
  };

  return (
    <section className="p-0 sm:ml-48">
      {error && <Toast message={error} onClose={closeToast} error={true} />}
      <div className="p-4 mt-16">
        <div className="rounded-lg shadow-lg bg-whitesmoke p-6">
          <div className="relative rounded-lg">
            {!loading ? (
              <form className="w-full max-w" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="category"
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
                      htmlFor="name"
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
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      htmlFor="currency"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Currency
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="currency"
                        name="currency"
                        value={formData.currency}
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
                      htmlFor="description"
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

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Features
                    </label>
                    <div className="mt-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="my-4">
                          <input
                            type="text"
                            key={index}
                            value={feature}
                            onChange={(e) =>
                              handleFeatureChange(index, e.target.value)
                            }
                            placeholder="Enter feature"
                            className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          <div className="flex justify-end mt-2">
                            {index !== 0 && (
                              <button
                                onClick={() => handleRemoveFeature(index)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      {formData.features.length === 0 || ( // Afficher le bouton "+" si le tableau features est vide ou s'il y a moins de 4 champs d'entrée
                        <button onClick={handleAddFeature}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex mb-6 gap-2">
                  <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <label
                      htmlFor="dateStart"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Start date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        type="date"
                        name="dateStart"
                        value={
                          formData.dateStart
                            ? new Date(formData.dateStart)
                                .toISOString()
                                .substr(0, 10)
                            : ""
                        }
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <label
                      htmlFor="dateEnd"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      End date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        type="date"
                        name="dateEnd"
                        value={
                          formData.dateEnd
                            ? new Date(formData.dateEnd)
                                .toISOString()
                                .substr(0, 10)
                            : ""
                        }
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
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
                      htmlFor="location"
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
                      htmlFor="number"
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
                      htmlFor="registration"
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

                <div className="flex -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="expire-date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Expire refund date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        type="date"
                        name="expiredRefundDate"
                        value={
                          formData.expiredRefundDate
                            ? new Date(formData.expiredRefundDate)
                                .toISOString()
                                .substr(0, 10)
                            : ""
                        }
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                      />
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

export default EventCreate;
