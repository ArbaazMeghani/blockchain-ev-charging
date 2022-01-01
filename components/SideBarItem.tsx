import React from "react";
import LocationMarker from "../icons/LocationMarker";
import StationIcon from "../icons/StationIcon";
import MapMarker from "./MapMarker";

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
        " flex flex-row justify-start items-center shadow-xl w-full p-4 transition-colors duration-300 hover:cursor-pointer mt-2 overflow-hidden overflow-ellipsis"
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="flex flex-col justify-center items-center ml-4 mr-4">
        <span className="text-4xl text-red-700">
          <LocationMarker />
        </span>
        <h3>{item.price}ETH</h3>
      </div>
      <div className="lg:text-base md:text-sm flex flex-col justify-start items-start overflow-hidden">
        <h3 className="whitespace-nowrap overflow-hidden overflow-ellipsis">
          {item.title}
        </h3>
        <h3>{item.address}</h3>
      </div>
    </div>
  );
};

export default SideBarItem;
