import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import Stepper from "@components/register/StepperComponent";
import LogisticInformationComponent from "@components/register/LogisticInformationComponent";

const LogisticInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logisticInformationComponents, setLogisticInformationComponents] =
    useState(null);
  const [logisticsData, setLogisticsData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/checkout", {
      state: {
        eventId: location.state.eventId,
        numTickets: location.state.numTickets,
        ticketsData: location.state.ticketsData,
        logisticsData: logisticsData,
        logisticCase: location.state.logisticCase,
      },
    });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (
      !location.state?.ticketsData ||
      !location.state?.eventId ||
      !location.state?.numTickets
    ) {
      console.log("No tickets data or event id");
      navigate("/", { replace: true });
    }

    const logisticInformationComponents = Array.from(
      { length: location.state.numTickets },
      (_, index) => (
        <LogisticInformationComponent
          key={index}
          ticketKey={index + 1}
          lastname={location.state.ticketsData[index + 1].lastName}
          firstname={location.state.ticketsData[index + 1].firstName}
          onLogisticDataChange={(key, data) =>
            setLogisticsData((prevData) => ({ ...prevData, [key]: data }))
          }
        />
      )
    );

    setLogisticInformationComponents(logisticInformationComponents);
  }, []);

  return (
    <section className="bg-whitesmoke">
      <Stepper currentStep={2} />
      <div className="py-24 sm:py-32 px-6 lg:px-8 rounded-lg">
        <form onSubmit={handleSubmit}>
          {logisticInformationComponents}
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

export default LogisticInformation;
