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
      totalPrice = Math.round(totalPrice / 10) * 10;
    } else {
      totalPrice = numTickets * event["price"][0];
    }

    return totalPrice;
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/events/${location.state.eventId}/getData`,
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
      const response = await axios.get(`/api/discount/${code}`, {
        params: {
          eventId: location.state.eventId,
        },
      });

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

  console.log("Event:", location.state);

  const handleFreeCheckout = async () => {
    try {
      setLoading(true);

      // Fake PayPal-like data (important pour garder la même structure backend)
      const fakeDetails = {
        status: "COMPLETED",
        payer: {
          email_address: "contact@dong-hanh.org",
        },
      };

      const combinedDataStaff = {
        eventId: event["id"],
        numTickets: numTickets,
        details: fakeDetails,
        captureId: null,
        staffs: location.state.staffs,
        discountCode: code,
        price: price,
      };

      const combinedDataParticipants = {
        eventId: event["id"],
        numTickets: numTickets,
        logisticsInformations: location.state.logisticsData,
        logisticCase: location.state.logisticCase,
        details: fakeDetails,
        captureId: null,
        participants: location.state.ticketsData,
        discountCode: code,
        price: price,
      };

      const endpoint = location.state.staffs
        ? "/api/register/staff"
        : "/api/register/private";

      const payload = location.state.staffs
        ? combinedDataStaff
        : combinedDataParticipants;

      const response = await axios.post(endpoint, payload);

      if (response.status === 200 || response.status === 201) {
        window.location.href = "/response/success/checkout";
        window.history.replaceState(null, "", "/response/success/checkout");
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la validation gratuite");
      window.location.replace("/response/error/checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-whitesmoke py-8 px-4 sm:py-16 sm:px-8 md:px-16 lg:px-32">
      <Stepper currentStep={3} />
      {error && <Toast message={error} onClose={closeToast} error={true} />}
      {!loading ? (
        <div className="py-12 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="px-2 sm:px-4 pt-4 sm:pt-8">
              <p className="text-lg sm:text-xl font-medium">Order Summary</p>
              <p className="text-gray-400 text-sm sm:text-base">
                Check your items.
              </p>
              {event ? (
                <div className="mt-6 sm:mt-8 space-y-3 rounded-lg border bg-whitesmoke px-2 py-4 sm:px-6">
                  <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img
                      className="m-2 h-20 w-24 sm:h-24 sm:w-28 rounded-md border object-cover object-center"
                      src={TicketImage}
                      alt="TicketImage"
                    />
                    <div className="flex w-full flex-col px-3 sm:px-4 py-3 sm:py-4">
                      <span className="text-xs sm:text-sm font-semibold text-darkblue items-center">
                        {event["eventCategory"]}
                      </span>
                      <span className="font-semibold text-sm sm:text-base">
                        {event["name"]}
                      </span>
                      <span className="float-right text-xs sm:text-sm font-semibold text-darkblue">
                        {event["year"]} | {event["location"]}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="mt-6 sm:mt-10 bg-gray-50 px-3 sm:px-4 pt-4 sm:pt-8 lg:mt-0 rounded-lg shadow-lg">
              <p className="text-lg sm:text-xl font-medium">Payment Details</p>
              <p className="text-gray-400 text-sm sm:text-base">
                Complete your order by providing your payment details.
              </p>
              <div>
                <div className="mt-4 sm:mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      Numeric tickets
                    </p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {numTickets}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      Unit price
                    </p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {event["price"][0]} {currencySymbol}
                    </p>
                  </div>
                </div>
                <div className="border-b py-2">
                  <label
                    htmlFor="discountCode"
                    className="block text-xs sm:text-sm font-medium leading-6 text-gray-900"
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
                      className="bg-gray-50 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-x-6">
                    <button
                      type="button"
                      onClick={removeDiscount}
                      className="animation-hover uppercase flex align-center leading-6 text-gray-900 text-center font-medium hover:text-bordeau w-full sm:w-auto justify-center text-xs sm:text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
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
                      className="animation-hover flex align-center text-white uppercase rounded-full bg-darkblue px-3 sm:px-4 py-2 text-center font-medium shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:hover:bg-darkblue disabled:opacity-25 w-full sm:w-auto justify-center text-xs sm:text-sm"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 flex items-center justify-between">
                  <p className="text-sm sm:text-base font-medium text-gray-900">
                    Total
                  </p>
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {price} {currencySymbol}
                  </p>
                </div>
                {event.expiredRefundDate != null ? (
                  <span className="text-xs sm:text-sm text-center text-gray-600 flex justify-center align-center mt-2">
                    *refund available before {event.expiredRefundDate}.
                  </span>
                ) : null}
              </div>
              <div className="mt-4 mb-6 sm:mb-8 w-full px-3 sm:px-6 py-3">
                {event &&
                  numTickets &&
                  (price > 0 ? (
                    <PayPalButton
                      key={price + "-" + (code || "")}
                      event={event}
                      numTickets={numTickets}
                      ticketsData={location.state.ticketsData}
                      logisticsInformations={location.state.logisticsData}
                      logisticCase={location.state.logisticCase}
                      onError={handlePaymentError}
                      onLoadingChange={handleLoadingChange}
                      price={price}
                      discountCode={code}
                      staffs={location.state.staffs}
                    />
                  ) : (
                    <button
                      onClick={handleFreeCheckout}
                      className="w-full bg-green-600 text-white py-2 rounded-full font-medium hover:bg-green-700"
                    >
                      Continue
                    </button>
                  ))}
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
