import React, { useState } from "react";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";

const InstructionsModal = () => {
  const [showInstructions, setShowInstructions] = useState(true);

  if (!showInstructions) {
    return <></>;
  }
  return (
    <Modal onClose={() => setShowInstructions(false)}>
      <div className="flex flex-col justify-start items-center h-full w-full p-4">
        <div className="mt-4 flex flex-row justify-center items-center w-full">
          <h1 className="text-xl lg:text-3xl">Electric Vehicle Charging</h1>
        </div>
        <div className="w-full border-b-2 border-slate-800 mt-4" />
        <div className="m-8 flex flex-col justify-center items-center w-full pl-8 pr-8">
          <p className="lg:text-xl">
            This is a demo of a decentralized electric vehicle charging station
            application.
          </p>

          <ul className="list-disc mt-4">
            <li>
              You Must be on the Rinkeby test network to use this application
            </li>
            <li>You must have Metamask installed</li>
            <li>
              Get test ether{" "}
              <a
                className="text-blue-500 hover:text-blue-300 transition-colors duration-300"
                href=""
              >
                here
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-end items-center w-full h-full">
          <p className="text-red-700 lg:text-xl pl-8 pr-8 mb-8">
            <b>
              DO NOT send real ETH to this contract. It is only for
              demonstration purposes.
            </b>
          </p>
          <div className="w-full border-b-2 border-slate-800 mb-4" />
          <PrimaryButton
            onClick={() => setShowInstructions(false)}
            value={"I Understand"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default InstructionsModal;
