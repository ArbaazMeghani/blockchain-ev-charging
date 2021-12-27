import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import LocationMarker from "../icons/LocationMarker";

const Map = ({ stations, location, showStation }) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: location.latitude,
    longitude: location.longitude,
    zoom: 13,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      onViewportChange={(updatedViewport) =>
        setViewport({ ...updatedViewport, width: "100%", height: "100%" })
      }
      {...viewport}
    >
      {stations.map((station) => (
        <Marker
          longitude={station.longitude}
          latitude={station.latitude}
          key={station.id}
          onClick={() => showStation(station)}
        >
          <div className="text-red-800 hover:cursor-pointer">
            <LocationMarker />
          </div>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default Map;
