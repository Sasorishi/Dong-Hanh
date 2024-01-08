import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import TicketInformation from "../../components/register/TicketInformationComponent";
import Stepper from "../../components/register/StepperComponent";

const Register = () => {
  const [tickets, setTickets] = useState(null);
  const [ticketData, setTicketData] = useState({});

  const { eventId, numTickets } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Données des tickets :", ticketData);

    try {
      const combinedData = {
        eventId: eventId,
        numTickets: numTickets,
        ...ticketData,
      };

      const response = await axios.post("/api/register", combinedData);

      if (response.status === 200) {
        console.log("Enregistrement réussi !");
      } else {
        console.error("Erreur lors de la requête API");
      }
    } catch (error) {
      console.error("Erreur lors de la requête API", error);
    }
  };

  useEffect(() => {
    const ticketComponents = Array.from({ length: numTickets }, (_, index) => (
      <TicketInformation
        key={index}
        ticketKey={index + 1}
        onTicketDataChange={(key, data) =>
          setTicketData((prevData) => ({ ...prevData, [key]: data }))
        }
      />
    ));

    const parsedNumTickets = parseInt(numTickets, 10);

    if (
      isNaN(parsedNumTickets) ||
      parsedNumTickets < 1 ||
      parsedNumTickets > 15
    ) {
      navigate("/");
    }

    setTickets(ticketComponents);
  }, []);

  return (
    <section className="bg-white">
      {Stepper()}
      <div className="py-24 sm:py-32 px-6 lg:px-8 rounded-lg">
        <form onSubmit={handleSubmit}>
          {tickets}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
