import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "@components/LoaderComponent";
import Toast from "@components/ToastComponent";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const { token } = useParams();

  const closeToast = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (password.length < 6) {
        setError("Password too short. Require minimun 6 characters.");
        return;
      }

      if (password != confirmPassword) {
        setError("Password confirmation does not match.");
        return;
      }

      const response = await axios.post("/api/auth/reset_password", {
        password: password,
        token: token,
      });

      const data = response.data;

      if (data.success == true) {
        window.location.href = "/response/success/resetPassword";
      } else {
        setError("Password cannot be set.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Server request fail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
          {error && <Toast message={error} onClose={closeToast} error={true} />}
          {/* <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            /> */}
          <span className="mt-3">Reset Your Password</span>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm text-darkblue">
                Your new password
              </label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-darkblue"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default ResetPassword;
