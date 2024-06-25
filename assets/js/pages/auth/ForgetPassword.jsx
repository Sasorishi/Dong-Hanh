import React, { useState } from "react";
import Toast from "@components/ToastComponent";
import axios from "axios";
import Loader from "@components/LoaderComponent";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  const closeToast = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("/api/auth/forget_password", {
        email: email,
      });

      const data = response.data;

      if (data.success == true) {
        window.location.href = "/response/success/forgetPassword";
      } else {
        setError("Email don't exists.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Server request fail.");
    }
  };

  return (
    <section className="relative mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-whitesmoke rounded-lg shadow-md">
          {error && <Toast message={error} onClose={closeToast} error={true} />}
          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm text-darkblue">
                Email
              </label>
              <input
                type="text"
                name="_username"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Valide
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default ForgetPassword;
