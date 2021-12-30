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
          (hovering ? "text-red-700" : "text-red-800") +
          " hover:cursor-pointer transition-colors duration-300"
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
