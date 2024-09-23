import React, { useState } from "react";
import { Flex, Input, Typography } from "antd";
import Toast from "@components/ToastComponent";
import axios from "axios";

const AccountVerify = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);
  const [verified, setVerified] = useState(false);

  const url = new URL(window.location.href);
  let id = url.pathname.split("/").filter(Boolean).pop();

  const closeToast = () => {
    setError(null);
    setSuccess(null);
  };

  const handleAccountVerify = async (code) => {
    try {
      setLoading(true);
      const data = {
        code: code,
      };

      const response = await axios.post(`/api/auth/account-verify/${id}`, data);
      if (response.data.success !== false) {
        setVerified(true);
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

  const handleResendEmail = async () => {
    const response = await axios.post(`/api/auth/account-verify/resend/${id}`);
    console.log(response);
    if (response.data.success !== false) {
      setSuccess("Email sent successfully.");
    } else {
      setError(`Error : ${response.data.message}.`);
    }
  };

  const onChange = (text) => {
    handleAccountVerify(text);
  };

  const sharedProps = {
    onChange,
  };

  return (
    <section>
      {error && <Toast message={error} onClose={closeToast} error={true} />}
      {success && (
        <Toast message={success} onClose={closeToast} error={false} />
      )}
      {verified ? (
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-whitesmoke rounded-lg shadow-md">
          <div className="flex flex-col text-center justify-center mx-auto">
            <span className="mt-3">Verify your account</span>
          </div>
          <div className="mt-6">
            <p className="text-center mb-6">Your email is verified</p>
            <a href="/" className="text-darkblue text-center block">
              Go to homepage
            </a>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-whitesmoke rounded-lg shadow-md">
          <div className="flex flex-col text-center justify-center mx-auto">
            <span className="mt-3">Verify your account</span>
          </div>
          <form className="mt-6">
            <p className="text-center mb-6">
              Enter the code you have <br /> received by email
            </p>
            <div className="text-center">
              <Input.OTP length={6} {...sharedProps} />
            </div>
            <p className="text-center mt-6">
              If you have not received it, <br /> click on the link below
            </p>
            <p className="text-center mt-4">
              <a
                onClick={() => handleResendEmail()}
                style={{ cursor: "pointer" }}
              >
                Resend me an email
              </a>
            </p>
          </form>
        </div>
      )}
    </section>
  );
};

export default AccountVerify;
