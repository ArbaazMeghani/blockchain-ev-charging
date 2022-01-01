import React from "react";
import SearchBar from "./SearchBar";
import SideBarItem from "./SideBarItem";

const SideBar = ({
  stations,
  setLocation,
  selectedStation,
  showStation,
  hoveringStation,
  onHoverStation,
}) => {
  return (
    <div className="w-2/6 h-full overflow-y-auto">
      <div className="flex flex-col justify-center items-center mt-8 mb-8 w-full">
        <SearchBar setLocation={setLocation} />
      </div>
      <hr className="ml-8 mr-8 border-violet-600" />
      <div className="w-full">
        {stations.map((station) => (
          <SideBarItem
            item={station}
            key={station.id}
            selected={selectedStation && station.id === selectedStation.id}
            hovering={hoveringStation && station.id === hoveringStation.id}
            onClick={() => showStation(station)}
            onMouseEnter={() => onHoverStation(station)}
            onMouseLeave={() => onHoverStation(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
