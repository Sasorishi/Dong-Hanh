import React, { useState, useEffect } from "react";
import Toast from "../../components/ToastComponent";
import axios from "axios";
import Loader from "../../components/LoaderComponent";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const closeToast = () => {
    setError(null);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (password.length < 6) {
        setError("Password too short. Require minimun 6 characters.");
        return;
      }

      const combinedData = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      const response = await axios.post("/api/auth/signup", combinedData);

      if (response.data.success !== false) {
        setIsRegistered(true);
      } else {
        setError(`Error : ${response.data.message}.`);

        setTimeout(() => {
          closeToast();
        }, 5000);
      }
    } catch (error) {
      // console.error("Server request fail.", error);
      setError("Error signup");

      setTimeout(() => {
        closeToast();
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isRegistered) {
      window.location.href = "/response/success/signup";
    }
  }, [isRegistered]);

  return (
    <section className="relative mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
          {error && <Toast message={error} onClose={closeToast} error={true} />}
          <div className="flex flex-col text-center justify-center mx-auto">
            {/* <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            /> */}
            <span className="mt-3">Signup</span>
          </div>

          <form className="mt-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="block text-sm text-darkblue">
                Email
              </label>
              <input
                type="text"
                name="_username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@gmail.com"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-darkblue"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                name="_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-darkblue"
                >
                  Confirm password
                </label>
              </div>
              <input
                type="password"
                name="_confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-darkblue rounded-lg hover:bg-bordeau focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            {" "}
            Already have an account ?{" "}
            <a
              href="/login"
              className="font-medium text-gray-700 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      )}
    </section>
  );
};

export default Signup;
