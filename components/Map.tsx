import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 41.5868,
    longitude: -93.625,
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
    />
  );
};

export default Map;
