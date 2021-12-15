import React from "react";
import PlusIcon from "../icons/PlusIcon";

const PlusButton = ({ setStationData }) => {
  return (
    <button
      className="rounded-full text-gray-200 bg-blue-600 z-0 shadow-2xl absolute mr-12 mb-12 p-4 bottom-0 right-0 hover:bg-blue-500 transform transition-all"
      onClick={() => setStationData({ edit: true })}
    >
      <PlusIcon />
    </button>
  );
};

export default PlusButton;
