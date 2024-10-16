import React, { useEffect } from "react";
import axios from "axios";

const PaypalButtonComponent = ({
  event,
  numTickets,
  ticketsData,
  logisticsInformations,
  logisticCase,
  onError,
  onLoadingChange,
  discountCode,
  price,
}) => {
  const handleOnError = (err) => {
    // console.log("onError: ", err);
    onError && onError(err);
  };

  const handleLoadingChange = (newLoadingValue) => {
    onLoadingChange(newLoadingValue);
  };

  const setParticipants = async (details, captureId) => {
    try {
      const combinedData = {
        eventId: event["id"],
        numTickets: numTickets,
        logisticsInformations: logisticsInformations,
        logisticCase: logisticCase,
        details: details,
        captureId: captureId,
        participants: ticketsData,
        discountCode: discountCode,
        price: price,
      };
      const response = await axios.post("/api/register", combinedData);
      console.log(combinedData);
      if (response.status === 200 || response.status === 201) {
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
              console.log(price);
              return actions.order.create({
                purchase_units: [
                  {
                    description: `Register tickets - ${event["eventCategory"]} | ${event["name"]}`,
                    currency_code: event["currency"],
                    amount: {
                      value: price,
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
                handleLoadingChange(true);
                const captureId =
                  details.purchase_units[0].payments.captures[0].id;
                const transactionStatus = details.status;

                if (transactionStatus === "COMPLETED") {
                  setParticipants(details, captureId)
                    .then(() => {
                      console.log("OK");
                      // window.location.href = "/response/success/checkout";
                    })
                    .catch((error) => {
                      console.error("Error setting participants:", error);
                      handleOnError(
                        "Error setting participants. Please try again later."
                      );
                      // window.location.replace("/response/error/checkout");
                    });
                } else {
                  console.log("Transaction is not complete");
                  handleOnError("Transaction is not complete.");
                  window.location.replace("/response/error/transaction");
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
              // window.location.replace("/response/error/checkout");
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
        setTimeout(() => {
          getEnv();
        }, 5000); // Attendre 5 secondes avant de relancer
      }
    };

    getEnv();
  }, [price]);

  return (
    // <>{price !== 0 ? <div id="paypal-button-container" /> : <p>Test</p>}</>
    <>
      <div id="paypal-button-container" />
    </>
  );
};

export default PaypalButtonComponent;
