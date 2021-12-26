import React, { useState } from "react";
import StationIcon from "../icons/StationIcon";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const EditStation = ({
  edit = false,
  station = {},
  owner = false,
  setStationData,
}) => {
  const [editMode, setEditMode] = useState(edit);

  const onCancelEdit = () => setEditMode(false);
  const onEdit = () => setEditMode(true);
  const onSave = (station) => {
    onCancelEdit();
  };
  const onClose = () => setStationData(null);

  return (
    <Modal onClose={() => setStationData(null)}>
      <form className="flex flex-col justify-between items-center overflow-hidden w-full h-full relative">
        <h1 className="text-4xl inline-flex items-center mt-12 border-b-2 w-full justify-center border-gray-300">
          <div className="mr-4">
            <StationIcon />
          </div>
          <input
            className={edit ? "w-16" : "bg-transparent w-16"}
            type="text"
            id="title"
            placeholder="Station Title..."
            onChange={(e) => console.log(e)}
            value={"test"}
          />
        </h1>
        <div>
          <b>address</b>
          <br />
          <input
            className={edit ? "" : "bg-transparent"}
            type="text"
            id="street-address"
            placeholder="Street Address..."
            onChange={(e) => console.log(e)}
            value={"street address"}
          />
          <br />
          <input
            className={edit ? "w-16" : "bg-transparent w-16"}
            type="text"
            id="city"
            placeholder="City..."
            onChange={(e) => console.log(e)}
            value={"City"}
          />
          {" , "}
          <input
            className={edit ? "w-10" : "bg-transparent w-10"}
            type="text"
            id="state"
            placeholder="State..."
            onChange={(e) => console.log(e)}
            value={"state"}
          />{" "}
          <input
            className={edit ? "w-14" : "bg-transparent w-14"}
            type="number"
            id="zip-code"
            placeholder="Zip Code..."
            onChange={(e) => console.log(e)}
            value={1234}
          />
        </div>
        <div>
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
        </div>
        <div className="w-full border-b-2 border-gray-300" />
        <div className="flex flex-row justify-between items-center w-full">
          {owner && !editMode && (
            <button className="p-2 rounded-xl bg-violet-700 mb-8 hover:bg-violet-800 transition-colors duration-300 ml-4">
              delete
            </button>
          )}
          <div />
          <div className="flex flex-row justify-end items-center">
            {owner && !editMode && (
              <PrimaryButton onClick={onEdit} value={"edit"} />
            )}
            {editMode && (
              <SecondaryButton onClick={onCancelEdit} value={"cancel"} />
            )}
            {editMode && (
              <PrimaryButton onClick={() => onSave(station)} value={"save"} />
            )}
            {!editMode && <SecondaryButton onClick={onClose} value={"close"} />}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditStation;
