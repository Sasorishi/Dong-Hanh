import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LogisticInformationComponent from "@components/register/LogisticInformationComponent";
import ToastComponent from "@components/ToastComponent";
import LogisticCaseComponent from "@components/register/LogisticCaseComponent";
import Loader from "@components/LoaderComponent";

const LogisticsInformations = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { eventId, orderId } = useParams();
  const { ticketsData } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [logisticsData, setLogisticsData] = useState([]);
  const [logisticCase, setLogisticCase] = useState("");
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
          if (data && Array.isArray(data) && data.length != 0) {
            setLogisticsData(data);
            console.log(data);
            setLogisticCase("logisticInformation");
          } else {
            setLogisticCase("selfTravel");
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
    } else {
      const components = ticketsData.map((ticketData, index) => (
        <LogisticInformationComponent
          key={index}
          ticketKey={index}
          lastname={ticketData.lastname}
          firstname={ticketData.firstname}
          onLogisticDataChange={(key, data) =>
            setLogisticsData((prevData) => ({
              ...prevData,
              [key]: data,
            }))
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
        ticketsData: ticketsData,
      };
      console.log(combinedData);
      let response = null;
      if (ticketsData && Array.isArray(ticketsData) > 0) {
        response = await axios.post(
          "/api/user/events/{eventId}/createLogisticsInformations",
          combinedData
        );
      }

      if (logisticsData && Array.isArray(logisticsData) > 0) {
        response = await axios.post(
          "/api/user/events/{eventId}/updateLogisticsInformations",
          combinedData
        );
      }

      if (response.status === 200 || response.status === 201) {
        console.log("Request success !");
        setSuccess("Logistics informations saved.");
      } else {
        console.log("Server request fail");
        setError("Server request fail");
      }
    } catch (error) {
      setError(error.response?.data?.error || "An unknown error occurred");
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
      {!loading ? (
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
            <LogisticCaseComponent
              onLogisticCaseChange={(value) => setLogisticCase(value)}
              isEdit={true}
              defaultValue={logisticCase}
            />
            {logisticCase === "logisticInformation" &&
              logisticsInformationsComponents}
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
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default LogisticsInformations;
