import React from "react";
import { Marker } from "react-map-gl";
import LocationMarker from "../icons/LocationMarker";

const MapMarker = ({
  station,
  hovering,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const hoveringClass = hovering ? "text-red-700" : "text-red-800";
  console.log(hoveringClass);
  return (
    <Marker
      longitude={station.longitude}
      latitude={station.latitude}
      key={station.id}
      onClick={onClick}
      offsetLeft={-10}
      offsetTop={-10}
    >
      <div
        className={
          (hovering ? "text-red-700" : "text-red-800") + " hover:cursor-pointer"
        }
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <LocationMarker />
      </div>
    </Marker>
  );
};

export default MapMarker;
