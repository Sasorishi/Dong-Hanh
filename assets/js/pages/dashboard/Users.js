import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/LoaderComponent";
import editIcon from "../../../../public/icons/edit.svg";
import EditModal from "../../components/dashboard/EditModalComponent";

const Users = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openModalForUser = (userId) => {
    setSelectedUserId(userId);
  };

  const closeModal = () => {
    setSelectedUserId(null);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/users/getUsers");

        if (response.status === 200) {
          const data = response.data;
          setUsers(data.users);
        } else {
          console.error("Erreur lors de requête api");
          setUsers([]);
        }
      } catch (error) {
        console.error("Erreur lors de requête api", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <section className="p-0 sm:ml-48">
      <div className="p-4 mt-16">
        <div className="my-4 flex justify-end">
          <a
            href=""
            className="block animation-hover rounded-full bg-darkblue px-3 py-2 text-center text-sm font-semibold uppercase text-white shadow-sm hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <button
              type="button"
              className="uppercase text-white font-medium rounded-full text-sm text-center"
            >
              Create user
            </button>
          </a>
        </div>
        <div className="rounded-lg shadow-lg">
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Password request
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created at
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {!loading ? (
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {user.id}
                        </th>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.password_request}</td>
                        <td className="px-6 py-4">{user.created_at}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <a
                            href="#"
                            type="button"
                            data-modal-target="editModal"
                            data-modal-show="editModal"
                            className="font-medium text-darkblue hover:underline"
                          >
                            <img src={editIcon} width={16} alt="Edit Icon" />
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-white border-b">
                      <td colSpan="4" className="px-6 py-4 text-center">
                        No users available at the moment.
                      </td>
                    </tr>
                  )}
                </tbody>
              ) : (
                <Loader />
              )}
            </table>
            <a
              href="#"
              type="button"
              data-modal-target="editModal"
              data-modal-show="editModal"
              className="font-medium text-darkblue hover:underline"
            >
              <img src={editIcon} width={16} alt="Edit Icon" />
            </a>
            <EditModal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;
