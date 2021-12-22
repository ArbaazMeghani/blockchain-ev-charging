import React from "react";

const SecondaryButton = ({ onClick, value }) => {
  return (
    <button
      className="p-2 rounded-xl border-2 border-slate-800 mb-8 hover:border-slate-900 transition-colors duration-300 mr-4"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default SecondaryButton;
