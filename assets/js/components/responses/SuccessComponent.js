import React, { useState, useEffect } from "react";
import GirlRice from "../../../../public/images/vector-free-rice-field-background.png";

const SuccessComponent = ({ response }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    switch (response) {
      case "contact":
        setMessage(
          <p>
            We appreciate your message! If you have any questions, please email{" "}
            <a href="mailto:contact@dong-hanh.com" className="text-darkblue">
              contact@dong-hanh.com
            </a>
            .
          </p>
        );
        break;

      case "checkout":
        setMessage(
          <p>
            Thank you! See you soon. You can check your ticket{" "}
            <a href="{{ path('app_account') }}" className="text-darkblue">
              here
            </a>
            . If you have any questions, please email{" "}
            <a href="mailto:contact@dong-hanh.com" className="text-darkblue">
              contact@dong-hanh.com
            </a>
            .
          </p>
        );
        break;

      case "refund":
        setMessage(
          <p>
            Your refund is complete. If you have any questions, please email{" "}
            <a href="mailto:contact@dong-hanh.com" className="text-darkblue">
              contact@dong-hanh.com
            </a>
            .
          </p>
        );
        break;

      case "signup":
        setMessage(
          <p>
            Your inscription is complete. You can log in with your account now!
            If you have any questions, please email{" "}
            <a href="mailto:contact@dong-hanh.com" className="text-darkblue">
              contact@dong-hanh.com
            </a>
            .
          </p>
        );
        break;

      case "forgottenPassword":
        setMessage(
          <p>
            Your password has changed. You can log in with your account now! If
            you have any questions, please email{" "}
            <a href="mailto:contact@dong-hanh.com" className="text-darkblue">
              contact@dong-hanh.com
            </a>
            .
          </p>
        );
        break;

      default:
        setMessage(
          <p>
            Thank you ! If you have any questions, please email{" "}
            <a href="mailto:contact@dong-hanh.com" className="text-darkblue">
              contact@dong-hanh.com
            </a>
            .
          </p>
        );
        break;
    }
  }, [response]);

  return (
    <section className="container mx-auto">
      <div className="flex flex-col items-center">
        <div className="mt-5 mb-5">
          <img src={GirlRice} width="350" alt="image-filler" />
        </div>
        <div className="w-full text-center">
          {message}
          <p>
            Return to{" "}
            <a href="/" className="text-darkblue">
              homepage
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessComponent;
