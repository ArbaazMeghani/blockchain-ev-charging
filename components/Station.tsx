import React from "react";

const Station = ({ edit = false, station = {}, setStationData }) => {
  return (
    <div
      className="flex flex-col justify-center items-center h-full w-full overflow-hidden absolute bg-gray-400 bg-opacity-80"
      onClick={() => setStationData(null)}
    >
      <div className="w-2/3 h-2/3 bg-white z-0">station</div>
    </div>
  );
};

export default Station;
