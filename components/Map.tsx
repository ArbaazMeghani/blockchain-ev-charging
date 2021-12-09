import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import StationIcon from "../icons/StationIcon";

const Map = ({ stations, location }) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: location.latitude,
    longitude: location.longitude,
    zoom: 13,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      onViewportChange={(updatedViewport) =>
        setViewport({ ...updatedViewport, width: "100%", height: "100%" })
      }
      {...viewport}
    >
      {stations.map((station) => (
        <Marker longitude={station.longitude} latitude={station.latitude}>
          <StationIcon />
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default Map;
