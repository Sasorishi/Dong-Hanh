import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PayPalButton from "@components/PaypalButtonComponent";
import TicketImage from "@images/ticket.png";
import Toast from "@components/ToastComponent";
import Stepper from "@components/register/StepperComponent";
import Loader from "@components/LoaderComponent";
import { getCurrencySymbol } from "@functions/functions";

const Checkout = () => {
  const [event, setEvent] = useState(null);
  const [numTickets, setNumTickets] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [error, setError] = useState(null);
  const TIMEOUT_DURATION = 5 * 60 * 1000;
  const [code, setCode] = useState(null);
  const [discount, setDiscount] = useState(null);
  let timeoutId;
  const [price, setPrice] = useState(0);

  const startTimeout = () => {
    let elapsedTime = 0;

    const intervalId = setInterval(() => {
      elapsedTime += 1000;
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      window.location.href = "/response/error/timeout";
    }, TIMEOUT_DURATION);
  };

  const closeToast = () => {
    setError(null);
  };

  if (!location.state) {
    setLoading(true);
    window.location.href = "/";
  }

  const handlePaymentError = (error) => {
    setError(error);
  };

  const handleLoadingChange = (newLoadingValue) => {
    setLoading(newLoadingValue);
  };

  const calculatePrice = () => {
    let totalPrice;

    // Calcul du prix total avec réduction si disponible
    if (discount !== null) {
      totalPrice = numTickets * event["price"][0] * (1 - discount / 100);
    } else {
      totalPrice = numTickets * event["price"][0];
    }

    // Arrondir à la dizaine la plus proche
    return Math.round(totalPrice / 10) * 10;
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
          setError("Error call api request");
        }
      } catch (error) {
        setEvent([]);
        setError("Error call api request");
      } finally {
        setLoading(false);

        setTimeout(() => {
          closeToast();
        }, 5000);
      }
    };

    getEvent();

    // Démarrer le timeout lorsque la page est chargée
    startTimeout();

    // Réinitialiser le timeout à chaque changement dans numTickets ou event
    return () => {
      clearTimeout(timeoutId);
      startTimeout();
    };
  }, [location.state.eventId, location.state.numTickets]);

  useEffect(() => {
    if (event && numTickets !== null) {
      setPrice(calculatePrice(event, numTickets, discount));
    }
  }, [event, numTickets, discount]);

  const currencySymbol = event?.currency
    ? getCurrencySymbol(event.currency)
    : "";

  const handleCode = (e) => {
    const { value } = e.target;
    setCode(value);
  };

  const handleSubmitDiscount = async () => {
    try {
      const response = await axios.get(`/api/discount/${code}`);

      if (response.status === 200) {
        const data = response.data.voucher;
        setDiscount(data.discount);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setTimeout(() => {
        closeToast();
      }, 5000);
    }
  };

  const removeDiscount = () => {
    if (discount) {
      setDiscount(null);
      setCode(null);
      setError("Discount removed");
      setTimeout(() => {
        closeToast();
      }, 5000);
    }
  };

  return (
    <section className="bg-whitesmoke">
      <Stepper currentStep={3} />
      {error && <Toast message={error} onClose={closeToast} error={true} />}
      {!loading ? (
        <div className="py-24">
          <div className="grid lg:grid-cols-2">
            <div className="px-4 pt-8">
              <p className="text-xl font-medium">Order Summary</p>
              <p className="text-gray-400">Check your items.</p>
              {event ? (
                <div className="mt-8 space-y-3 rounded-lg border bg-whitesmoke px-2 py-4 sm:px-6">
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
            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 rounded-lg shadow-lg">
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
                      {event["price"][0]} {currencySymbol}
                    </p>
                  </div>
                </div>
                <div className="border-b py-2">
                  <label
                    htmlFor="discountCode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Discount code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="discountCode"
                      id="discountCode"
                      placeholder="Code"
                      maxLength={12}
                      onChange={handleCode}
                      className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={removeDiscount}
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
                      onClick={handleSubmitDiscount}
                      className="animation-hover flex align-center text-white uppercase rounded-full bg-darkblue px-4 py-2 text-center font-medium shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:hover:bg-darkblue disabled:opacity-25"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {price} {currencySymbol}
                  </p>
                </div>
                {event.expiredRefundDate != null ? (
                  <span className="text-sm text-center text-gray-600 flex justify-center align-center">
                    *refund available before {event.expiredRefundDate}.
                  </span>
                ) : null}
              </div>
              <div className="mt-4 mb-8 w-full px-6 py-3">
                <PayPalButton
                  event={event}
                  numTickets={numTickets}
                  ticketsData={location.state.ticketsData}
                  logisticsInformations={location.state.logisticsData}
                  logisticCase={location.state.logisticCase}
                  onError={handlePaymentError}
                  onLoadingChange={handleLoadingChange}
                  price={price}
                  discountCode={code}
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
