import React, { useState, useEffect } from "react";
import Toast from "../../components/ToastComponent";

const Login = () => {
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const closeToast = () => {
    setError(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const errorFromSymfony = window.errorFromSymfony;

      if (errorFromSymfony) {
        if (errorFromSymfony.message) {
          console.log("Error from Symfony:", errorFromSymfony.message);
          setError(errorFromSymfony.message);

          setTimeout(() => {
            closeToast();
          }, 5000);
        }
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setTimeout(() => {
        closeToast();
      }, 5000);
      return;
    }
  };

  return (
    <section className="relative mx-auto">
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
        {error && (
          <Toast
            message={error}
            onClose={closeToast}
            error={errorFromSymfony.success}
          />
        )}
        <div className="flex flex-col text-center justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
          <span className="mt-3">Signin</span>
        </div>

        <form method="POST" className="mt-6">
          <div>
            <label htmlFor="email" className="block text-sm text-darkblue">
              Email
            </label>
            <input
              type="text"
              name="_username"
              placeholder="jean-dupont@gmail.com"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm text-darkblue">
                Password
              </label>
            </div>
            <input
              type="password"
              name="_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm text-darkblue">
                Confirm password
              </label>
            </div>
            <input
              type="password"
              name="_confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
