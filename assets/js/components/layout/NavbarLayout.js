import React, { useState } from "react";
import Logo from "../../../../public/images/vietnam.png";
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

      case "signup":
        navigate("/signup");
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
      <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-8" alt="Đồng Hành Logo" />
          <span className="brand self-center text-2xl font-semibold whitespace-nowrap">
            Đồng Hành Network
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isAuthenticated ? (
            <div className="hidden sm:flex md:flex lg:flex gap-2">
              <button
                type="button"
                onClick={() => handleNavigation("account")}
                className="animation-hover flex align-center text-white uppercase bg-darkblue hover:bg-bordeau font-medium rounded-full text-sm px-4 py-2 text-center"
              >
                Account
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-3 text-amber w-5 h-5 self-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleNavigation("logout")}
                className="animation-hover flex align-center text-white uppercase bg-darkblue hover:bg-bordeau font-medium rounded-full text-sm px-4 py-2 text-center"
              >
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-3 text-amber w-5 h-5 self-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <button
                type="button"
                onClick={() => handleNavigation("login")}
                className="animation-hover flex align-center text-white uppercase bg-darkblue hover:bg-bordeau font-medium rounded-full text-sm px-4 py-2 text-center"
              >
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-3 text-amber w-5 h-5 self-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleNavigation("signup")}
                className="animation-hover flex align-center text-white uppercase bg-darkblue hover:bg-bordeau font-medium rounded-full text-sm px-4 py-2 text-center"
              >
                Signup
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-3 text-amber w-5 h-5 self-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={toggleMenu}
            className="animation-hover inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-darkblue rounded-lg md:hidden hover:bg-whitesmoke focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5 text-darkblue"
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
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden w-full md:w-auto p-2`}
      >
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-darkblue md:flex-row md:space-x-8 rtl:space-x-reverse">
            {isAuthenticated ? (
              <>
                <li>
                  <a
                    href="/account"
                    className="animation-hover flex justify-center py-2 px-3 text-amber bg-darkblue hover:bg-bordeau rounded md:p-0"
                    aria-current="page"
                  >
                    Account
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="ml-3 text-amber w-5 h-5 self-center"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="/logout"
                    className="animation-hover flex justify-center py-2 px-3 text-amber bg-darkblue hover:bg-bordeau rounded md:border-0 md:p-0"
                  >
                    Logout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="ml-3 text-amber w-5 h-5 self-center"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                      />
                    </svg>
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/login"
                    className="animation-hover flex justify-center py-2 px-3 text-amber bg-darkblue hover:bg-bordeau rounded md:p-0"
                  >
                    Login
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="ml-3 text-amber w-5 h-5 self-center"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
