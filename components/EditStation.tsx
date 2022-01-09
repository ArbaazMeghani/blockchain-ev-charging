import React, { useState } from "react";
import StationIcon from "../icons/StationIcon";
import Modal from "./Modal";
import NumberUnitInput from "./NumberUnitInput";
import PrimaryButton from "./PrimaryButton";
import SearchBar from "./SearchBar";
import SecondaryButton from "./SecondaryButton";

const priceOptions = [{ value: "ETH" }];
const chargeRateOptions = [{ value: "Ws" }];

const EditStation = ({ currentStation, onClose, onSave }) => {
  const [station, setStation] = useState(currentStation);

  const onChangeLocation = (location) => {
    setStation({ ...station, ...location });
  };

  const onChangeChargeRate = (chargeRate) => {
    setStation({ ...station, chargeRate });
  };
  const onChangePrice = (price) => {
    setStation({ ...station, price });
  };
  const onChangeTitle = (title) => {
    setStation({ ...station, title });
  };

  return (
    <Modal onClose={onClose}>
      <form
        className="overflow-hidden w-full h-full"
        onSubmit={(e) => {
          e.preventDefault();
          onSave(station);
        }}
      >
        <div className="flex flex-col justify-between items-start h-full w-full">
          <div className="border-b-2 w-full flex flex-col items-center justify-center pb-4">
            <h1 className="text-4xl inline-flex items-center mt-4 justify-center">
              <div className="mr-4">
                <StationIcon />
              </div>
              Edit station
            </h1>
          </div>
          <div className="flex flex-col justify-evenly items-center w-full h-full">
            <div>
              <label htmlFor="title">Title</label>
              <br />
              <input
                id="title"
                type="text"
                className="rounded-lg border-2 border-gray-300 bg-violet-600 text-white p-2 outline-none"
                placeholder="title"
                required
                value={station.title}
                onChange={(e) => onChangeTitle(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <label htmlFor="search">Address</label>
              <SearchBar
                setLocation={onChangeLocation}
                searchText={station.address}
              />
            </div>
            <div className="flex flex-row w-full justify-evenly items-center">
              <div>
                <label htmlFor="longitude">Longitude</label>
                <br />
                <input
                  id="longitude"
                  type="number"
                  className="rounded-lg border-2 border-gray-300 bg-violet-500 text-white p-2 outline-none hover:cursor-not-allowed w-24"
                  placeholder="longitude"
                  required
                  disabled
                  value={station.longitude}
                />
              </div>
              <div>
                <label htmlFor="latitude">Latitude</label>
                <br />
                <input
                  id="latitude"
                  type="number"
                  className="rounded-lg border-2 border-gray-300 bg-violet-500 text-white p-2 outline-none hover:cursor-not-allowed w-24"
                  placeholder="latitude"
                  required
                  disabled
                  value={station.latitude}
                />
              </div>
            </div>
            <NumberUnitInput
              id="price"
              label="Price"
              options={priceOptions}
              value={station.price}
              onChangeValue={onChangePrice}
            />
            <NumberUnitInput
              id="charge-rate"
              label="Charge Rate"
              value={station.chargeRate}
              onChangeValue={onChangeChargeRate}
              options={chargeRateOptions}
            />
          </div>

          <div className="w-full border-b-2 border-gray-300 mb-4" />
          <div className="flex flex-row justify-end items-end w-full">
            <PrimaryButton value="save" />
            <SecondaryButton onClick={onClose} value="cancel" />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditStation;
