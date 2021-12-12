import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const Wallet = () => {
  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  useEffect(() => {
    const getWallet = async () => {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner(accounts[0]);
      setProvider(provider);
      setWallet(await signer.getAddress());
      setSigner(signer);
    };
    if (window.ethereum) {
      getWallet();
    }
  }, []);

  const getBalance = async () => {
    const balance = await signer.getBalance();
    console.log(balance);
  };

  const sendTransaction = async (receiver) => {
    const tx = {
      to: receiver,
      value: ethers.utils.parseEther("0.1"),
    };

    const txHash = await signer.sendTransaction(tx);
    console.log(txHash);
  };

  if (!wallet) {
    return (
      <button className="mr-12 mt-12 absolute top-0 right-0 bg-blue-600 text-gray-200 p-2 rounded-2xl z-0 shadow-xl">
        Connect Wallet
      </button>
    );
  }

  return (
    <button
      className="mr-12 mt-12 absolute top-0 right-0 bg-gray-800 text-gray-200 p-2 rounded-2xl z-0 shadow-xl"
      onClick={getBalance}
    >
      {wallet.substring(0, 6)}...{wallet.substring(wallet.length - 4)}
    </button>
  );
};

export default Wallet;
