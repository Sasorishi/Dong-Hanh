import React, { useEffect, useState } from "react";
import axios from "../../../api";
import { useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path) => {
    switch (path) {
      case "login":
        navigate("/login");
        break;

      case "logout":
        window.location.href = "/logout";
        break;

      case "account":
        window.location.href = "/account";
        break;

      default:
        window.location.href = "/";
        break;
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative w-full z-20 top-0 start-0 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="brand self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Đồng Hành Network
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isAuthenticated ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleNavigation("account")}
                className="animation-hover text-white uppercase bg-darkblue hover:bg-rosered font-medium rounded-full text-sm px-4 py-2 text-center"
              >
                Account
                <i className="ml-3 text-amber fa-solid fa-user" />
              </button>
              <button
                type="button"
                onClick={() => handleNavigation("logout")}
                className="animation-hover text-white uppercase bg-darkblue hover:bg-rosered font-medium rounded-full text-sm px-4 py-2 text-center"
              >
                Logout
                <i className="ml-3 text-amber fa-solid fa-user" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => handleNavigation("login")}
              className="animation-hover text-white uppercase bg-darkblue hover:bg-rosered font-medium rounded-full text-sm px-4 py-2 text-center"
            >
              Login
              <i className="ml-3 text-amber fa-solid fa-user" />
            </button>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden w-full md:w-auto`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-4">
          <li>
            <a href="/" className="text-white py-2 md:py-0">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="text-white py-2 md:py-0">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="text-white py-2 md:py-0">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
