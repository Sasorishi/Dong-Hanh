import React, { useState, useEffect } from "react";
import axios from "axios";
import Order from "@components/tickets/OrderComponent";
import Loader from "@components/LoaderComponent";
import Toast from "@components/ToastComponent";

const Tickets = () => {
  const [ticketsData, setTicketsData] = useState(null);
  const [ordersData, setOrdersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const closeToast = () => {
    setError(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/tickets");
        const data = response.data;
        setTicketsData(Object.values(data.tickets) || []);
        setOrdersData(Object.values(data.orders) || []);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du ticket",
          error
        );
        setError("Server request fetch tickets data fail.");

        setTimeout(() => {
          closeToast();
        }, 5000);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      {error && <Toast message={error} onClose={closeToast} error={true} />}
      {!loading ? (
        !ticketsData ? (
          <div className="w-full bg-whitesmoke border rounded-lg shadow mt-4 mb-4">
            <div className="py-2 px-4 flex flex-col text-gray-500">
              <p className="text-center">
                You don't have a ticket yet. You can buy one{" "}
                <a href="/events">here</a>.
              </p>
            </div>
          </div>
        ) : (
          ticketsData.map((data, index) => (
            <Order
              key={index}
              ticketsData={data}
              index={index}
              ordersData={ordersData}
            />
          ))
        )
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Tickets;
