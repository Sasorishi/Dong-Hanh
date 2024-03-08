import React from "react";
import Logo from "../../../../public/images/vietnam.png";

const Footer = ({ dashboard }) => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer
      className={`bg-amber text-cognac p-16 ${dashboard ? "sm:ml-64" : ""}`}
    >
      <div className="sm:flex sm:items-center sm:justify-between">
        <a
          href="/"
          className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse justify-center sm:justify-left md:justify-left lg:justify-left"
        >
          <img src={Logo} className="h-8" alt="Đồng Hành Network Logo" />
          <span className="brand self-center text-sm font-semibold whitespace-nowrap">
            Đồng Hành Network
          </span>
        </a>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
          <li>
            <a href="/about" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="/privacy_policy" className="hover:underline me-4 md:me-6">
              Terms and Conditions of Sale
            </a>
          </li>
          <li>
            <a href="/privacy_policy" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/donghanhvn/"
              target="_blank"
              className="hover:underline"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
      <hr className="w-full border-2 my-6 text-whitesmoke sm:mx-auto lg:my-8" />
      <div className="text-center">
        <p>
          © Copyright 2022 - {currentYear} |{" "}
          <a className="text-reset fw-bold" href="/">
            Đồng Hành Network
          </a>{" "}
          |{" "}
          <a href="https://viettan.org/" target="_blank">
            VIET TAN
          </a>{" "}
          | All Rights Reserved by Đồng Hành Network
        </p>
      </div>
    </footer>
  );
};

export default Footer;
