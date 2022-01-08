import React, { useState } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import StationIcon from "../icons/StationIcon";
import Modal from "./Modal";
import NumberUnitInput from "./NumberUnitInput";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const paymentOptions = [{ value: "ETH", factor: 1 }];
const wattageOptions = [
  { value: "W", factor: 1 },
  { value: "kW", factor: 1000 },
  { value: "mW", factor: 1000 * 1000 },
];
const timeUnitOptions = [
  { value: "secs", factor: 1 },
  { value: "mins", factor: 60 },
  { value: "hrs", factor: 60 * 60 },
];

const Station = ({ station, owner = false, onClose, onEdit }) => {
  const [energy, setEnergy] = useState();
  const [wattageOption, setWattageOption] = useState(wattageOptions[0]);
  const [timeUnitOption, setTimeUnitOption] = useState(timeUnitOptions[0]);

  const setEnergyFromUnits = (amount) => {
    setEnergy(amount * wattageOption.factor);
  };

  const setEnergyFromPayment = (payment) => {
    setEnergy(payment && payment / station.price);
  };

  const setEnergyFromTimeAmount = (time) => {
    setEnergy(time && (time * timeUnitOption.factor) / station.chargeRate);
  };

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
          <div className="text-sm">{station.address}</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <NumberUnitInput
            id="ethereum-amount"
            label="From"
            value={(energy && energy * station.price) || ""}
            onChangeValue={setEnergyFromPayment}
            options={paymentOptions}
          />
          <div className="flex flex-row justify-center items-center mt-4 w-full">
            <div className="rounded-full p-2 border-2 border-gray-300 w-fit">
              <ChevronDownIcon />
            </div>
          </div>
          <NumberUnitInput
            id="watts"
            label="To"
            value={(energy && energy / wattageOption.factor) || ""}
            onChangeValue={setEnergyFromUnits}
            options={wattageOptions}
            onChangeOption={setWattageOption}
            selectedOption={wattageOption}
          />
          <NumberUnitInput
            id="time"
            value={
              (energy &&
                (energy * station.chargeRate) / timeUnitOption.factor) ||
              ""
            }
            onChangeValue={setEnergyFromTimeAmount}
            options={timeUnitOptions}
            onChangeOption={setTimeUnitOption}
            selectedOption={timeUnitOption}
          />
          <div className="text-xs flex flex-col justify-end items-end w-full mr-2 mt-2">
            <p>
              1 ETH = {1 / station.price / wattageOption.factor}{" "}
              {wattageOption.value}
            </p>
            <p>
              1 {wattageOption.value} ={" "}
              {(station.chargeRate / timeUnitOption.factor) *
                wattageOption.factor}{" "}
              {timeUnitOption.value}
            </p>
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
