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
          {/* <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          /> */}
          <span className="mt-3">Login</span>
        </div>

        <form method="POST" className="mt-6">
          <div>
            <label htmlFor="email" className="block text-sm text-darkblue">
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
              <label htmlFor="password" className="block text-sm text-darkblue">
                Password
              </label>
              <a
                href="/forget_password"
                className="text-xs text-gray-600 hover:underline"
              >
                Forget Password?
              </a>
            </div>

            <input
              type="password"
              name="_password"
              placeholder="Enter your password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="animation-hover w-full uppercase px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-darkblue rounded-lg hover:bg-bordeau focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          {" "}
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-gray-700 hover:underline"
          >
            Create One
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
