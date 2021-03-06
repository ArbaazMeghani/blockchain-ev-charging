import React from "react";
import CloseIcon from "../icons/CloseIcon";

const Modal = ({ children, onClose }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen overflow-hidden absolute left-0 top-0 bg-gray-900 bg-opacity-80 z-30">
      <div className="h-screen w-screen absolute" onClick={onClose} />
      <div className="w-11/12 h-11/12 md:w-2/5 md:h-4/5 rounded-lg shadow-2xl shadow-black bg-gradient-to-b from-violet-800 to-indigo-900 relative">
        <button
          className="mt-4 mr-4 hover:text-gray-600 transition-colors duration-300 absolute top-0 right-0 z-10"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <div className="mt-4 h-full w-full z-0">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
