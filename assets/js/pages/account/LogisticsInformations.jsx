import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LogisticInformationComponent from "@components/register/LogisticInformationComponent";

const LogisticsInformations = () => {
  const { eventId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [logisticsData, setLogisticsData] = useState([]);
  const [logisticsInformationsComponents, setLogisticsInformationsComponents] =
    useState([]);

  useEffect(() => {
    const getLogisticInformation = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/user/events/${eventId}/getLogisticsInformations`
        );

        if (response.status === 200) {
          const data = response.data.logisticData;
          setLogisticsData(data); // Met à jour logisticsData avec les données récupérées
        } else {
          setError("Erreur lors de la requête API");
        }
      } catch (error) {
        setError("Erreur lors de la requête API");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getLogisticInformation();
  }, [eventId]); // Se déclenche lorsque eventId change

  // Créer les composants lorsque logisticsData change
  useEffect(() => {
    if (logisticsData.length > 0) {
      const components = logisticsData.map((logisticData, index) => (
        <LogisticInformationComponent
          key={index}
          ticketKey={index + 1}
          lastname={logisticData.lastname}
          firstname={logisticData.firstname}
          logisticData={logisticData}
          onLogisticDataChange={(key, data) =>
            setLogisticsData((prevData) => ({ ...prevData, [key]: data }))
          }
        />
      ));

      setLogisticsInformationsComponents(components);
    }
  }, [logisticsData]); // Se déclenche lorsque logisticsData est mis à jour

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  };

  return (
    <section className="bg-whitesmoke">
      <div className="py-24 sm:py-32 px-6 lg:px-8 rounded-lg">
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          {logisticsInformationsComponents}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
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
            <button
              type="submit"
              className="animation-hover flex align-center text-white uppercase rounded-full bg-darkblue px-4 py-2 text-center font-medium shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:hover:bg-darkblue disabled:opacity-25"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LogisticsInformations;
