import React from "react";
import useWallet from "../hooks/useWallet";

const Wallet = () => {
  const wallet = useWallet();

  if (!wallet.address) {
    return (
      <button className="mr-12 mt-12 absolute top-0 right-0 bg-violet-800 p-2 rounded-2xl z-0 shadow-xl">
        Connect Wallet
      </button>
    );
  }

  return (
    <button className="mr-12 mt-12 absolute top-0 right-0 bg-violet-900 p-2 rounded-2xl z-0 shadow-xl">
      {wallet.address.substring(0, 6)}...
      {wallet.address.substring(wallet.address.length - 4)}
    </button>
  );
};

export default Wallet;
