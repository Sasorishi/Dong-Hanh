import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/LoaderComponent";
import editIcon from "../../../../public/icons/edit.svg";
import listIcon from "../../../../public/icons/list.svg";

const EventsCategories = () => {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get("/api/events/getCategories");

        if (response.status === 200) {
          const data = response.data;
          setCategories(data.categories);
          console.log(data.categories);
        } else {
          console.error("Erreur lors de requête api");
          setCategories([]);
        }
      } catch (error) {
        console.error("Erreur lors de requête api", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  return (
    <section className="p-0 sm:ml-48">
      <div className="p-4 mt-16">
        <div className="rounded-lg shadow-lg">
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Label
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {!loading ? (
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {category.id}
                        </th>
                        <td className="px-6 py-4">{category.label}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <a
                            href={`/categories/${category.id}`}
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
                        No categories available at the moment.
                      </td>
                    </tr>
                  )}
                </tbody>
              ) : (
                <Loader />
              )}
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCategories;
