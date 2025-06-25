import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import StaffInformation from "@components/register/StaffInformationComponent";
import Stepper from "@components/register/StepperComponent";
import Toast from "@components/ToastComponent";
import axios from "axios";
import Loader from "@components/LoaderComponent";

const Register = () => {
  const [tickets, setTickets] = useState(null);
  const [ticketsData, setTicketsData] = useState({});
  const [payment, setPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { eventId, numTickets } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (payment) {
      navigate("/checkout", {
        state: {
          eventId: eventId,
          numTickets: numTickets,
          ticketsData: ticketsData,
          logisticCase: null,
        },
      });
    } else {
      try {
        setLoading(true);
        const staffs = Object.values(ticketsData).map((staff) => ({
          ...staff,
          payment: false,
        }));
        const data = {
          eventId: eventId,
          numTickets: numTickets,
          staffs: staffs,
        };
        const response = await axios.post("/api/register/staff", data);
        console.log(response);

        if (response.status === 200) {
          navigate("/response/success/checkout", {
            state: {
              eventId: eventId,
              numTickets: numTickets,
              ticketsData: ticketsData,
              logisticCase: null,
            },
          });
        }
      } catch (error) {
        setError("Error call api request");
      } finally {
        setLoading(false);
      }
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const ticketComponents = Array.from({ length: numTickets }, (_, index) => (
      <StaffInformation
        key={index}
        ticketKey={index + 1}
        onTicketsDataChange={(key, data) =>
          setTicketsData((prevData) => ({ ...prevData, [key]: data }))
        }
      />
    ));

    const parsedNumTickets = parseInt(numTickets, 10);

    if (
      isNaN(parsedNumTickets) ||
      parsedNumTickets < 1 ||
      parsedNumTickets > 8
    ) {
      navigate("/");
    }

    setTickets(ticketComponents);
  }, []);

  const closeToast = () => setError(null);

  return (
    <section className="bg-whitesmoke py-16 px-32">
      <Stepper currentStep={1} isOnline={false} />
      {error && <Toast message={error} onClose={closeToast} error />}
      {!loading ? (
        <div className="py-24 sm:py-32 px-6 lg:px-8 rounded-lg">
          <form onSubmit={handleSubmit}>
            {tickets}

            <div className="flex items-center justify-center mt-6">
              <input
                id="link-checkbox"
                type="checkbox"
                checked={payment}
                onChange={(e) => setPayment(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="link-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                I would like to help cover the cost of participation and entry
                to the event
              </label>
            </div>
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

export default Register;
