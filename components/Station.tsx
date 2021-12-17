import React from "react";
import CloseIcon from "../icons/CloseIcon";
import StationIcon from "../icons/StationIcon";

const Station = ({
  edit = false,
  station = {},
  owner = false,
  setStationData,
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full overflow-hidden absolute bg-gray-400 bg-opacity-80">
      <div
        className="h-screen w-screen absolute"
        onClick={() => setStationData(null)}
      />
      <div className="w-2/3 h-2/3 bg-white z-0">
        <button
          className="mt-8 mr-8 float-right p-2 hover:text-gray-600 transition-colors duration-200"
          onClick={() => setStationData(null)}
        >
          <CloseIcon />
        </button>
        <div className="flex flex-col justify-start items-center overflow-hidden w-full h-full mt-2">
          <h1 className="text-4xl inline-flex items-center">
            <div className="mr-4">
              <StationIcon />
            </div>
            {station.title}
          </h1>
          <div className="mt-2 mb-4 w-full border-b-2 border-gray-300" />
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
          <div className="mt-2 mb-4 w-full border-b-2 border-gray-300" />
          <div className="flex flex-row justify-between items-center">
            {owner && !edit && <button>delete</button>}
            {owner && <button>edit</button>}
            {edit && <button>cancel</button>}
            {edit && <button>save</button>}
            {!edit && (
              <button onClick={() => setStationData(null)}>close</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Station;
