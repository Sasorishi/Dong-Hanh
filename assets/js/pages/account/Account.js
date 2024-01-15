import React, { useState, useEffect } from "react";
import axios from "axios";
import Order from "../../components/tickets/OrderComponent";

const Account = () => {
  const [ticketData, setTicketData] = useState(null);
  const [error, setError] = useState(null);

  const closeToast = () => {
    setError(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/tickets");
        const data = response.data;

        if (data.tickets) {
          setTicketData(null);
        } else {
          setTicketData(data.ticket);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du ticket",
          error
        );
        setError("Server request fetch tickets data fail.");

        setTimeout(() => {
          closeToast();
        }, 5000);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      {!ticketData ? (
        <div className="w-full bg-whitesmoke border rounded-lg shadow mt-4 mb-4">
          <div className="py-2 px-4 flex flex-col text-gray-500">
            <p>
              You don't have a ticket yet. You can buy one{" "}
              <a href="/events">here</a>.
            </p>
          </div>
        </div>
      ) : (
        <Order />
      )}
    </section>
  );
};

export default Account;
