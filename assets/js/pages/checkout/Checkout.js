import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PayPalButton from "../../components/PaypalButtonComponent";
import TicketImage from "../../../../public/images/ticket.png";
import Toast from "../../components/ToastComponent";
import Stepper from "../../components/register/StepperComponent";
import Loader from "../../components/LoaderComponent";

const Checkout = () => {
  const [event, setEvent] = useState(null);
  const [numTickets, setNumTickets] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [error, setError] = useState(null);

  const closeToast = () => {
    setError(null);
  };

  if (!location.state) {
    setLoading(true);
    window.location.href = "/";
  }

  const price = () => {
    return numTickets * event["price"][0];
  };

  const handlePaymentError = (error) => {
    setError(error);
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/events/${location.state.eventId}/getData`
        );

        if (response.status === 200) {
          const data = response.data;
          setEvent(data.event);
          setNumTickets(location.state.numTickets);
        } else {
          setEvent([]);
          setError("Erreur lors de requête api");

          setTimeout(() => {
            closeToast();
          }, 5000);
        }
      } catch (error) {
        setEvent([]);
        setError("Erreur lors de requête api");

        setTimeout(() => {
          closeToast();
        }, 5000);
      } finally {
        setLoading(false);
      }
    };

    getEvent();
  }, []);

  return (
    <section className="bg-white">
      <Stepper currentStep={2} />
      {error && <Toast message={error} onClose={closeToast} error={true} />}
      {!loading ? (
        <div className="py-24">
          <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
            <div className="px-4 pt-8">
              <p className="text-xl font-medium">Order Summary</p>
              <p className="text-gray-400">Check your items.</p>
              {event ? (
                <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                  <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={TicketImage}
                      alt="TicketImage"
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="text-sm font-semibold text-darkblue items-center">
                        {event["eventCategory"]}
                      </span>
                      <span className="font-semibold">{event["name"]}</span>
                      <span className="float-right text-sm font-semibold text-darkblue">
                        {event["year"]} | {event["location"]}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
              <p className="text-xl font-medium">Payment Details</p>
              <p className="text-gray-400">
                Complete your order by providing your payment details.
              </p>
              <div>
                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Numeric tickets
                    </p>
                    <p className="font-semibold text-gray-900">{numTickets}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Unit price
                    </p>
                    <p className="font-semibold text-gray-900">
                      {event["price"][0]} €
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {price()} €
                  </p>
                </div>
                <span className="text-sm text-center text-gray-600 flex justify-center align-center">
                  *refund available before{" "}
                  {new Date(event.refundExpireAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                  .
                </span>
              </div>
              <div className="mt-4 mb-8 w-full px-6 py-3">
                <PayPalButton
                  event={event}
                  numTickets={numTickets}
                  ticketsData={location.state.ticketsData}
                  onError={handlePaymentError}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Checkout;
