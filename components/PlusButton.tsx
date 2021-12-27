import React from "react";
import PlusIcon from "../icons/PlusIcon";

const PlusButton = ({ onClick }) => {
  return (
    <button
      className="rounded-full text-gray-200 bg-violet-800 z-0 shadow-2xl shadow-black absolute mr-12 mb-12 p-4 bottom-0 right-0 hover:bg-violet-500 transition-colors duration-300"
      onClick={onClick}
    >
      <PlusIcon />
    </button>
  );
};

export default PlusButton;
