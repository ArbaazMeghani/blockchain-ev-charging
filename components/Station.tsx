import React, { useState } from "react";
import StationIcon from "../icons/StationIcon";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const Station = ({ station, owner = false, onClose, onEdit }) => {
  const [energy, setEnergy] = useState();
  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col justify-between items-center overflow-hidden w-full h-full relative">
        <h1 className="text-4xl inline-flex items-center mt-12 border-b-2 w-full justify-center border-gray-300">
          <div className="mr-4">
            <StationIcon />
          </div>
          <h1>{station.title}</h1>
        </h1>
        <div>
          <b>address</b>
          <br />
          <p>
            {station.streetAddress}
            <br />
            {station.city}, {station.state} {station.zipCode}
          </p>
        </div>
        <div>
          <input
            type="number"
            id="kilowats"
            placeholder="energy in kilowats"
            onChange={(e) => setEnergy(e.target.value)}
            value={energy}
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
        </div>
        <div className="w-full border-b-2 border-gray-300" />
        <div className="flex flex-row justify-between items-center w-full">
          {owner && (
            <button className="p-2 rounded-xl bg-violet-700 mb-8 hover:bg-violet-800 transition-colors duration-300 ml-4">
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
