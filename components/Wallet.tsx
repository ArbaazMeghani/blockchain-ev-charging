import React from "react";
import useWallet from "../hooks/useWallet";

const Wallet = () => {
  const wallet = useWallet();
  return (
    <button className="mr-12 mt-12 absolute top-0 right-0 bg-blue-600 text-gray-200 p-2 rounded-2xl z-0 shadow-xl">
      Connect Wallet
    </button>
  );
};

export default Wallet;
