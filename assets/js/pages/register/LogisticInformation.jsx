import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import Stepper from "@components/register/StepperComponent";
import Loader from "@components/LoaderComponent";
import LogisticInformationComponent from "@components/register/LogisticInformationComponent";

const LogisticInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    isConfirmButtonDisabled: true,
    logisticCase: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (state.logisticCase) {
      case "flight-details":
        navigate("/register/logistic_informations/flight_informations", {
          state: {
            eventId: state.eventId,
            numTickets: state.numTickets,
            ticketsData: state.ticketsData,
          },
        });
        break;

      default:
        navigate("/checkout", {
          state: {
            eventId: location.state.eventId,
            numTickets: location.state.numTickets,
            ticketsData: location.state.ticketsData,
          },
        });
        break;
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!location.state?.ticketsData || !location.state?.eventId) {
      console.log("No tickets data or event id");
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));
      navigate("/", { replace: true });
    }

    if (state.logisticCase) {
      setState((prevState) => ({
        ...prevState,
        isConfirmButtonDisabled: false,
      }));
    }
  }, [
    location.state?.ticketsData,
    location.state?.eventId,
    state.logisticCase,
    navigate,
  ]);

  return (
    <section className="bg-whitesmoke">
      <Stepper currentStep={2} />
      {!state.loading ? (
        <div className="py-24 sm:py-32 px-6 lg:px-8 rounded-lg">
          <LogisticInformationComponent
            onLogisticCaseChange={(value) =>
              setState((prevState) => ({
                ...prevState,
                logisticCase: value,
              }))
            }
          />
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
              onClick={handleSubmit}
              disabled={state.isConfirmButtonDisabled}
              className="animation-hover flex align-center text-white uppercase rounded-full bg-darkblue px-4 py-2 text-center font-medium shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:hover:bg-darkblue disabled:opacity-25"
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default LogisticInformation;
