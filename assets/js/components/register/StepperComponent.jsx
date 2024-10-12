import React from "react";

const StepperComponent = ({ currentStep }) => {
  return (
    <div>
      <ol className="flex items-center w-full">
        <li
          className={`flex w-full items-center ${
            currentStep <= 1 ? "text-amber" : "text-charcoal"
          } after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block`}
        >
          {currentStep <= 1 ? (
            <span className="flex items-center justify-center w-10 h-10 bg-charcoal rounded-full lg:h-12 lg:w-12 shrink-0">
              <svg
                className="w-4 h-4 text-whitesmoke lg:w-5 lg:h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
              </svg>
            </span>
          ) : (
            <span className="flex items-center justify-center w-9 h-9 bg-amber rounded-full lg:h-10 lg:w-10 shrink-0">
              <svg
                className="w-3.5 h-3.5 text-whitesmoke lg:w-4 lg:h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
          )}
        </li>
        <li
          className={`flex w-full items-center ${
            currentStep <= 2 ? "text-amber" : "text-charcoal"
          } after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block`}
        >
          {currentStep <= 2 ? (
            <span className="flex items-center justify-center w-10 h-10 bg-charcoal rounded-full lg:h-12 lg:w-12 shrink-0">
              <svg
                className="w-4 h-4 text-whitesmoke lg:w-5 lg:h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M256 0c-35 0-64 59.5-64 93.7l0 84.6L8.1 283.4c-5 2.8-8.1 8.2-8.1 13.9l0 65.5c0 10.6 10.2 18.3 20.4 15.4l171.6-49 0 70.9-57.6 43.2c-4 3-6.4 7.8-6.4 12.8l0 42c0 7.8 6.3 14 14 14c1.3 0 2.6-.2 3.9-.5L256 480l110.1 31.5c1.3 .4 2.6 .5 3.9 .5c6 0 11.1-3.7 13.1-9C344.5 470.7 320 422.2 320 368c0-60.6 30.6-114 77.1-145.6L320 178.3l0-84.6C320 59.5 292 0 256 0zM640 368a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L480 385.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z" />
              </svg>
            </span>
          ) : (
            <span className="flex items-center justify-center w-9 h-9 bg-amber rounded-full lg:h-10 lg:w-10 shrink-0">
              <svg
                className="w-3.5 h-3.5 text-whitesmoke lg:w-4 lg:h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
          )}
        </li>
        <li
          className={`flex w-full items-center ${
            currentStep <= 2 ? "text-amber" : "text-charcoal"
          } after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block`}
        >
          {currentStep <= 2 ? (
            <span className="flex items-center justify-center w-10 h-10 bg-charcoal rounded-full lg:h-12 lg:w-12 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-whitesmoke"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
            </span>
          ) : (
            <span className="flex items-center justify-center w-9 h-9 bg-amber rounded-full lg:h-10 lg:w-10 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-whitesmoke"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
            </span>
          )}
        </li>
        <li
          className={`flex items-center ${
            currentStep >= 3 ? "text-whitesmoke" : ""
          }`}
        >
          {currentStep >= 3 ? (
            <span className="flex items-center justify-center w-10 h-10 bg-charcoal rounded-full lg:h-12 lg:w-12 shrink-0">
              <svg
                className="w-4 h-4 text-whitesmoke lg:w-5 lg:h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
              </svg>
            </span>
          ) : (
            <span className="flex items-center justify-center w-10 h-10 bg-charcoal rounded-full lg:h-12 lg:w-12 shrink-0">
              <svg
                className="w-4 h-4 text-whitesmoke lg:w-5 lg:h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
              </svg>
            </span>
          )}
        </li>
      </ol>
    </div>
  );
};

export default StepperComponent;
