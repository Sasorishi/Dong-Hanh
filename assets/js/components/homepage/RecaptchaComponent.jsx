import React, { useState, useEffect } from "react";
import axios from "axios";

const RecaptchaComponent = () => {
  const [publicKey, setPublicKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEnv = async () => {
      try {
        const response = await axios.post("/api/env-data", {
          env: "app.recaptcha_key",
        });
        const data = response.data;
        const key = data.varEnv;
        setPublicKey(key);
      } catch (error) {
        handleOnError(
          "Error. Fail to retrieve tickets data. Try again or later."
        );
      } finally {
        setLoading(false);
      }
    };

    getEnv();
  }, []);

  return (
    <>
      {!loading && (
        <div id="recaptcha" className="g-recaptcha" data-sitekey={publicKey} />
      )}
    </>
  );
};

export default RecaptchaComponent;
