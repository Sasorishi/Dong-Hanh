import React, { useState, useEffect } from "react";
import axios from "../../api";
import Toast from "../components/ToastComponent";

const Login = () => {
  const [error, setError] = useState(null);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get("/api/is-authenticated");

      if (response.status === 200) {
        const data = response.data;
        return data.isAuthenticated;
      } else {
        console.error("Erreur lors de la vérification de l'authentification");
        setError("Erreur lors de la vérification de l'authentification");
        return false;
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'authentification",
        error
      );
      return false;
    }
  };

  const closeToast = () => {
    setError(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (window.errorFromSymfony) {
        console.log("Error from Symfony:", window.errorFromSymfony);
        setError(window.errorFromSymfony);
      }

      const isAuthenticated = await checkAuthentication();
      console.log("L'utilisateur est connecté :", isAuthenticated);

      if (isAuthenticated) {
        window.location.href = "/";
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative mx-auto">
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
        {error && <Toast message={error} onClose={closeToast} error={true} />}
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>

        <form method="POST" className="mt-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="text"
              name="_username"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
              >
                Forget Password?
              </a>
            </div>

            <input
              type="password"
              name="_password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          {" "}
          Don't have an account?{" "}
          <a
            href="#"
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Create One
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
