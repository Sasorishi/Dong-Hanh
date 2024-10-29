import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LogisticInformationComponent from "@components/register/LogisticInformationComponent";
import ToastComponent from "@components/ToastComponent";

const LogisticsInformations = () => {
  const { eventId, orderId } = useParams();
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
          `/api/user/events/${eventId}/getLogisticsInformations/${orderId}`
        );

        if (response.status === 200) {
          const data = response.data.logisticData;
          if (data.length != 0) {
            setLogisticsData(data);
          }
        } else {
          setError("Logistics informations failled to load");
        }
      } catch (error) {
        setError("Error loading logistics informations");
        console.error(error);
      } finally {
        setLoading(false);
        setTimeout(() => {
          closeToast();
        }, 5000);
      }
    };

    getLogisticInformation();
  }, [eventId, orderId]);

  useEffect(() => {
    if (logisticsData.length > 0) {
      const components = logisticsData.map((logisticData, index) => (
        <LogisticInformationComponent
          key={index}
          ticketKey={index}
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
  }, [logisticsData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const combinedData = {
        logisticsData: logisticsData,
      };
      console.log(combinedData);
      const response = await axios.post(
        "/api/user/events/{eventId}/setLogisticsInformations",
        combinedData
      );
      if (response.status === 200 || response.status === 201) {
        console.log("Request success !");
        setSuccess("Logistics informations saved.");
      } else {
        console.error("Server request fail");
        setError("Server request fail. Try again or later.");
      }
    } catch (error) {
      console.error("Server request fail", error);
      setError("Server request fail. Try again or later.");
    } finally {
      setTimeout(() => {
        closeToast();
      }, 5000);
    }
  };

  const closeToast = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <section className="bg-whitesmoke">
      <div className="py-24 sm:py-32 px-6 lg:px-8 rounded-lg">
        {error && (
          <ToastComponent message={error} onClose={closeToast} error={true} />
        )}
        {success && (
          <ToastComponent
            message={success}
            onClose={closeToast}
            error={false}
          />
        )}
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
