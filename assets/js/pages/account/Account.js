import React, { useState, useEffect } from "react";
import axios from "axios";

const Account = () => {
  const [ticketData, setTicketData] = useState(null);
  const [expire, setExpire] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/account");
        const data = response.data;

        // Mettez à jour l'état avec les données reçues
        setTicketData(data.ticket);
        setExpire(data.expire);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du ticket",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative">
      <div className="w-full h-screen">
        {/* <div className="grid grid-cols-3 progresses py-4">
          <div className="">
            <a href="/app_account">Tickets</a>
          </div>
          <div className="">
            <a href="/app_email">Change email</a>
          </div>
          <div className="">
            <a href="/app_email">Reset password</a>
          </div>
        </div> */}
        <div className="container">
          <div className="bg-cream shadow-lg rounded-lg p-12">
            <span>Your tickets</span>
            <div className="text-center mt-5">
              <div className="mx-auto">
                {ticketData !== null && ticketData["status"] === "COMPLETED" ? (
                  <>
                    <p>Dong Hanh - Summer camp, Trai He 2023</p>
                    <hr className="solid divider-center" />
                    <div className="align-items-center">
                      <div className="text-start">
                        <p style={{ fontSize: "1em" }}>
                          Attendee ID : {ticketData.participant}
                        </p>
                        <p style={{ fontSize: "1em" }}>
                          Location : Egerupvej 49, 4230 Sk&aelig;lsk&oslash;r,
                          Denmark
                        </p>
                        <p style={{ fontSize: "1em" }}>
                          Start Date / Time : 06 July, 2023
                        </p>
                        <p style={{ fontSize: "1em" }}>
                          Price : {ticketData.price} {ticketData.currency}
                        </p>
                      </div>
                      <div className="">
                        <img src={ticket_qrcode} alt="qrcode" />
                      </div>
                    </div>
                    <a
                      className="btn download btn-dark-blue btn-lg"
                      download={ticket_qrcode}
                      href={ticket_qrcode}
                      title="ticket"
                    >
                      download
                      <i className="fa-solid fa-file-arrow-down ms-2"></i>
                    </a>
                  </>
                ) : (
                  <p>
                    You don't have a ticket yet. You can buy one{" "}
                    <a href="/events">here</a>.
                  </p>
                )}
              </div>
              {ticketData !== null &&
                ticketData["status"] === "COMPLETED" &&
                expire === false && (
                  <div className="refundOrder mt-5">
                    <a
                      className="download"
                      data-bs-toggle="modal"
                      data-bs-target="#modalRefund"
                    >
                      refund the ticketData
                      <i className="fa-solid fa-xmark ms-2"></i>
                    </a>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
