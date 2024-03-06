import React, { useState, useEffect } from "react";
import Toast from "../../components/ToastComponent";

const Login = () => {
  const [error, setError] = useState(null);

  const closeToast = () => {
    setError(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const errorFromSymfony = window.errorFromSymfony;

      if (errorFromSymfony) {
        if (errorFromSymfony.message) {
          setError(errorFromSymfony.message);

          setTimeout(() => {
            closeToast();
          }, 5000);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative mx-auto">
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
        {error && <Toast message={error} onClose={closeToast} error={true} />}
        <div className="flex flex-col text-center justify-center mx-auto">
          <span className="mt-3">Login</span>
        </div>

        <form method="POST" className="mt-6">
          <div>
            <label htmlFor="_username" className="block text-sm text-darkblue">
              Email
            </label>
            <input
              type="text"
              name="_username"
              placeholder="Enter your email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="_password"
                className="block text-sm text-darkblue"
              >
                Password
              </label>
            </div>

            <input
              type="password"
              name="_password"
              placeholder="Enter your password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
