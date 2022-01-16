import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SideBarItem from "./SideBarItem";

const SideBar = ({
  stations,
  setLocation,
  selectedStation,
  showStation,
  hoveringStation,
  onHoverStation,
  mapRef,
}) => {
  const [neLng, setNeLng] = useState(0);
  const [neLat, setNeLat] = useState(0);
  const [swLng, setSwLng] = useState(0);
  const [swLat, setSwLat] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const inBounds = (station) => {
    const { latitude, longitude } = station;
    return (
      latitude >= swLat &&
      latitude <= neLat &&
      longitude >= swLng &&
      longitude <= neLng
    );
  };

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const newInterval = setInterval(() => {
      if (mapRef && mapRef.current) {
        const bounds = mapRef.current.getMap().getBounds();
        setNeLng(bounds.getNorthEast().lng);
        setNeLat(bounds.getNorthEast().lat);
        setSwLng(bounds.getSouthWest().lng);
        setSwLat(bounds.getSouthWest().lat);
      }
    }, 500);
    setIntervalId(newInterval);
  }, [mapRef]);

  console.log(neLng, neLat, swLng, swLat);

  return (
    <div className="absolute w-full top-0 left-0 z-10 md:relative md:w-2/5 lg:w-2/6 h-full bg-gradient-to-b from-violet-800 to-indigo-900 overflow-y-auto">
      <div className="flex flex-col justify-center items-center mt-8 mb-8 w-full">
        <SearchBar setLocation={setLocation} />
      </div>
      <hr className="ml-8 mr-8 border-violet-600" />
      <div className="w-full">
        {stations.map(
          (station) =>
            inBounds(station) && (
              <SideBarItem
                item={station}
                key={station.id}
                selected={selectedStation && station.id === selectedStation.id}
                hovering={hoveringStation && station.id === hoveringStation.id}
                onClick={() => showStation(station)}
                onMouseEnter={() => onHoverStation(station)}
                onMouseLeave={() => onHoverStation(null)}
              />
            )
        )}
      </div>
    </div>
  );
};

export default SideBar;
