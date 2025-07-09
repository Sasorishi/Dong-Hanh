import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const TicketCheck = () => {
  const [searchParams] = useSearchParams();
  const [ticketInfo, setTicketInfo] = useState(null);
  const [error, setError] = useState(null);

  const ticketId = searchParams.get("ticket");
  const eventId = searchParams.get("event");

  useEffect(() => {
    if (ticketId && eventId) {
      axios
        .get(`/api/ticket_check?ticket=${ticketId}&event=${eventId}`)
        .then((res) => setTicketInfo(res.data))
        .catch((err) => setError("Erreur lors de la récupération du ticket"));
    }
  }, [ticketId, eventId]);

  if (error) {
    return <div className="text-red-600 text-center mt-8">{error}</div>;
  }

  if (!ticketId || !eventId) {
    return (
      <div className="text-center mt-8">Paramètres manquants dans l’URL.</div>
    );
  }

  if (!ticketInfo) {
    return <div className="text-center mt-8">Chargement...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-4">
          Résultat du scan
        </h2>
        {ticketInfo.success === false ? (
          <div className="text-red-600 text-center">{ticketInfo.message}</div>
        ) : (
          <div>
            <div className="mb-4 text-green-700 font-semibold text-center">
              {ticketInfo.message}
            </div>
            {ticketInfo.ticket && ticketInfo.ticket[0] && (
              <ul className="space-y-2">
                {Object.entries(ticketInfo.ticket[0]).map(([key, value]) => (
                  <li key={key} className="flex justify-between">
                    <span className="font-medium text-gray-700">{key} :</span>
                    <span className="text-gray-900">{value}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCheck;
