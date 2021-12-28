import React from "react";
import StationIcon from "../icons/StationIcon";

const SideBarItem = ({
  item,
  selected,
  hovering,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const hoveringClass = hovering ? "bg-violet-800" : "";
  const selectedClass = selected ? "bg-violet-900" : "";
  return (
    <div
      className={
        hoveringClass +
        selectedClass +
        " flex flex-row justify-evenly items-center border-b-2 border-gray-300 w-full p-4 transition-colors duration-200"
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <StationIcon />
      <h3>{item.title}</h3>
      <div className="flex flex-col justify-start items-start">
        <h3>{item.streetAddress}</h3>
        <h3>
          {item.city}, {item.state} {item.zipCode}
        </h3>
      </div>
      <h3>${item.price}</h3>
    </div>
  );
};

export default SideBarItem;
