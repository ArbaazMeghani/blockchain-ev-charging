import React, { useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import StationIcon from "../icons/StationIcon";

const Station = ({
  edit = false,
  station = {},
  owner = false,
  setStationData,
}) => {
  const [editMode, setEditMode] = useState(edit);
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen overflow-hidden absolute left-0 top-0 bg-gray-900 bg-opacity-80">
      <div
        className="h-screen w-screen absolute"
        onClick={() => setStationData(null)}
      />
      <div className="w-1/3 h-2/3 rounded-lg shadow-2xl bg-gradient-to-b from-violet-800 to-indigo-900">
        <div className="flex flex-col justify-between items-center overflow-hidden w-full h-full relative">
          <button
            className="mt-8 mr-8 hover:text-gray-600 transition-colors duration-200 absolute top-0 right-0"
            onClick={() => setStationData(null)}
          >
            <CloseIcon />
          </button>
          <h1 className="text-4xl inline-flex items-center mt-12 border-b-2 w-full justify-center border-gray-300">
            <div className="mr-4">
              <StationIcon />
            </div>
            {station.title}
          </h1>
          <div>
            <b>address</b>
            <p>
              {station.streetAddress}
              <br />
              {station.city}, {station.state} {station.zipCode}
            </p>
          </div>
          <div>
            <form>
              <input
                type="number"
                id="kilowats"
                placeholder="energy in kilowats"
                onChange={(e) => console.log(e)}
                value={5}
              />
              <div>
                <p>
                  5 * {station.price} = {5 * station.price}
                </p>
                <h3>
                  <b>charge time:</b> {station.chargeRate * 5}{" "}
                </h3>
              </div>
              <button>Start Charging</button>
            </form>
          </div>
          <div className="w-full border-b-2 border-gray-300" />
          <div className="flex flex-row justify-between items-center w-full">
            {owner && !editMode && (
              <button className="p-2 rounded-xl bg-violet-700 mb-8 hover:bg-violet-800 transition-colors duration-300">
                delete
              </button>
            )}
            {owner && (
              <button
                className="p-2 rounded-xl bg-violet-700 mb-8 hover:bg-violet-800 transition-colors duration-300"
                onClick={() => setEditMode(true)}
              >
                edit
              </button>
            )}
            {editMode && (
              <button
                className="p-2 rounded-xl border-2 border-slate-800 mb-8 hover:border-slate-900 transition-colors duration-300"
                onClick={() => setEditMode(false)}
              >
                cancel
              </button>
            )}
            {editMode && (
              <button
                className="p-2 rounded-xl bg-violet-700 mb-8 hover:bg-violet-800 transition-colors duration-300"
                onClick={() => setEditMode(false)}
              >
                save
              </button>
            )}
            {!editMode && (
              <button
                className="p-2 rounded-xl border-2 border-slate-800 mb-8 hover:border-slate-900 transition-colors duration-300"
                onClick={() => setStationData(null)}
              >
                close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Station;
