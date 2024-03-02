import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/LoaderComponent";
import eyeIcon from "../../../../public/icons/eye.svg";

const EventParticipants = () => {
  const [participants, setParticipants] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getParticipants = async () => {
      try {
        const response = await axios.get(`/api/events/${id}/participants`);

        if (response.status === 200) {
          const data = response.data;
          setParticipants(data.participants);
          console.log(data.participants);
        } else {
          console.error("Erreur lors de requête api");
          setParticipants([]);
        }
      } catch (error) {
        console.error("Erreur lors de requête api", error);
        setParticipants([]);
      } finally {
        setLoading(false);
      }
    };

    getParticipants();
  }, []);

  return (
    <section className="p-0 sm:ml-64">
      <div className="p-4 mt-16">
        <div className="rounded-lg shadow-lg">
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Lastname
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Firstname
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created at
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  participants.length > 0 ? (
                    participants.map((participant, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{participant.lastname}</td>
                        <td className="px-6 py-4">{participant.firstname}</td>
                        <td className="px-6 py-4">{participant.country}</td>
                        <td className="px-6 py-4">{participant.gender}</td>
                        <td className="px-6 py-4">{participant.payment}</td>
                        <td className="px-6 py-4">{participant.created_at}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <a
                            href=""
                            className="font-medium text-darkblue hover:underline"
                          >
                            <img src={eyeIcon} width={16} alt="Eye Icon" />
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td colSpan="7" className="px-6 py-4 text-center">
                        No participants available at the moment.
                      </td>
                    </tr>
                  )
                ) : (
                  <Loader />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventParticipants;
