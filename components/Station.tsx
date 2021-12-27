import React, { useState } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import StationIcon from "../icons/StationIcon";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const Station = ({ station, owner = false, onClose, onEdit }) => {
  const [energy, setEnergy] = useState();
  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col justify-between items-center overflow-hidden w-full h-full relative">
        <div className="border-b-2 w-full flex flex-col items-center justify-center pb-4">
          <h1 className="text-4xl inline-flex items-center mt-4 justify-center">
            <div className="mr-4">
              <StationIcon />
            </div>
            {station.title}
          </h1>
          <div className="text-sm">
            <p>
              {station.streetAddress}
              <br />
              {station.city}, {station.state} {station.zipCode}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div>
            <label htmlFor="ethereum">From</label>
            <br />
            <input
              type="number"
              required
              className="rounded-l-lg border-t-2 border-l-2 border-b-2 border-gray-300 bg-violet-600 text-white p-2 outline-none"
              id="ethereum"
              placeholder="0.0"
              onChange={(e) =>
                setEnergy(e.target.value && e.target.value / station.price)
              }
              value={energy && energy * station.price}
            />
            <input
              type="text"
              className="rounded-r-lg border-t-2 border-r-2 border-b-2 border-gray-300 bg-violet-500 text-white p-2 w-12"
              id="ethereum-symbol"
              value={"ETH"}
              disabled
            />
          </div>
          <div className="flex flex-row justify-center items-center mt-4 w-full">
            <div className="rounded-full p-2 border-2 border-gray-300 w-fit">
              <ChevronDownIcon />
            </div>
          </div>
          <div>
            <label htmlFor="kilowats">To</label>
            <br />
            <input
              type="number"
              required
              className="rounded-l-lg border-t-2 border-l-2 border-b-2 border-gray-300 bg-violet-600 text-white p-2 outline-none"
              id="kilowats"
              placeholder="0.0"
              onChange={(e) => setEnergy(e.target.value)}
              value={energy}
            />
            <input
              type="text"
              className="rounded-r-lg border-t-2 border-r-2 border-b-2 border-gray-300 bg-violet-500 text-white p-2 w-12"
              id="kilowats-symbol"
              value={"kW"}
              disabled
            />
            <br />
            <input
              type="number"
              required
              className="rounded-l-lg border-t-2 border-l-2 border-b-2 border-gray-300 bg-violet-600 text-white p-2 outline-none mt-2"
              id="time"
              placeholder="0.0"
              onChange={(e) => setEnergy(e.target.value)}
              value={energy && energy * station.chargeRate}
            />
            <input
              type="text"
              className="rounded-r-lg border-t-2 border-r-2 border-b-2 border-gray-300 bg-violet-500 text-white p-2 w-12"
              id="time-symbol"
              value={"H"}
              disabled
            />
          </div>
          <div className="text-xs flex flex-col justify-end items-end w-full mr-2 mt-2">
            <p>1 ETH = {1 / station.price} kW</p>
            <p>1 kW = {station.chargeRate} H</p>
          </div>
          <button
            type="submit"
            className={
              (energy ? "hover:bg-violet-600" : "cursor-not-allowed") +
              " p-2 rounded-xl bg-violet-700 mb-4 mt-4 transition-colors duration-300 mr-4 relative"
            }
            disabled={!energy}
          >
            <div className="border-2 border-sky-400 rounded-full bg-sky-500 animate-pulse w-2 h-2 absolute top-0 right-0" />
            Start Charging
          </button>
        </div>
        <div className="w-full border-b-2 border-gray-300" />
        <div className="flex flex-row justify-between items-center w-full">
          {owner && (
            <button className="p-2 rounded-xl bg-red-800 mb-8 hover:bg-red-900 transition-colors duration-300 ml-4">
              delete
            </button>
          )}
          <div />
          <div className="flex flex-row justify-end items-center">
            {owner && <PrimaryButton onClick={onEdit} value={"edit"} />}
            <SecondaryButton onClick={onClose} value={"close"} />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default Station;
