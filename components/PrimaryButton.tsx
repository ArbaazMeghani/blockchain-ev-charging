import React from "react";

type Props = {
  onClick?: () => void;
  value: string;
  type?: "submit" | "button";
};

const PrimaryButton = ({ onClick = () => {}, value, type }: Props) => {
  return (
    <button
      className="p-2 rounded-xl bg-violet-700 mb-8 hover:bg-violet-800 transition-colors duration-300 mr-4"
      onClick={onClick}
      type={type}
    >
      {value}
    </button>
  );
};

export default PrimaryButton;
