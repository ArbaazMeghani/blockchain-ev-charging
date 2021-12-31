import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import MapMarker from "./MapMarker";

const Map = ({
  stations,
  location,
  showStation,
  hoveringStation,
  onHoverStation,
}) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: location.latitude,
    longitude: location.longitude,
    zoom: 1,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      onViewportChange={(updatedViewport) =>
        setViewport({ ...updatedViewport, width: "100%", height: "100%" })
      }
      {...viewport}
      minZoom={1}
    >
      {stations.map((station) => (
        <MapMarker
          station={station}
          hovering={hoveringStation && station.id === hoveringStation.id}
          onClick={() => showStation(station)}
          onMouseEnter={() => onHoverStation(station)}
          onMouseLeave={() => onHoverStation(null)}
        />
      ))}
    </ReactMapGL>
  );
};

export default Map;
