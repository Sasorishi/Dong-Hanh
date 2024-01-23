import React, { useEffect } from "react";
import axios from "axios";

const PaypalButtonComponent = ({ event, numTickets, ticketsData, onError }) => {
  const price = () => {
    return numTickets * event["price"][0];
  };

  const handleOnError = (err) => {
    // console.log("onError: ", err);
    onError && onError(err);
  };

  const setParticipants = async (details, captureId) => {
    try {
      const combinedData = {
        eventId: event["id"],
        numTickets: numTickets,
        details: details,
        captureId: captureId,
        participants: ticketsData,
      };
      const response = await axios.post("/api/register", combinedData);
      if (response.status === 200) {
        console.log("Request success !");
      } else {
        console.error("Server request fail");
        handleOnError("Server request fail. Try again or later.");
      }
    } catch (error) {
      console.error("Server request fail", error);
      handleOnError("Server request fail. Try again or later.");
    }
  };

  useEffect(() => {
    const loadPayPalScript = (clientId) => {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${event["currency"]}`;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "pay",
            },
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: `Register tickets - ${event["eventCategory"]["label"]}`,
                    currency_code: event["currency"],
                    amount: {
                      value: price(),
                    },
                    item: [
                      {
                        name: event["label"],
                        description: `${event["year"]} - ${event["location"]}`,
                        quantity: numTickets,
                        unit_amount: {
                          currency_code: event["currency"],
                          value: event["price"][0],
                        },
                      },
                    ],
                  },
                ],
                application_context: {
                  shipping_preference: "NO_SHIPPING",
                },
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then(function (details) {
                const captureId =
                  details.purchase_units[0].payments.captures[0].id;
                const transactionStatus = details.status;

                if (transactionStatus === "COMPLETED") {
                  setParticipants(details, captureId);
                  window.location.href = "/response/success/checkout";
                } else {
                  console.log("Transaction is not complete");
                  handleOnError("Transaction is not complete.");
                }
              });
            },
            onCancel(data) {
              console.log("onCancel : ", data);
              handleOnError("Canceled payment. Try again or later.");
            },
            onError: (err) => {
              console.log("onError: ", err);
              handleOnError("Error. Try again or later.");
              // window.location.replace("/cancel?error=checkout");
            },
          })
          .render("#paypal-button-container");
      };
    };

    const getEnv = async () => {
      try {
        const response = await axios.post("/api/env-data", {
          env: "app.dev.paypal_client_id",
        });
        const data = response.data;
        const clientId = data.varEnv;
        loadPayPalScript(clientId);
      } catch (error) {
        handleOnError(
          "Error. Fail to retrieve tickets data. Try again or later."
        );
      }
    };

    getEnv();
  }, []);

  return <div id="paypal-button-container" />;
};

export default PaypalButtonComponent;
