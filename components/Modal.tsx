import React from "react";
import CloseIcon from "../icons/CloseIcon";

const Modal = ({ children, onClose }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen overflow-hidden absolute left-0 top-0 bg-gray-900 bg-opacity-80">
      <div className="h-screen w-screen absolute" onClick={() => onClose()} />
      <div className="w-1/3 h-2/3 rounded-lg shadow-2xl bg-gradient-to-b from-violet-800 to-indigo-900">
        <button
          className="mt-8 mr-8 hover:text-gray-600 transition-colors duration-200 absolute top-0 right-0"
          onClick={() => onClose()}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
