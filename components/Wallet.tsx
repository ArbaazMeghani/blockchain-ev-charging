import React from "react";
import useWallet from "../hooks/useWallet";

const Wallet = () => {
  const wallet = useWallet();

  if (!wallet.address) {
    return (
      <button
        className="mr-12 mt-12 absolute top-0 right-0 bg-violet-800 p-2 rounded-2xl z-0 shadow-xl"
        onClick={() => {
          window.location.reload();
        }}
      >
        Connect Wallet
      </button>
    );
  }

  if (
    wallet.network &&
    wallet.network.chainId !==
      parseInt(process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_CHAIN_ID)
  ) {
    return (
      <button className="mr-12 mt-12 absolute top-0 right-0 bg-red-800 p-2 rounded-2xl z-0 shadow-xl">
        Wrong Network
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
