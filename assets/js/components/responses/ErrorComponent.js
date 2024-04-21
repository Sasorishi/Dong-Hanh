import React, { useEffect, useState } from "react";
import GirlRice from "../../../../public/images/vector-free-rice-field-background.png";

const ErrorComponent = ({ response }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    switch (response) {
      case "contact":
        setMessage(
          <p>
            Oops! Your message can't be sent, please try again.{" "}
            <a href="mailto:contact@dong-hanh.com" className="text-darkblue">
              contact@dong-hanh.com
            </a>
            .
          </p>
        );
        break;

      case "register":
        setMessage(
          <p>
            Oops! The register form is closed. If you have any questions, please
            email. If you have any questions, please email{" "}
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
            Oops ! retry again. If you have any questions, please email{" "}
            <a href="mailto:contact@dong-hanh.com" className="text-darkblue">
              contact@dong-hanh.com
            </a>
            .
          </p>
        );
        break;

      case "timeout":
        setMessage(
          <p>Your sessions checkout has expired. Please redo the process.</p>
        );
        break;

      case "checkout":
        setMessage(<p>Error setting participants. Please redo the process.</p>);
        break;

      case "transaction":
        setMessage(
          <p>Transaction is not complete. Please redo the process.</p>
        );
        break;

      default:
        setMessage(
          <p>
            Oops! Something wrong. If you have any questions, please email{" "}
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

export default ErrorComponent;
