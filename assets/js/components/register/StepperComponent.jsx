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
