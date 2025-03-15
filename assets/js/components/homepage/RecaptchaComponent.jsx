import React from "react";

const RecaptchaComponent = () => {
  return (
    <div
      id="recaptcha"
      className="g-recaptcha"
      data-sitekey={import.meta.env.VITE_API_RECAPTCHA_KEY}
    />
  );
};

export default RecaptchaComponent;
