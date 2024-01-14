import React, { useState, useEffect } from "react";
import axios from "axios";
import Order from "../../components/tickets/OrderComponent";

const Account = () => {
  const [ticketData, setTicketData] = useState(null);
  const [expire, setExpire] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/api/account");
  //       const data = response.data;

  //       // Mettez à jour l'état avec les données reçues
  //       setTicketData(data.ticket);
  //       setExpire(data.expire);
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de la récupération des données du ticket",
  //         error
  //       );
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <section>
      <Order />
      <Order />
    </section>
  );
};

export default Account;
