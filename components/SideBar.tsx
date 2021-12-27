import React from "react";
import SearchBar from "./SearchBar";
import SideBarItem from "./SideBarItem";

type SideBarProps = {
  stations: any;
  setLocation: any;
};

const SideBar = ({ stations, setLocation }: SideBarProps) => {
  return (
    <div className="w-2/6 h-full overflow-y-auto">
      <div className="flex flex-col justify-center items-center mt-8 mb-8 w-full">
        <SearchBar setLocation={setLocation} />
      </div>
      <div className="m-8">
        {stations.map((station) => (
          <SideBarItem item={station} key={station.id} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
