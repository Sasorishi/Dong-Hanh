import React, { useState } from "react";

const ModalComponent = ({ id, title, content, onClose }) => {
  const [isModalVisible, setModalVisible] = useState(true);

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  return (
    <>
      {isModalVisible && (
        <div
          id={id}
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-black opacity-80" />
          <div className="relative p-4 w-full max-w-2xl">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 space-y-4 overflow-y-auto h-80">
                {content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-gray-500"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="flex items-center justify-end p-4 border-t rounded-b">
                {/* <button
                  onClick={handleCloseModal}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  I accept
                </button> */}
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
