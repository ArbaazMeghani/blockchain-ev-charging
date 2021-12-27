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
            <h1>{station.title}</h1>
          </h1>
          <div className="text-sm">
            <p>
              {station.streetAddress}
              <br />
              {station.city}, {station.state} {station.zipCode}
            </p>
          </div>
        </div>
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
          <div className="flex flex-row justify-center items-center mt-4 w-full">
            <div className="rounded-full p-2 border-2 border-gray-300 w-fit">
              <ChevronDownIcon />
            </div>
          </div>
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
          <div>
            <p>
              5 * {station.price} = {5 * station.price}
            </p>
            <h3>
              <b>charge time:</b> {station.chargeRate * 5}{" "}
            </h3>
          </div>
          <button
            type="submit"
            className="p-2 rounded-xl bg-violet-700 mb-8 hover:bg-violet-800 transition-colors duration-300 mr-4"
          >
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
