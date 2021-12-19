import React from "react";
import StationIcon from "../icons/StationIcon";

const SideBarItem = ({ item }) => {
  return (
    <div className="flex flex-row justify-between items-center border-b-2 border-gray-300 mt-4 mb-4">
      <StationIcon />
      <div className="flex flex-col justify-start items-start">
        <h3>{item.title}</h3>
        <h3>{item.streetAddress}</h3>
        <h3>
          {item.city}, {item.state} {item.zipCode}
        </h3>
        <h3>${item.price}</h3>
      </div>
    </div>
  );
};

export default SideBarItem;
