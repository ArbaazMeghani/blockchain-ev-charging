import React, { useState } from "react";
import StationIcon from "../icons/StationIcon";
import Modal from "./Modal";
import NumberUnitInput from "./NumberUnitInput";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const priceOptions = [{ value: "ETH" }];
const chargeRateOptions = [{ value: "Ws" }];

const EditStation = ({
  edit = false,
  currentStation = {},
  owner = false,
  setStationData,
}) => {
  const [station, setStation] = useState(currentStation);
  const onChangeChargeRate = (chargeRate) => {
    setStation({ ...station, chargeRate });
  };
  const onChangePrice = (price) => {
    setStation({ ...station, price });
  };

  return (
    <Modal onClose={() => setStationData(null)}>
      <form className="flex flex-col justify-start items-center overflow-hidden w-full h-full">
        <input type="text" placeholder="title" required value={station.title} />
        <input
          type="text"
          placeholder="street address"
          required
          value={station.streetAddress}
        />
        <input type="text" placeholder="city" required value={station.city} />
        <input type="text" placeholder="state" required value={station.state} />
        <input
          type="number"
          placeholder="zip code"
          required
          value={station.zipCode}
        />
        <NumberUnitInput
          id="price"
          options={priceOptions}
          value={station.price}
          onChangeValue={onChangePrice}
        />
        <NumberUnitInput
          id="charge-rate"
          value={station.chargeRate}
          onChangeValue={onChangeChargeRate}
          options={chargeRateOptions}
        />
      </form>
    </Modal>
  );
};

export default EditStation;
